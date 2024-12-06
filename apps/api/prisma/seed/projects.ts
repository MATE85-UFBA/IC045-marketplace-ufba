import { PrismaClient } from '@prisma/client';

export async function SeedProjects(prisma: PrismaClient) {
  const projects = [
    {
      name: 'Fog of Things: devices and gateways',
      started_at: '2023-11-24T10:30:00Z',
      researchGroupId: '3ffe6190-adb2-49dd-9614-e3714e443539',
    },
    {
      name: 'SOFT-IoT: Self-Organizing FOG of Things',
      started_at: '2023-11-24T10:30:00Z',
      researchGroupId: '3ffe6190-adb2-49dd-9614-e3714e443539',
    },
    {
      name: 'Energy-IoT',
      started_at: '2023-11-30T10:30:00Z',
      researchGroupId: '3ffe6190-adb2-49dd-9614-e3714e443539',
      demandId: '7405974c-6ef1-4d0c-9be0-962b7d97c8d9',
    },
  ];
  const project1 = {
    name: 'Recommend System',
    started_at: '2023-11-30T10:30:00Z',
    researchGroupId: '5df58413-dadb-446b-91d7-e82ffce3e24a',
    keywords: {
      connect: [{ id: '34341378-0816-4fd1-8044-53d7f1a875b9' }],
    },
  };

  try {
    await prisma.project.createMany({
      data: projects,
    });
    await prisma.project.create({
      data: project1,
    });
    console.log('Tabela de Projeto preenchida com sucesso.');
  } catch (error) {
    console.error('Falha ao preencher tabela de Projeto.');
    console.log(error.message);
  }
}
