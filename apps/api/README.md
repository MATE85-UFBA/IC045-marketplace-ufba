# Marketplace UFBA

## Descrição:

## Tecnologias:

- Nest.Js
- Prisma ORM
- Docker

## Configuração de Ambiente:

Para começar, instale todas as dependências do projeto com o seguinte comando:

```bash
npm install

```

Antes de executar a aplicação, você precisará configurar o banco de dados. Utilize os seguintes comandos para criar as tabelas e gerar o cliente Prisma com dados de teste:

```bash
npx prisma db push
npx prisma generate
npm run seed-db

```

Para iniciar o servidor em modo de desenvolvimento, utilize o seguinte comando:

```bash
npm run start:dev

```
