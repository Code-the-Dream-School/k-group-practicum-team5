import { apiCall } from "./axios";
export const resetPasswordApi = (token: string, newPassword: string) =>
  apiCall("post", `/auth/reset-password/${token}`, {  newPassword });