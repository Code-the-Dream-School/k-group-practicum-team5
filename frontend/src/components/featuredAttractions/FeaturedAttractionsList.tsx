import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ImageList from "@mui/material/ImageList";
import { FeaturedAttractionCard } from "./FeaturedAttractionCard";
import { featuredAttractionsMock } from "@/data/featuredAttractionsMock";
import { useTranslation } from "react-i18next";

export function FeaturedAttractionsList() {
  const { t } = useTranslation();
  const items = featuredAttractionsMock;

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600-900px

  const cols = isXs ? 1 : isSm ? 2 : 3;
  const gap = isXs ? 12 : 24;
  const rowHeight = isXs ? 240 : 300;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ textAlign: "center", mt: 4, mb: 2, px: 2 }}>
        <Typography variant="h2">{t("featuredAttractions.title")}</Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 1, maxWidth: 760, mx: "auto" }}
        >
          {t("featuredAttractions.subtitle")}
        </Typography>
      </Box>

      <ImageList
        cols={cols}
        gap={gap}
        rowHeight={rowHeight}
        sx={{
          width: "100%",
          m: 0,
          px: { xs: 2, md: 4 },
          pb: { xs: 2, md: 3 },
          overflow: "hidden", // helps stop side-scroll on mobile
        }}
      >
        {items.map((item) => (
          <FeaturedAttractionCard key={item.id} attraction={item} />
        ))}
      </ImageList>
    </Box>
  );
}

export default FeaturedAttractionsList;
