import { Company, User } from '@prisma/client';

export type UserWithCompany = Omit<User, 'password' | 'resetToken'> & {
  company: Company | null;
};
