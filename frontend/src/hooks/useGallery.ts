import { getImagesData } from "@/api";
import useRequest from "./useRequest";
import type { GetImagesParams, GetImagesResponse } from "@/api/apiGallery";

export const useGallery = () => {
  const { run, isLoading, isError, error } = useRequest();

  const getImages = ({ cursor, limit }: GetImagesParams) =>
    run<GetImagesResponse>(() => getImagesData({ cursor, limit }));

  return {
    isLoading,
    isError,
    error,
    getImages,
  };
};
