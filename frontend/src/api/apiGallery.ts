import type { Image } from "@/types";
import { apiCall } from "./axios";

export const getAllImagesData = async (): Promise<Image[]> => {
  const res = await apiCall<Image[]>("get", "/img");
  return res;
};
