import { CreateUser } from "@/context/userRegisterContext";
import httpService from "./http.service";

class UserService {

    async handleAuthResponse(response: Response) {
        const data = await response.json();
        if (!response.ok) {
            const errorMessage = data?.message || 'Falha no login';
            throw new Error(errorMessage);
        }
        return data;
    }

    async login(email: string, password: string) {
        const response = await httpService.post('/auth/login', { email, password });
        return await this.handleAuthResponse(response);
    }

    async register(user: CreateUser) {
        const response = await httpService.post('/users', {...user});
        return await this.handleAuthResponse(response);
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
