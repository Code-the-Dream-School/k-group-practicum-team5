import { apiCall } from "./axios";
export const forgotPasswordApi = (email: string) =>
  apiCall("post", "/auth/forgot-password", { email });
