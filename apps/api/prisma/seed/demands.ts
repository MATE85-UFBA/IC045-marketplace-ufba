import { PrismaClient} from '@prisma/client';

export async function SeedDemands(prisma: PrismaClient) {
  const demands = 
    {
        id: '21a64aad-5c76-45a7-82b9-20fd56be6ad6',
        companyId: '09e1f3d8-6ff2-4187-8e99-55de3fb97040',
        name: 'Distribuição de energia por gerador',
        keywords:{
            connect: [
                { id: 'd86ad682-ef80-45bf-baf9-ee1af330ba04' }, 
                { id: '742518a7-bc8b-4ecb-a1f9-fa23c282b7b3' },
            ]
        },
        attachments:{
          create:[
            {
              url:'https://sites.unipampa.edu.br/dtic/files/2023/06/unipampa-ntic-pdtic-anexo-vii-ppds-2011.pdf',
            }
          ]
        }
    }
    ;

  try {
    await prisma.demand.create({
      data: demands,
    });
    console.log('Tabela de Demanda preenchida com sucesso.');
  } catch (error) {
    console.error('Falha ao preencher tabela de Demanda.');
    console.log(error.message);
  }
}