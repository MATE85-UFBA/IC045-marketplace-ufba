import {
  getUserType,
  COMPANY,
  RESEARCHER,
  NONE,
} from '@/user/utils/user.types.util';
import {
  User,
  UserRole,
  UserStatus,
  ResearcherType,
  Company,
} from '@prisma/client'; // Assuming you have Prisma Client installed

describe('getUserType', () => {
  it('should return COMPANY when user.company is true', () => {
    const company: Company = {
      userId: 'some-user-id',
      contactName: 'John Doe',
      contactEmail: 'contact@example.com',
      contactPhone: '+1-555-123-4567',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const user = {
      id: 'some-user-id',
      email: 'test@example.com',
      name: 'Test User',
      img: 'https://example.com/image.jpg',
      password: 'hashed-password',
      role: UserRole.USER,
      status: UserStatus.APPROVED,
      resetToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: company,
    };

    expect(getUserType(user)).toBe(COMPANY);
  });

  it('should return RESEARCHER when user.company is false and user.researcher is true', () => {
    const user = {
      id: 'some-user-id',
      email: 'test@example.com',
      name: 'Test User',
      img: 'https://example.com/image.jpg',
      password: 'hashed-password',
      role: UserRole.USER,
      status: UserStatus.APPROVED,
      resetToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: null,
      researcher: {
        userId: 'some-user-id',
        urlLattes: 'http://lattes.cnpq.br/some-lattes-id',
        researcherType: ResearcherType.TEACHER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
    expect(getUserType(user)).toBe(RESEARCHER);
  });

  it('should return NONE when both user.company and user.researcher are false', () => {
    const user = {
      id: 'some-user-id',
      email: 'test@example.com',
      name: 'Test User',
      img: 'https://example.com/image.jpg',
      password: 'hashed-password',
      role: UserRole.USER,
      status: UserStatus.APPROVED,
      resetToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: null,
      researcher: null,
    };
    expect(getUserType(user)).toBe(NONE);
  });
});
