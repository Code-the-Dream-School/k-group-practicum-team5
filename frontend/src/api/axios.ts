import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export async function apiCall<T>(
  method: "get" | "post" | "patch" | "delete" | "put",
  url: string,
  paramsOrData?: object,
  config: object = {},
): Promise<T> {
  switch (method) {
    case "get": {
      const response = await api.get<T>(url, {
        ...config,
        ...(paramsOrData ? { params: paramsOrData } : {}),
      });
      return response.data;
    }
    case "delete": {
      const response = await api.delete<T>(url, {
        ...config,
        data: paramsOrData,
      });
      return response.data;
    }
    case "put": {
      const response = (await api.put<T>(url, paramsOrData, config));
      return response.data;
    }
    case "post": {
      const response = await api.post<T>(url, paramsOrData, config);
      return response.data;
    }
    case "patch": {
      const response = await api.patch<T>(url, paramsOrData, config);
      return response.data;
    }
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
}
