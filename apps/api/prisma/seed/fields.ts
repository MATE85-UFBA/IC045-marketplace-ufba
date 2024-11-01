import { PrismaClient } from '@prisma/client';
export async function SeedFields(prisma: PrismaClient) {
  const fields = [
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
    await prisma.tbField.createMany({
      data: fields,
    });
    console.log('Tabela de Area preenchida com sucesso.');
  } catch (error) {
    console.error('Falha ao preencher tabela de Area.');
    console.log(error.message);
  }
}
