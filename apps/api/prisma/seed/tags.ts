import { PrismaClient } from '@prisma/client';

export async function SeedTags(prisma: PrismaClient) {
  const tags = [
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
    await prisma.tbTags.createMany({
      data: tags,
    });
    console.log('Tabela de Tags preenchida com sucesso.');
  } catch (error) {
    console.error('Falha ao preencher tabela de Tags.');
    console.log(error.message);
  }
}
