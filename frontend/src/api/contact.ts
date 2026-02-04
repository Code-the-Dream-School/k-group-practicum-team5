import axios from "axios";
import type { ContactFormData} from "@/types/contact";



export const sendContactMessage = async (data: ContactFormData) =>{
  const res= await axios.post(`${import.meta.env.VITE_API_BASE_URL}/contact-messages`, data)
  return res.data
}
