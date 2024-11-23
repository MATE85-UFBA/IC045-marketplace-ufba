// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // await SeedFields(prisma);
  // await SeedTags(prisma);
  // await SeedUsers(prisma);
  // await SeedResearchers(prisma);

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
