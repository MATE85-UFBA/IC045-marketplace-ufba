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

export interface User {
    id: string,
    name: string,
    role: UserRole,
    img: string,
    utype: UserProfileType,
    access_token: string
}