import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export const sendContactMessage = (data: any) =>
  axios.post(`${API}/contact-messages`, data);
