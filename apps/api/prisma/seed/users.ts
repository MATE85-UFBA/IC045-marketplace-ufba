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
      id: '09e1f3d8-6ff2-4187-8e99-55de3fb97040',
      name: 'NVidia',
      email: 'atendimento@nvidia.com',
      role: UserRole.USER,
      img: '',
      password: await hashPassword('supernvidia'),
    },
    {
      id: '0e1bc090-3273-4eb9-acdd-e214e8cd724f',
      name: 'Coelba',
      email: 'atendimento@coelba.com.br',
      role: UserRole.USER,
      img: '',
      password: await hashPassword('supercoelba'),
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
    {
      id: '789e4567-e89b-12d3-a456-426614174000',
      name: 'Anakin Skywalker',
      email: 'anakin.skywalker@email.com.br',
      role: UserRole.USER,
      img: '',
      password: await hashPassword('senhastarwars'),
    },
    {
      id: '6d78e1e5-5917-4a81-bce6-65610e79d4f1',
      name: 'Fred Durão',
      email: 'fred.durao@email.com.br',
      role: UserRole.ADMIN,
      img: '',
      password: await hashPassword('senhaufba'),
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
