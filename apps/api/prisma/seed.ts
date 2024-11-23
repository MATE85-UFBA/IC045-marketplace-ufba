// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { PrismaClient } from '@prisma/client';
import { SeedKnowledgeAreas } from './seed/knowledgeareas';
import { SeedKeywords } from './seed/keywords';
import { SeedUsers } from './seed/users';
import { SeedResearchers } from './seed/researchers';
import { SeedResearchGroups } from './seed/researchgroups';
import { SeedProjects } from './seed/projects';
import { SeedCompanies } from './seed/companies';
import { SeedDemands } from './seed/demands';
import { SeedNotifications } from './seed/notifications';

const prisma = new PrismaClient();

async function main() {
  await SeedKnowledgeAreas(prisma);
  await SeedKeywords(prisma);
  await SeedUsers(prisma);
  await SeedResearchers(prisma);
  await SeedResearchGroups(prisma);
  await SeedCompanies(prisma);
  await SeedProjects(prisma);
  await SeedDemands(prisma);
  await SeedNotifications(prisma);

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
