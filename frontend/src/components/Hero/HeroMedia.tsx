import { Box } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type HeroMediaItem = {
  id: string;
  type: "IMAGE" | "VIDEO";
  media_url: string;
  title?: string;
  is_active: boolean;
};

export default function HeroMedia({
  items,
  intervalMs = 5500,
}: {
  items: HeroMediaItem[];
  intervalMs?: number;
}) {
  const { t } = useTranslation();
  const activeImages = useMemo(
    () => items.filter((x) => x.is_active && x.type === "IMAGE" && x.media_url),
    [items],
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (activeImages.length <= 1) return;
    const id = window.setInterval(
      () => setIndex((prev) => (prev + 1) % activeImages.length),
      intervalMs,
    );
    return () => window.clearInterval(id);
  }, [activeImages.length, intervalMs]);

  const current = activeImages[index];
  if (!current) return null;

  return (
    <Box sx={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <Box
        component="img"
        key={current.media_url}
        src={current.media_url}
        alt={current.title ?? t("heroMedia.alt")}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 30%",
          animation: "fadeUp 800ms ease-out",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: (theme) =>
            `linear-gradient(90deg,
              ${theme.palette.primary.dark}E6 0%,
              ${theme.palette.primary.dark}99 45%,
              ${theme.palette.primary.dark}33 100%)`,
        }}
      />

      <style>
        {`@keyframes heroFade { from { opacity: 0; } to { opacity: 1; } }`}
      </style>
    </Box>
  );
}
