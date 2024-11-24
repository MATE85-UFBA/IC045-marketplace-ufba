import { CreateUser } from "../store/user-register/register.types";
import httpService from "./http.service";

class UserService {

    userUrl: string = `${process.env.NEXT_PUBLIC_API_URL}`;

    async login(email: string, password: string) {
        return (await httpService.post(`${this.userUrl}/auth/login`, { email, password })).json();
    }

    async register(user: CreateUser) {
        return (await httpService.post(`${this.userUrl}/users`, {user})).json();
    }

    async getUserProfile() {
        return httpService.get("/user/profile");
    }

    async updateUserProfile(data: Record<string, unknown>) {
        return httpService.put("/user/profile", data);
    }

    async deleteUserAccount() {
        return httpService.delete("/user");
    }
}

export default new UserService();
