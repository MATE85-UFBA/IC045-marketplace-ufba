import { PrismaClient } from '@prisma/client';

export async function SeedCompetences(prisma: PrismaClient) {
  const competences = [
    {
      name: 'Fog of Things: devices and gateways',
      researchGroupId: '3ffe6190-adb2-49dd-9614-e3714e443539',
    },
    {
      name: 'SOFT-IoT: Self-Organizing FOG of Things',
      researchGroupId: '3ffe6190-adb2-49dd-9614-e3714e443539',
    },
    {
      name: 'Energy-IoT',
      researchGroupId: '3ffe6190-adb2-49dd-9614-e3714e443539',
      demandId: '7405974c-6ef1-4d0c-9be0-962b7d97c8d9',
    },
  ];
  const competence1 = {
    name: 'Recommend System of model LLM for Software Engineering',
    researchGroupId: '5df58413-dadb-446b-91d7-e82ffce3e24a',
    keywords: {
      connect: [{ id: '34341378-0816-4fd1-8044-53d7f1a875b9' }],
    },
  };

  try {
    await prisma.competence.createMany({
      data: competences,
    });
    await prisma.competence.create({
      data: competence1,
    });
    console.log('Tabela de Competência preenchida com sucesso.');
  } catch (error) {
    console.error('Falha ao preencher tabela de Competência.');
    console.log(error.message);
  }
}
