import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { Box, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ImageList from "@mui/material/ImageList";
import { InfoAlert, ErrorAlert } from "@/components/alert";
import { ZooLoader } from "@/components/shared";
import { ModalImage } from "./ModalImage";
import { GalleryImageCard } from "./GalleryImageCard";
import { LoadControls } from "./LoadControls";
import { useGallery } from "@/hooks";
import type { Image } from "@/types";
import { useTranslation } from "react-i18next";

type ImageListProps = {
  searchQuery?: string;
};

export function ImagesList({ searchQuery = "" }: ImageListProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<Image | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [noMoreMatches, setNoMoreMatches] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const cols = isMobile ? 1 : isTablet ? 2 : 4;
  const limit = cols * (isMobile ? 4 : isTablet ? 2 : 3);

  const { isLoading, isError, error, getImages } = useGallery();

  const filteredImages = useMemo(() => {
    if (!searchQuery.trim()) {
      return images;
    }
    const query = searchQuery.toLowerCase();
    return images.filter(
      (img) =>
        img.title?.toLowerCase().includes(query) ||
        img.description?.toLowerCase().includes(query),
    );
  }, [images, searchQuery]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await getImages({ limit });

      setImages(res.data);
      setNextCursor(res.nextCursor ?? null);
    };
    fetchImages();
  }, [limit, getImages]);

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

    const query = searchQuery.trim().toLowerCase();
    let cursorLocal: string | null = nextCursor;
    let aggregatedNewImages: Image[] = [];
    let aggregatedMatches: Image[] = [];
    setNoMoreMatches(false);

    if (query) {
      while (cursorLocal && aggregatedMatches.length === 0) {
        const res = await getImages({ limit, cursor: cursorLocal });
        const newBatch = res.data;
        aggregatedNewImages = [...aggregatedNewImages, ...newBatch];
        const matches = newBatch.filter(
          (img) =>
            img.title?.toLowerCase().includes(query) ||
            img.description?.toLowerCase().includes(query),
        );
        aggregatedMatches = [...aggregatedMatches, ...matches];
        cursorLocal = res.nextCursor ?? null;
      }

      if (aggregatedNewImages.length > 0) {
        setImages((prev) => [...prev, ...aggregatedNewImages]);
      }
      setNextCursor(cursorLocal);

      if (!cursorLocal && aggregatedMatches.length === 0) {
        setNoMoreMatches(true);
      }
    } else {
      const res = await getImages({ limit, cursor: cursorLocal });
      setImages((prev) => [...prev, ...res.data]);
      setNextCursor(res.nextCursor ?? null);
    }
  };

  const loadAll = async () => {
    if (!nextCursor || isLoading) return;

    let cursor: string | null = nextCursor;
    let allNewImages: Image[] = [];

    while (cursor) {
      const res = await getImages({ limit: 100, cursor });
      allNewImages = [...allNewImages, ...res.data];
      cursor = res.nextCursor ?? null;
    }

    setImages((prev) => [...prev, ...allNewImages]);
    setNextCursor(null);
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
        <ZooLoader />
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
        <ErrorAlert message={error || t("imagesList.loadError")} />
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        height: "100%",
        overflowY: "auto",
        position: "relative",
      }}
    >
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
        {filteredImages.map((item) => (
          <GalleryImageCard
            key={item.publicId}
            image={item}
            onClick={handleOpen}
          />
        ))}
      </ImageList>

      {nextCursor &&
        (searchQuery.trim() === "" || filteredImages.length > 0) && (
          <LoadControls
            isLoading={isLoading}
            nextCursor={nextCursor}
            onLoadMore={loadMore}
            onLoadAll={loadAll}
          />
        )}

      {searchQuery.trim() && noMoreMatches && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InfoAlert message={t("imagesList.noMoreMatches")} />
        </Box>
      )}

      {!nextCursor && filteredImages.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InfoAlert message={t("imagesList.noMore")} />
        </Box>
      )}

      {filteredImages.length === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "calc(100vh - 250px)",
            p: 3,
          }}
        >
          <InfoAlert message={t("imagesList.noImages")} />
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
