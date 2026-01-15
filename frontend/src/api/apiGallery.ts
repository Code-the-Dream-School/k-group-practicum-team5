import type { Image } from "@/types";
import { apiCall } from "./axios";

export interface GetImagesParams {
  cursor?: string | null;
  limit?: number | null;
}

export interface GetImagesResponse {
  data: Image[];
  total: number;
  nextCursor?: string | null;
}

export const getImagesData = ({ limit, cursor }: GetImagesParams) => {
  return apiCall<GetImagesResponse>("get", "/images", {
    limit,
    ...(cursor && { cursor }),
  });
};
