import { hashPassword } from '../../src/user/utils/hashPassword.util';
import { PrismaClient, UserRole } from '@prisma/client';

export async function SeedUsers(prisma: PrismaClient) {
  const users = [
    {
      name: 'Reginaldo Rossi',
      email: 'reginaldo.rossi@email.com.br',
      role: UserRole.ADMIN,
      img: '',
      password: await hashPassword('mycrazysecurepassword'),
    },
    {
      name: 'Maria Bethânia',
      email: 'maria.bethania@email.com.br',
      role: UserRole.USER,
      img: '',
      password: await hashPassword('superpassword'),
    },
    {
      name: 'Luke Skywalker',
      email: 'luke.skywalker@email.com.br',
      role: UserRole.USER,
      img: '',
      password: await hashPassword('senhasecreta'),
    },
    {
      name: 'Guto Marcelo',
      email: 'guto.marcelo@email.com.br',
      role: UserRole.USER,
      img: '',
      password: await hashPassword('senhamarota'),
    },
  ];

  try {
    await prisma.user.createMany({
      data: users,
    });
    console.log('Tabela de Usuários preenchida com sucesso.');
  } catch (error) {
    console.error('Falha ao preencher tabela de Usuários.');
    console.log(error.message);
  }
}
