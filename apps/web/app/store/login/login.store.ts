import { makeAutoObservable } from "mobx";
import userService from "../../service/user.service";
import {
  persistUserToLocalStorage,
  deleteUserFromLocalStorage,
} from "../../service/auth.storage";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { User } from "./login.types";

class LoginStore {
  isLoading: boolean = false;
  isAuthenticated: boolean = false;
  errorMessage: string = "";
  user: User | null = null;

  whenLoginSuccessURL: string = "/";

  constructor() {
    makeAutoObservable(this);
  }

  async login(email: string, password: string, router: AppRouterInstance) {
    this.isLoading = true;
    this.errorMessage = "";

    try {
      const user: User = await userService.login(email, password);
      this.user = user;
      persistUserToLocalStorage(user);
      this.isAuthenticated = true;
      router.push(this.whenLoginSuccessURL);
    } catch (error: Error) {
      this.errorMessage = error.message || "Login failed.";
    } finally {
      this.isLoading = false;
    }
  }

  reset() {
    this.user = null;
    this.isLoading = false;
    this.isAuthenticated = false;
    this.errorMessage = "";
  }

  logout() {
    this.user = null;
    this.isAuthenticated = false;
    deleteUserFromLocalStorage();
  }
}

export default new LoginStore();
