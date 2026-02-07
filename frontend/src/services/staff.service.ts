import axios from "axios";
import type { Staff } from "../types/staff.types";

const API = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api/v1";

export const staffService = {
  async getAll(params?: { department?: string; search?: string }) {
    const res = await axios.get<Staff[]>(`${API}/staff`, { params });
    // console.log("API staff response:", res.data)
    return res.data;
  },
};