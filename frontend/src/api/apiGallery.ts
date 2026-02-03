import type { Image } from "@/types";
import { apiCall } from "./axios";

export interface UpdateImagePayload {
  publicId: string;
  title: string;
  description?: string;
}

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

export const createImage = (formData: FormData) => {
  return apiCall<Image>("post", "/images/upload", formData);
};

export const updateImage = (data: UpdateImagePayload) => {
  if (!data.publicId) throw new Error("Public ID is required");
  return apiCall<Image>("put", "/images", data);
};

export const deleteImage = (publicId: string) => {
  console.log("publicId", publicId);
  return apiCall<{ message: string }>("delete", "/images", { publicId });
};
