import { getImagesData } from "@/api";
import useRequest from "./useRequest";
import type { Image } from "@/types";

interface GetImagesParams {
  page: number;
  limit: number;
}

interface GetImagesResponse {
  data: Image[];
  totalPages: number;
  total: number;
}

export const useGallery = () => {
  const { run, isLoading, isError, error } = useRequest();

  const getImages = ({ page, limit }: GetImagesParams) =>
    run<GetImagesResponse>(() => getImagesData({ page, limit }));

  return {
    isLoading,
    isError,
    error,
    getImages,
  };
};
