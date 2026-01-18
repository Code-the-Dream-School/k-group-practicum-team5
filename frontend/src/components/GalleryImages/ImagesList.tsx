import { useState, useEffect, useCallback, useRef } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { Box, CircularProgress, Typography, Button, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const galleryTopRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowScrollTop(container.scrollTop > 300);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const loadMore = async () => {
    if (!nextCursor || isLoading) return;

    const previousImageCount = images.length;

    //console.log("Fetching more images with cursor:", nextCursor, "and limit:", limit);
    const res = await getImages({ limit, cursor: nextCursor });
    //console.log("Load more API response:", res);
    setImages((prev) => [...prev, ...res.data]);
    setNextCursor(res.nextCursor ?? null);
    //console.log("Updated nextCursor:", res.nextCursor);

    setTimeout(() => {
      if (containerRef.current) {
        const container = containerRef.current;
        const imageItems = container.querySelectorAll('[role="listitem"]');
        const firstNewImage = imageItems[previousImageCount];

        if (firstNewImage) {
          firstNewImage.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
          });
        }
      }
    }, 150);
  };

  const handleOpen = useCallback((image: Image) => {
    setActiveImage(image);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setActiveImage(null);
  }, []);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
      ref={containerRef}
      sx={{
        maxHeight: "calc(100vh - 150px)",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <div ref={galleryTopRef} />
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
              "&:hover": { transform: "translateY(-6px)" },
              "& img": { transition: "transform 0.35s" },
              "&:hover img": { transform: "scale(1.05)" },
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
          ref={loadMoreRef}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 2,
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

      {showScrollTop && (
        <Fab
          color="primary"
          size="medium"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            zIndex: 1000,
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}

      <ModalImage open={open} activeImage={activeImage} onClose={handleClose} />
    </Box>
  );
}
