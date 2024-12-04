import { CreateUser, CreateUserCompany, CreateUserResearcher, ResearcherType, UserRole } from "./register.types";

export const COMPANY = 'empresa';
export const RESEARCHER = 'pesquisador';

export function getUserFromData(userData: {
    name: string,
    utype: string,
    email: string,
    password: string,
    passwordConfirmation: string
  }): CreateUser {

    var company: CreateUserCompany | undefined;
    var researcher: CreateUserResearcher | undefined;

    if (userData.utype == COMPANY) {
        company = {
            contactName: userData.name,
            contactEmail: userData.email
        }
    } else if (userData.utype == RESEARCHER) {
        researcher = {
            researcherType: ResearcherType.STUDENT
        }
    } else {
        researcher = undefined;
        company = undefined;
    }

    const createUser: CreateUser = {
        ...userData,
        role: UserRole.USER,
        company: company, 
        researcher: researcher,
    };
    return createUser;
}