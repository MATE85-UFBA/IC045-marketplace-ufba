import { PrismaClient } from '@prisma/client';
export async function SeedFields(prisma: PrismaClient) {
  const knowledgeAreas = [
    {
      name: 'Ciências Físicas, Matemática e Tecnologia',
    },
    {
      name: 'Ciências Biológicas e Profissões da Saúde',
    },
    {
      name: 'Filosofia e Ciências Humanas',
    },
    {
      name: 'Letras',
    },
    {
      name: 'Artes',
    },
  ];

  try {
    await prisma.knowledgeArea.createMany({
      data: knowledgeAreas,
    });
    console.log('Tabela de Area preenchida com sucesso.');
  } catch (error) {
    console.error('Falha ao preencher tabela de Area.');
    console.log(error.message);
  }
}
