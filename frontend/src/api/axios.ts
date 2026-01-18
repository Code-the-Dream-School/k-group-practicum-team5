import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export async function apiCall<T>(
  method: "get" | "post" | "patch" | "delete",
  url: string,
  paramsOrData?: object,
  config: object = {},
): Promise<T> {
  const response =
    method === "get" || method === "delete"
      ? await api[method]<T>(url, { ...config, params: paramsOrData })
      : await api[method]<T>(url, paramsOrData, config);

  return response.data;
}
