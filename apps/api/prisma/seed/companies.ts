import { PrismaClient } from '@prisma/client';

export async function SeedCompanies(prisma: PrismaClient) {
  const companies = [
    {
      userId: '0e1bc090-3273-4eb9-acdd-e214e8cd724f',
      contactName: 'Administrador',
      contactEmail: 'adm@coelba.com.br',
      contactPhone: '(71) 99999-9999',
      demands: {
        create: [
          {
            id: '7405974c-6ef1-4d0c-9be0-962b7d97c8d9',
            name: 'Gestão de consumo elétrico de dispositivo de IoT.',
            public: true,
            description: 'teste description',
          },
        ],
      },
    },
    {
      userId: '09e1f3d8-6ff2-4187-8e99-55de3fb97040',
      contactName: 'Contact',
      contactEmail: 'contact@nvidia.com',
      contactPhone: '(71) 00000-0000',
    },
    {
      userId: '6d78e1e5-5917-4a81-bce6-65610e79d4f1',
      contactName: 'Fred durao inc.',
      contactEmail: 'contact@nvidia.com',
      contactPhone: '(71) 00000-0000',
    },
  ];

  try {
    for (const company of companies) {
      await prisma.company.create({
        data: company,
      });
    }

    console.log('Tabela de Empresa preenchida com sucesso.');
  } catch (error) {
    console.error('Falha ao preencher tabela de Empresa.');
    console.log(error.message);
  }
}
