import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { SeedFields } from './seed/fields';
import { SeedTags } from './seed/tags';
import { SeedUsers } from './seed/users';
import { SeedResearchers } from './seed/researchers';

const prisma = new PrismaClient();

async function main() {
  require('dotenv').config();
  await SeedFields(prisma);
  await SeedTags(prisma);
  await SeedUsers(prisma);
  await SeedResearchers(prisma);

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
