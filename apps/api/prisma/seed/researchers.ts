import { PrismaClient, ResearcherType } from '@prisma/client';

export async function SeedResearchers(prisma: PrismaClient) {
  const reseachers = [
    {
      userId: '789e4567-e89b-12d3-a456-426614174000',
      researcherType: ResearcherType.STUDENT,
    },
  ];

  try {
    await prisma.researcher.createMany({
      data: reseachers,
    });
    console.log('Tabela de Pesquisador preenchida com sucesso.');
  } catch (error) {
    console.error('Falha ao preencher tabela de Pesquisador.');
    console.log(error.message);
  }
}
