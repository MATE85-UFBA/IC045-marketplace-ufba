import { PrismaClient} from '@prisma/client';

export async function SeedResearchGroups(prisma: PrismaClient) {
  const reseachGroups1 = 
    {
      id: '5df58413-dadb-446b-91d7-e82ffce3e24a',
      name: 'RECSYS: Recommender Systems Research Group',
      description: 'O Recommender Systems Research Group - RecSys é um grupo criado em 2013 que investiga e desenvolve pesquisa científica de alto impacto na área de Sistemas de Recomendação.',
      urlCNPQ: 'http://dgp.cnpq.br/dgp/espelhogrupo/699553',
      researcherId: '6d78e1e5-5917-4a81-bce6-65610e79d4f1',
      members: { 
        connect: [
          { userId: '6d78e1e5-5917-4a81-bce6-65610e79d4f1' }, 
          { userId: '789e4567-e89b-12d3-a456-426614174000' },
        ]
      },
      projects:{
        create: [
          {
            name: 'Recommending Stores for Shopping Mall Customers with RecStore',
            started_at: '2023-11-24T10:30:00Z',
          }
        ]
      },
    }
  ;

  const reseachGroups2 = 
    {
      id: '3ffe6190-adb2-49dd-9614-e3714e443539',
      name: 'WISER: Web, Internet and Intelligent Systems Research Group',
      description: 'It conducts scientific and applied research in the new trends of Web and Internet including Semantic Web, Recommendation Systems, Web Services, Cloud Computing, Web and Internet of Things, Internet of the Future, Information Retrieval on the Web, Interactive Systems, Smart Cities, Information Interactions and Visualization and Assistive Technologies.',
      urlCNPQ: 'https://wiser.ufba.br/gallery.html',
      researcherId: '6d78e1e5-5917-4a81-bce6-65610e79d4f1',
      members: { 
        connect: [
          { userId: '6d78e1e5-5917-4a81-bce6-65610e79d4f1' }, 
        ]
      },
    }
  ;

  try {
    await prisma.researchGroup.create({
      data: reseachGroups1,
    });
    await prisma.researchGroup.create({
      data: reseachGroups2,
    });
    console.log('Tabela de Grupo de Pesquisa preenchida com sucesso.');
  } catch (error) {
    console.error('Falha ao preencher tabela de Grupo de Pesquisa.');
    console.log(error.message);
  }
}