import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export async function apiCall<T>(
  method: "get" | "post" | "patch" | "delete",
  url: string,
  data?: unknown,
): Promise<T> {
  const response =
    method === "get" || method === "delete"
      ? await api[method]<T>(url)
      : await api[method]<T>(url, data);

  return response.data;
}
