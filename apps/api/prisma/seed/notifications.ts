import { NotificationStartedBy, PrismaClient} from '@prisma/client';

export async function SeedNotifications(prisma: PrismaClient) {
  const notification1 = {
        message: 'Tenho interesse em criar um projeto baseado em sua demanda',
        demandId: '7405974c-6ef1-4d0c-9be0-962b7d97c8d9',
        researchGroupId: '3ffe6190-adb2-49dd-9614-e3714e443539',
        started_by: NotificationStartedBy.RESEARCHGROUP,
    }
  ;
  const notification2 = {
    message: 'Tenho interesse que seu Grupo de Pesquisa desenvolva um projeto para minha demanda',
    demandId: '21a64aad-5c76-45a7-82b9-20fd56be6ad6',
    researchGroupId: '3ffe6190-adb2-49dd-9614-e3714e443539',
    started_by: NotificationStartedBy.COMPANY,
  }

  try {
    await prisma.notification.create({
      data: notification1,
    });
    await prisma.notification.create({
      data: notification2,
    });
    console.log('Tabela de Notificações preenchida com sucesso.');
  } catch (error) {
    console.error('Falha ao preencher tabela de Notificações.');
    console.log(error.message);
  }
}