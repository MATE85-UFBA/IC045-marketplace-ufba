import { Demand } from '@prisma/client';

export const demands: Demand[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Demand',
    public: true,
    description: 'teste description',
    status: 'CREATED',
    companyId: '123e4567-e89b-12d3-a456-426614174000',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '123e4567-e89b-12d3-a456-831279238193',
    name: 'Demand 2',
    public: true,
    description: 'teste description',
    status: 'CREATED',
    companyId: '123e4567-e89b-12d3-a456-831279238193',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '123123129-e89b-12d3-a456-831279238193',
    name: 'Demand 3',
    public: true,
    description: 'teste description',
    status: 'CREATED',
    companyId: '123e4567-e89b-12d3-a456-831279238193',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
