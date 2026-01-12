import type { Image } from "@/types";
import { apiCall } from "./axios";

export interface GetImagesParams {
  page: number;
  limit: number;
}

export interface GetImagesResponse {
  data: Image[];
  totalPages: number;
  total: number;
}

export const getImagesData = ({ page, limit }: GetImagesParams) => {
  return apiCall<GetImagesResponse>("get", "/images", {
    params: { page, limit },
  });
};
