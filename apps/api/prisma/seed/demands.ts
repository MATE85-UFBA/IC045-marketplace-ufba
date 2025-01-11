import { PrismaClient } from '@prisma/client';

export async function SeedDemands(prisma: PrismaClient) {
  const demands = [
    {
      id: '21a64aad-5c76-45a7-82b9-20fd56be6ad6',
      companyId: '09e1f3d8-6ff2-4187-8e99-55de3fb97040',
      description:
        'Análise de sistemas de distribuição de energia elétrica baseados em geradores renováveis, com o objetivo de desenvolver modelos eficientes e sustentáveis para a geração e distribuição de energia limpa.',
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
      companyId: '0e1bc090-3273-4eb9-acdd-e214e8cd724f',
      description:
        'Analisar o potencial de tecnologias de energia inteligente para promover a sustentabilidade energética, reduzindo o desperdício e incentivando o uso de fontes renováveis.',
      public: true,
      name: 'Energia inteligente e o reaproveitamento da energia desperdiçada',
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
      companyId: '09e1f3d8-6ff2-4187-8e99-55de3fb97040',
      description:
        'Desenvolvimento de técnicas avançadas de processamento de imagem para gerar modelos precisos de plantações brasileiras, otimizando o manejo agrícola e a produção de alimentos.',
      public: true,
      name: 'Processamento de imagem para criação de modelagens de plantios brasileiros',
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
      companyId: '09e1f3d8-6ff2-4187-8e99-55de3fb97040',
      description:
        'Desenvolvimento de técnicas para reduzir o consumo energético e o impacto ambiental na geração de modelos para Engenharia de Software, promovendo a sustentabilidade no desenvolvimento de software.',
      public: true,
      name: 'Economia de recursos para geração de modelos para Engenharia de Software',
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
