import { PrismaClient } from '@prisma/client';

export async function SeedTags(prisma: PrismaClient) {
  const keywords = [
    {
      name: 'Inteligência Artificial',
    },
    {
      name: 'Liquidos Iônicos',
    },
    {
      name: 'Sistemas de Recomendação',
    },
    {
      name: 'Etimologia Latina',
    },
    {
      name: 'Povos Pan-Amazonicos & Pre-Colombianos',
    },
    {
      name: 'Redes de Computadores',
    },
    {
      name: 'IOT - Internet das Coisas',
    },
  ];

  try {
    await prisma.keyword.createMany({
      data: keywords,
    });
    console.log('Tabela de Keywords preenchida com sucesso.');
  } catch (error) {
    console.error('Falha ao preencher tabela de Keywords.');
    console.log(error.message);
  }
}
