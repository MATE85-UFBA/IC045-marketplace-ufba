export enum ResearcherType {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
}

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export interface CreateUser {
    name: string;
    img?: string;
    email: string;
    password: string;
    role: UserRole;
    company?: CreateUserCompany;
    researcher?: CreateUserResearcher;
}

export interface CreateUserCompany {
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
}

export interface CreateUserResearcher {
    urlLattes?: string;
    researcherType: ResearcherType;
}

export interface ChangePassword {
    newPassword: string;
    oldPassword: string;
}