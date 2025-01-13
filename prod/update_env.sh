#!/bin/bash

# Define os caminhos para os arquivos .env
FRONT_ENV="/marketplace/IC045-marketplace-ufba/apps/web/.env"
BACK_ENV="/marketplace/IC045-marketplace-ufba/apps/api/.env"

# Define os domínios que substituirão 'localhost'
FRONT_DOMAIN="https://coopera.eduardovasconcelos.live"
BACK_DOMAIN="https://api-coopera.eduardovasconcelos.live"

# Função para substituir 'localhost' por domínios especificados
replace_domains() {
    local file_path=$1
    local front_domain=$2
    local back_domain=$3

    if [ -f "$file_path" ]; then
        echo "Atualizando $file_path..."
        # Cria um backup antes de modificar
        cp "$file_path" "$file_path.bak"
        # Substitui as variáveis específicas
        sed -i "s|NEXT_PUBLIC_API_URL=.*|NEXT_PUBLIC_API_URL=$back_domain|g" "$file_path"
        sed -i "s|NEXT_PUBLIC_FRONT_END_URL=.*|NEXT_PUBLIC_FRONT_END_URL=$front_domain|g" "$file_path"
        echo "$file_path atualizado com sucesso."
    else
        echo "Arquivo $file_path não encontrado."
    fi
}

# Atualiza os arquivos .env
replace_domains "$FRONT_ENV" "$FRONT_DOMAIN" "$BACK_DOMAIN"
replace_domains "$BACK_ENV" "$FRONT_DOMAIN" "$BACK_DOMAIN"

# Define o novo nome do banco de dados
NEW_DB_NAME="marketplace_db"

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

# Atualiza o nome do banco de dados na DATABASE_URL do back-end
update_database_name "$BACK_ENV" "$NEW_DB_NAME"

echo "Processo de atualização concluído."