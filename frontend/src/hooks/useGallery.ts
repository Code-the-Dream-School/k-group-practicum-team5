import { getAllImagesData } from "@/api";
import type { Image } from "@/types";
import useRequest from "./useRequest";

export const useGallery = () => {
  const { run, isLoading, isError, error } = useRequest();

  const getAllImages = () => run<Image[]>(getAllImagesData);

  return {
    isLoading,
    isError,
    error,
    getAllImages,
  };
};
