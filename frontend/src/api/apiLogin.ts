import { apiCall } from "./axios";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    fullName: string;
    first_name: string;
    last_name: string;
    email: string;
    is_admin: boolean;
    
  };
  token: string;
}

export const loginApi = (data: LoginPayload) =>
  apiCall<LoginResponse>("post", "/auth/login", data);
