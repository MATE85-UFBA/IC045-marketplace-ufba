import { makeAutoObservable } from 'mobx';
import { deleteUserFromLocalStorage, persistUserToLocalStorage } from './login.actions';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

class LoginStore {
  user: { email: string; token: string | null } | null = null;
  isLoggedIn: boolean = false;
  isLoading: boolean = false;
  isAuthenticated = false;
  errorMessage: string = "";
  
  whenLoginSucessURL: string = "/"

  constructor() {
    makeAutoObservable(this);
  }

  async login(email: string, password: string, router: AppRouterInstance) {
    this.isLoading = true;
    this.errorMessage = "";
    
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then( async (value: Response) => {
     
      const content = await value.json();
      if (value.ok) {
        persistUserToLocalStorage(content);
        router.push(this.whenLoginSucessURL);
        this.isAuthenticated = true;
      } else {
        this.errorMessage = "Falha no login.";
      }
      
    }).catch( async (reason) => {
      this.errorMessage = "Falha no login";
    }).finally( async () => {
      this.isLoading = false;
    });
  }

  reset() {
    this.isLoading = false;
    this.isAuthenticated = false;
    this.errorMessage = "";
  }

  logout() {
    this.user = null;
    this.isLoggedIn = false;
    deleteUserFromLocalStorage();
  }
}

export default new LoginStore();
