import { CreateUser, CreateUserCompany, CreateUserResearcher } from "./register.types";
import {ResearcherType, UserProfileType, UserRole} from "@/types/user";


export function getUserFromData(userData: {
    name: string,
    utype: string,
    email: string,
    password: string,
    passwordConfirmation: string
  }): CreateUser {

    let company: CreateUserCompany | undefined;
    let researcher: CreateUserResearcher | undefined;

    if (userData.utype == UserProfileType.COMPANY) {
        company = {
            contactName: userData.name,
            contactEmail: userData.email
        }
    } else if (userData.utype == UserProfileType.RESEARCHER) {
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