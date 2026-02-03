import { useCallback } from "react";
import { getImagesData, createImage, updateImage, deleteImage } from "@/api";
import useRequest from "./useRequest";
import type { GetImagesParams, GetImagesResponse } from "@/api/apiGallery";
import type { Image } from "@/types";
import type { UpdateImagePayload } from "@/api/apiGallery";

export const useGallery = () => {
  const { run, isLoading, isError, error } = useRequest();

  const getImages = useCallback(
    ({ cursor, limit }: GetImagesParams) => {
      return run<GetImagesResponse>(() => getImagesData({ cursor, limit }));
    },
    [run],
  );

  const addImage = useCallback(
    (formData: FormData) => {
      return run<Image>(() => createImage(formData));
    },
    [run],
  );

  // Update to accept a single object with publicId, title, description
  const editImage = useCallback(
    (data: UpdateImagePayload) => {
      return run<Image>(() => updateImage(data));
    },
    [run],
  );

  const removeImage = useCallback(
    (id: string) => {
      return run<{ message: string }>(() => deleteImage(id));
    },
    [run],
  );

  return {
    isLoading,
    isError,
    error,
    getImages,
    addImage,
    editImage,
    removeImage,
  };
};
