import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { SeedFields } from './seed/fields';
import { SeedTags } from './seed/tags';

const prisma = new PrismaClient();

async function main() {
  // Criar usuários de exemplo
  // const user1 = await prisma.tbUsuario.create({
  //   data: {
  //     nome: 'Alice Silva',
  //     img: 'https://example.com/alice.jpg',
  //     email: 'alice@example.com',
  //     senha: await bcrypt.hash('123456', 10), // Em produção, não armazene senhas em texto plano
  //     id_papel: 1, // Ajuste conforme necessário
  //   },
  // });

  // const user2 = await prisma.tbUsuario.create({
  //   data: {
  //     nome: 'João Souza',
  //     img: 'https://example.com/joao.jpg',
  //     email: 'joao@example.com',
  //     senha: await bcrypt.hash('123456', 10), // Em produção, não armazene senhas em texto plano
  //     id_papel: 2, // Ajuste conforme necessário
  //   },
  // });
  require('dotenv').config();
  await SeedFields(prisma);
  await SeedTags(prisma);

  console.log('Banco de dados preenchido com dados padrão.');
}

main()
  .catch((e) => {
    console.log('Falha ao preencher Banco de dados.');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
