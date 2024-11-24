import { PrismaClient } from '@prisma/client';

export async function SeedDemands(prisma: PrismaClient) {
  const demands = [
    {
      id: '21a64aad-5c76-45a7-82b9-20fd56be6ad6',
      companyId: '09e1f3d8-6ff2-4187-8e99-55de3fb97040',
      description: 'Lorem ipsum',
      public: true,
      name: 'Distribuição de energia por gerador',
      keywords: {
        connect: [
          { id: 'd86ad682-ef80-45bf-baf9-ee1af330ba04' },
          { id: '742518a7-bc8b-4ecb-a1f9-fa23c282b7b3' },
        ],
      },
      attachments: {
        create: [
          {
            url: 'https://sites.unipampa.edu.br/dtic/files/2023/06/unipampa-ntic-pdtic-anexo-vii-ppds-2011.pdf',
          },
        ],
      },
    },
    {
      id: 'c75aa063-49fc-4ea7-9fe5-70ae81ae2234',
      companyId: '6d78e1e5-5917-4a81-bce6-65610e79d4f1',
      description: 'Lorem ipsum',
      public: true,
      name: 'Minha demanda 01',
      keywords: {
        connect: [
          { id: 'd86ad682-ef80-45bf-baf9-ee1af330ba04' },
          { id: '742518a7-bc8b-4ecb-a1f9-fa23c282b7b3' },
        ],
      },
      attachments: {
        create: [
          {
            url: 'https://sites.unipampa.edu.br/dtic/files/2023/06/unipampa-ntic-pdtic-anexo-vii-ppds-2011.pdf',
          },
        ],
      },
    },
    {
      id: '5330f15d-8319-4a69-a964-0f6f04cbc4ec',
      companyId: '6d78e1e5-5917-4a81-bce6-65610e79d4f1',
      description: 'Lorem ipsum',
      public: true,
      name: 'Minha demanda 02',
      keywords: {
        connect: [
          { id: 'd86ad682-ef80-45bf-baf9-ee1af330ba04' },
          { id: '742518a7-bc8b-4ecb-a1f9-fa23c282b7b3' },
        ],
      },
      attachments: {
        create: [
          {
            url: 'https://sites.unipampa.edu.br/dtic/files/2023/06/unipampa-ntic-pdtic-anexo-vii-ppds-2011.pdf',
          },
        ],
      },
    },
    {
      id: 'ad574c8c-1810-4d01-8ff4-d45095ec5028\n',
      companyId: '6d78e1e5-5917-4a81-bce6-65610e79d4f1',
      description: 'Lorem ipsum',
      public: true,
      name: 'Minha demanda 03',
      keywords: {
        connect: [
          { id: 'd86ad682-ef80-45bf-baf9-ee1af330ba04' },
          { id: '742518a7-bc8b-4ecb-a1f9-fa23c282b7b3' },
        ],
      },
      attachments: {
        create: [
          {
            url: 'https://sites.unipampa.edu.br/dtic/files/2023/06/unipampa-ntic-pdtic-anexo-vii-ppds-2011.pdf',
          },
        ],
      },
    },
  ];

  try {
    for (const demand of demands) {
      await prisma.demand.create({
        data: demand,
      });
    }
    console.log('Tabela de Demanda preenchida com sucesso.');
  } catch (error) {
    console.error('Falha ao preencher tabela de Demanda.');
    console.log(error.message);
  }
}
