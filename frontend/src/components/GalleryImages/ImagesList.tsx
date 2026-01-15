import { useState, useEffect, useCallback } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import { ModalImage } from "./ModalImage";
import { useGallery } from "@/hooks";
import type { Image } from "@/types";

export function ImagesList() {
  const [open, setOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<Image | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const cols = isMobile ? 1 : isTablet ? 2 : 4;
  const limit = cols * (isMobile ? 4 : isTablet ? 2 : 3);

  const { isLoading, isError, error, getImages } = useGallery();

  useEffect(() => {
    const fetchImages = async () => {
      //console.log("Fetching initial images with limit:", limit);
      const res = await getImages({ limit });
      //console.log("Initial API response:", res);
      setImages(res.data);
      setNextCursor(res.nextCursor ?? null);
    };
    fetchImages();
  }, [limit]);

  const loadMore = async () => {
    if (!nextCursor || isLoading) return;

    //console.log("Fetching more images with cursor:", nextCursor, "and limit:", limit);
    const res = await getImages({ limit, cursor: nextCursor });
    //console.log("Load more API response:", res);
    setImages((prev) => [...prev, ...res.data]);
    setNextCursor(res.nextCursor ?? null);
    //console.log("Updated nextCursor:", res.nextCursor);
  };

  const handleOpen = useCallback((image: Image) => {
    setActiveImage(image);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setActiveImage(null);
  }, []);

  if (isLoading && images.length === 0) {
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
    <Box
      sx={{
        maxHeight: "calc(100vh - 150px)",
        overflowY: "auto",
      }}
    >
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
        {images.map((item) => (
          <ImageListItem
            key={item.asset_id}
            onClick={() => handleOpen(item)}
            sx={{
              cursor: "pointer",
              borderRadius: 2,
              overflow: "hidden",
              transition: "all 0.35s",
              "&:hover": { transform: "translateY(-8px)" },
              "& img": { transition: "transform 0.35s" },
              "&:hover img": { transform: "scale(1.1)" },
            }}
          >
            <img
              src={item.url}
              alt={item.title}
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

      {nextCursor && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 4,
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={loadMore}
            disabled={isLoading || !nextCursor}
            sx={{ minWidth: 200 }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Load More"
            )}
          </Button>
        </Box>
      )}

      <ModalImage open={open} activeImage={activeImage} onClose={handleClose} />
    </Box>
  );
}
