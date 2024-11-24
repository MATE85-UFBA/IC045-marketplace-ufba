import { PrismaClient} from '@prisma/client';

export async function SeedCompanies(prisma: PrismaClient) {
  const company1 = 
    {
      userId: '0e1bc090-3273-4eb9-acdd-e214e8cd724f',
      contactName: 'Administrador',
      contactEmail: 'adm@coelba.com.br',
      contactPhone: '(71) 99999-9999',
      demands: { 
        create: [
          { 
            id: '7405974c-6ef1-4d0c-9be0-962b7d97c8d9',
            name: 'Gestão de consumo elétrico de dispositivo de IoT.'
          }, 
        ]
      },
    }
  ;
  const company2 = 
    {
      userId: '09e1f3d8-6ff2-4187-8e99-55de3fb97040',
      contactName: 'Contact',
      contactEmail: 'contact@nvidia.com',
      contactPhone: '(71) 00000-0000'
    }
  ;

  try {
    await prisma.company.create({
      data: company1,
    });
    await prisma.company.create({
      data: company2,
    });
    console.log('Tabela de Empresa preenchida com sucesso.');
  } catch (error) {
    console.error('Falha ao preencher tabela de Empresa.');
    console.log(error.message);
  }
}