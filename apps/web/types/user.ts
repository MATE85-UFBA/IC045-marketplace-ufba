export enum ResearcherType {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
}

export enum UserProfileType {
    RESEARCHER = 'RESEARCHER',
    COMPANY = 'COMPANY',
    NONE = 'NONE',
    ANY = "ANY"
}

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
    ANY = 'ANY',
}

export enum UserStatus {
    APPROVED = 'APPROVED',
    BLOCK = 'BLOCK',
    PENDING = 'PENDING',
}

export interface User {
    id: string,
    name: string,
    email: string,
    role: UserRole,
    img: string,
    utype: UserProfileType,
    access_token: string
}

export interface AdminUpdateUser {

    role: UserRole,
    status: UserStatus
}
