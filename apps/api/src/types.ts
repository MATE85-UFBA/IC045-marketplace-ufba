import { Company, Researcher, User } from '@prisma/client';

export type UserWithCompany = Omit<User, 'password' | 'resetToken'> & {
  company: Company | null;
};

export type UserWithProfiles = Omit<User, 'password' | 'resetToken'> & {
  company: Company | null;
  researcher: Researcher | null;
};