import { useEffect, useState, useRef, useCallback } from "react";
import {
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  ImageList,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import { ErrorAlert, InfoAlert } from "@/components/alert";
import { ZooLoader } from "@/components/shared/ZooLoader";
import {
  SectionHeading,
  LoadControls,
  GalleryImageCard,
} from "../components/GalleryImages";
import DeleteImageDialog from "../components/GalleryImages/DeleteImageDialog";
import EditImageModal from "../components/GalleryImages/manage/EditImageModal";
import { useGallery } from "../hooks";
import type { Image } from "@/types";
import { useTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 12;
const BATCH_SIZE = 100;
const MESSAGE_DURATION = 2000;

const ManageGalleryPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<Image[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const { isLoading, isError, error, getImages } = useGallery();
  const { error: addError, addImage } = useGallery();
  const { error: removeError, removeImage } = useGallery();

  const cols = isMobile ? 1 : isTablet ? 2 : 4;
  const hasMoreImages = Boolean(nextCursor);
  const isEmpty = images.length === 0;

  const showMessage = useCallback((text: string, isError = false) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage(null), MESSAGE_DURATION);
  }, []);

  const loadImages = useCallback(async () => {
    const res = await getImages({ limit: ITEMS_PER_PAGE });
    setImages(res.data);
    setNextCursor(res.nextCursor ?? null);
  }, [getImages]);

  useEffect(() => {
    const fetchImages = async () => {
      await loadImages();
    };
    fetchImages();
  }, [loadImages]);

  const loadMore = async () => {
    if (!nextCursor || isLoading) return;

    const res = await getImages({ limit: ITEMS_PER_PAGE, cursor: nextCursor });
    setImages((prev) => [...prev, ...res.data]);
    setNextCursor(res.nextCursor ?? null);
  };

  const loadAll = async () => {
    if (!nextCursor || isLoading) return;

    let cursor: string | null = nextCursor;
    const allNewImages: Image[] = [];

    while (cursor) {
      const res = await getImages({ limit: BATCH_SIZE, cursor });
      allNewImages.push(...res.data);
      cursor = res.nextCursor ?? null;
    }

    setImages((prev) => [...prev, ...allNewImages]);
    setNextCursor(null);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    await addImage(formData);

    if (addError) {
      showMessage(t("galleryManage.addFailed", { error: addError }), true);
    } else {
      showMessage(t("galleryManage.addSuccess"));
      loadImages();
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;

    await removeImage(deleteTargetId);

    if (removeError) {
      showMessage(
        t("galleryManage.deleteFailed", { error: removeError }),
        true,
      );
    } else {
      showMessage(t("galleryManage.deleteSuccess"));
      loadImages();
    }

    setDeleteTargetId(null);
  };

  const handleEdit = (id: string) => {
    const image = images.find((img) => img.publicId === id);
    if (image) setSelectedImage(image);
  };

  if (isLoading && isEmpty) {
    return <ZooLoader />;
  }

  if (isError) {
    return <ErrorAlert message={error || t("galleryManage.loadFailed")} />;
  }

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Box sx={{ textAlign: { xs: "left", sm: "center" }, my: 2 }}>
        <SectionHeading title={t("galleryManage.title")} />
      </Box>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        ref={fileInputRef}
        hidden
      />

      <IconButton
        sx={{
          position: "fixed",
          top: 100,
          right: 40,
          zIndex: 1300,
          color: "primary.main",
          backgroundColor: "background.paper",
          borderRadius: "50%",
          p: 1.5,
          boxShadow: 2,
          "&:hover": {
            backgroundColor: "background.default",
          },
        }}
        onClick={() => fileInputRef.current?.click()}
        aria-label={t("galleryManage.addAria")}
      >
        <AddPhotoAlternateIcon fontSize="large" />
      </IconButton>

      <EditImageModal
        open={Boolean(selectedImage)}
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        onSave={loadImages}
      />

      <DeleteImageDialog
        open={Boolean(deleteTargetId)}
        onCancel={() => setDeleteTargetId(null)}
        onConfirm={handleDeleteConfirm}
      />

      {message && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {message.isError ? (
            <ErrorAlert message={message.text} />
          ) : (
            <InfoAlert message={message.text} />
          )}
        </Box>
      )}

      <Box sx={{ flex: 1, width: "100%", minHeight: 0 }}>
        {isEmpty ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "calc(100vh - 250px)",
              p: 3,
            }}
          >
            <InfoAlert message={t("galleryManage.noImages")} />
          </Box>
        ) : (
          <>
            <ImageList
              cols={cols}
              gap={24}
              rowHeight={275}
              sx={{
                width: "100%",
                maxWidth: "100%",
                m: 0,
                p: 3,
                overflow: "visible",
              }}
            >
              {images.map((image) => (
                <Box key={image.publicId} sx={{ position: "relative" }}>
                  <GalleryImageCard
                    image={image}
                    onClick={() => handleEdit(image.publicId)}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: isMobile ? 12 : isTablet ? 20 : 28,
                      right: isMobile ? 12 : isTablet ? 20 : 28,
                      zIndex: 2,
                      backgroundColor: "error.main",
                      color: "common.white",
                      borderRadius: "50%",
                      p: 1,
                      boxShadow: 2,
                      "&:hover": {
                        backgroundColor: "error.dark",
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); //not trigger parent onClick event
                      setDeleteTargetId(image.publicId);
                    }}
                    aria-label={t("galleryManage.deleteAria")}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </ImageList>

            {hasMoreImages && (
              <LoadControls
                isLoading={isLoading}
                nextCursor={nextCursor}
                onLoadMore={loadMore}
                onLoadAll={loadAll}
              />
            )}

            {!hasMoreImages && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <InfoAlert message={t("galleryManage.noMore")} />
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ManageGalleryPage;
