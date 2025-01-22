import userService from "@/api/user.service";
import { makeAutoObservable } from "mobx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getUserFromData } from "./register.actions";


class UserRegisterStore {
  isLoading = false;
  errorMessage = "";
  successUrl = "/login";

  constructor() {
    makeAutoObservable(this);
  }

  async registerUser(userData: {
    name: string,
    utype: string,
    email: string,
    password: string,
    passwordConfirmation: string
  }, router: AppRouterInstance) {
    this.isLoading = true;
    this.errorMessage = "";
    
    if (userData.password != userData.passwordConfirmation) {
      this.errorMessage = "As senhas não estão iguais."
      this.isLoading = false;
      return;
    }
    try {
      await userService.register(getUserFromData(userData));
      router.push(this.successUrl);
    } catch (error: any) {
      this.errorMessage = error.message || "Failed to register user.";
      throw error;
    } finally {
      this.isLoading = false;
    }
  }
}

export default new UserRegisterStore();
