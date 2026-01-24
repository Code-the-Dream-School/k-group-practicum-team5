import { useCallback } from "react";
import { getImagesData } from "@/api";
import useRequest from "./useRequest";
import type { GetImagesParams, GetImagesResponse } from "@/api/apiGallery";

export const useGallery = () => {
  const { run, isLoading, isError, error } = useRequest();

  const getImages = useCallback(
    ({ cursor, limit }: GetImagesParams) => {
      return run<GetImagesResponse>(() => getImagesData({ cursor, limit }));
    },
    [run],
  );

  return {
    isLoading,
    isError,
    error,
    getImages,
  };
};
