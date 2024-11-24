import { PrismaClient } from '@prisma/client';
export async function SeedKnowledgeAreas(prisma: PrismaClient) {
  const knowledgeAreas = [
    {
      id: '581a9d3a-e512-47e4-8a9b-3c3a672f9f75',
      name: 'Ciências Físicas, Matemática e Tecnologia',
    },
    {
      id: '33c1e57b-87fd-4c40-b13a-e827f25e0b02',
      name: 'Ciências Biológicas e Profissões da Saúde',
    },
    {
      id: 'f021de96-89dd-463e-8705-b7c20fb4c3f5',
      name: 'Filosofia e Ciências Humanas',
    },
    {
      id: 'fc607ea2-d3a9-4fc7-8c37-a222088650fd',
      name: 'Letras',
    },
    {
      id: '0ac1c15c-48f4-4822-9859-08d3b2dab3cb',
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
