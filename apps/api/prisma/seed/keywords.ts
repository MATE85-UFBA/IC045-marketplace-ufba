import { PrismaClient } from '@prisma/client';

export async function SeedKeywords(prisma: PrismaClient) {
  const keywords = [
    {
      id: '2b8ae025-be48-4c6f-b771-f828a1c1a54d',
      name: 'Inteligência Artificial',
    },
    {
      name: 'Liquidos Iônicos',
    },
    {
      id: '34341378-0816-4fd1-8044-53d7f1a875b9',
      name: 'Sistemas de Recomendação',
    },
    {
      name: 'Etimologia Latina',
    },
    {
      name: 'Povos Pan-Amazonicos & Pre-Colombianos',
    },
    {
      id: 'd86ad682-ef80-45bf-baf9-ee1af330ba04',
      name: 'Redes de Computadores',
    },
    {
      id: '742518a7-bc8b-4ecb-a1f9-fa23c282b7b3',
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
