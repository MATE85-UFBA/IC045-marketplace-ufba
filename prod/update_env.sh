#!/bin/bash

# Função para obter o IP principal
get_primary_ip() {
    # Obtém a interface de rede padrão
    DEFAULT_INTERFACE=$(ip route | awk '/default/ {print $5}')
    
    # Obtém o IP não interno dessa interface
    ip addr show "$DEFAULT_INTERFACE" | grep "inet " | awk '{print $2}' | cut -d/ -f1
}

# Obtém o IP principal
IP=$(get_primary_ip)

if [ -z "$IP" ]; then
    echo "Não foi possível determinar o endereço IP principal."
    exit 1
fi

echo "Endereço IP principal detectado: $IP"

# Renomeia o arquivo .env do backend
mv /marketplace/IC045-marketplace-ufba/apps/api/.env.ci /marketplace/IC045-marketplace-ufba/apps/api/.env

# Define os caminhos para os arquivos .env
FRONT_ENV="/marketplace/IC045-marketplace-ufba/apps/web/.env"    
BACK_ENV="/marketplace/IC045-marketplace-ufba/apps/api/.env"     

# Função para substituir 'localhost' pelo IP no arquivo .env
replace_localhost() {
    local file_path=$1
    
    if [ -f "$file_path" ]; then
        echo "Atualizando $file_path..."
        # Cria um backup antes de modificar
        cp "$file_path" "$file_path.bak"
        # Substitui 'localhost' pelo IP
        sed -i "s|localhost|$IP|g" "$file_path"
        echo "$file_path atualizado com sucesso."
    else
        echo "Arquivo $file_path não encontrado."
    fi
}

# Função para alterar o nome do banco de dados na DATABASE_URL
update_database_name() {
    local file_path=$1
    local new_db_name=$2
    
    if [ -f "$file_path" ]; then
        echo "Atualizando DATABASE_URL em $file_path..."
        # Cria um backup antes de modificar (caso ainda não exista)
        if [ ! -f "$file_path.bak" ]; then
            cp "$file_path" "$file_path.bak"
        fi
        # Usa sed para substituir o nome do banco de dados
        sed -i "s|\(DATABASE_URL=postgresql://[^:]*:[^@]*@[^:]*:[0-9]*/\)[^?]*|\1$new_db_name|g" "$file_path"
        echo "DATABASE_URL em $file_path atualizado para usar o banco de dados '$new_db_name'."
    else
        echo "Arquivo $file_path não encontrado."
    fi
}

# Atualiza os arquivos .env
replace_localhost "$FRONT_ENV"
replace_localhost "$BACK_ENV"

# Define o novo nome do banco de dados
NEW_DB_NAME="marketplace_db"

# Atualiza o nome do banco de dados na DATABASE_URL do back-end
update_database_name "$BACK_ENV" "$NEW_DB_NAME"

echo "Processo de atualização concluído."
