import { apiCall } from "./axios";

interface SignupPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  user: {
    fullName: string;
    first_name: string;
    last_name: string;
  };
  token: string;
}

export const signup = (data: SignupPayload) =>
  apiCall<SignupResponse>("post", "/auth/register", data);
