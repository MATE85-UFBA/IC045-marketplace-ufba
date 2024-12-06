import { User } from "@/context/loginContext";
import { loadUserFromLocalStorage } from "@/lib/user.storage";


class HttpService {
    private baseUrl: string;
  
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
  
    private getHeaders(additionalHeaders: Record<string, string> = {}): HeadersInit {
      const user: User| undefined = loadUserFromLocalStorage();
      return {
        "Content-Type": "application/json",
        ...(user?.access_token && { Authorization: `Bearer ${user.access_token}` }),
        ...additionalHeaders,
      };
    }
  
    async request(
      endpoint: string,
      options: RequestInit = {}
    ): Promise<Response> {
      const url = `${this.baseUrl}${endpoint}`;
      const headers = this.getHeaders(options.headers as Record<string, string>);
      return fetch(url, { ...options, headers });
    }
  
    async get(endpoint: string): Promise<Response> {
      return this.request(endpoint, { method: "GET" });
    }
  
    async post(
      endpoint: string,
      body: Record<string, unknown>
    ): Promise<Response> {
      return this.request(endpoint, {
        method: "POST",
        body: JSON.stringify(body),
      });
    }
  
    async put(
      endpoint: string,
      body: Record<string, unknown>
    ): Promise<Response> {
      return this.request(endpoint, {
        method: "PUT",
        body: JSON.stringify(body),
      });
    }
  
    async delete(endpoint: string): Promise<Response> {
      return this.request(endpoint, { method: "DELETE" });
    }
  }
  
  const httpService = new HttpService(process.env.NEXT_PUBLIC_API_URL as string);
  
  export default httpService;
