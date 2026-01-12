import { useState, useEffect, useCallback, useRef } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { Box, CircularProgress, Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import PaginatedImageGallery from "./PaginatedImageGallery";
import { ModalImage } from "./ModalImage";
import { useGallery } from "@/hooks";
import type { Image } from "@/types";

export function ImagesList() {
  const [open, setOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<Image | null>(null);
  const [images, setImages] = useState<Image[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const cols = isMobile ? 1 : isTablet ? 2 : 4;
  const rows = isMobile ? 1 : isTablet ? 2 : 3;
  const limit = cols * rows;

  const prevColsRef = useRef(cols);

  const { isLoading, isError, error, getImages } = useGallery();

  useEffect(() => {
    if (prevColsRef.current !== cols) {
      prevColsRef.current = cols;
      setPage(1);
    }
  }, [cols]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await getImages({ page, limit });
      console.log("Fetching page:", page, "limit:", limit);
      console.log("Response:", res);
      setImages(res.data);
      setTotalPages(res.totalPages);
    };

    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  const handleOpen = useCallback((image: Image) => {
    setActiveImage(image);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setActiveImage(null);
  }, []);

  const handlePageChange = useCallback((_: unknown, value: number) => {
    setPage(value);
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 200px)",
        }}
      >
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 200px)",
        }}
      >
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <ImageList
        cols={cols}
        gap={12}
        rowHeight={300}
        sx={{
          width: "100%",
          maxWidth: "100%",
          m: 0,
          p: 0,
          overflow: "visible",
        }}
      >
        {images.map((item, index) => (
          <ImageListItem
            key={item.asset_id}
            onClick={() => handleOpen(item)}
            sx={{
              cursor: "pointer",
              borderRadius: 2,
              overflow: "hidden",
              transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              animation: `fadeIn 0.5s ease-in ${index * 0.05}s both`,
              "@keyframes fadeIn": {
                from: { opacity: 0, transform: "translateY(20px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
              "&:hover": { transform: "translateY(-8px)" },
              "& img": { transition: "transform 0.35s ease" },
              "&:hover img": { transform: "scale(1.1)" },
            }}
          >
            <img
              src={item.url}
              alt={item.title}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      <PaginatedImageGallery
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <ModalImage open={open} activeImage={activeImage} onClose={handleClose} />
    </>
  );
}
