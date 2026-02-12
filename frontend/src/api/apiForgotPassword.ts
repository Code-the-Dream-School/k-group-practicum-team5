import { apiCall } from "./axios";
export const forgotPasswordApi = (email: string, lang: string) =>
  apiCall("post", "/auth/forgot-password", { email, lang });
