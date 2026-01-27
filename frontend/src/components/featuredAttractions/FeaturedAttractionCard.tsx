import ImageListItem from "@mui/material/ImageListItem";
import { Box, Chip, Stack, Typography } from "@mui/material";
import type { FeaturedAttraction } from "@/data/featuredAttractionsMock";

type FeaturedAttractionCardProps = {
  attraction: FeaturedAttraction;
  onClick?: (attraction: FeaturedAttraction) => void;
};

export function FeaturedAttractionCard({
  attraction,
  onClick,
}: FeaturedAttractionCardProps) {
  return (
    <ImageListItem
      role="listitem"
      key={attraction.id}
      onClick={() => onClick?.(attraction)}
      sx={{
        cursor: onClick ? "pointer" : "default",
        borderRadius: 3,
        m: 0,
        overflow: "hidden",
        position: "relative",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        transition: "border-color 180ms ease, box-shadow 180ms ease",
        "&:hover": onClick
          ? {
              borderColor: "primary.main",
              boxShadow: "0 14px 30px rgba(31,61,43,0.18)",
            }
          : undefined,
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={attraction.image || "/assets/featured/placeholder.jpg"}
        alt={`${attraction.name} - ${attraction.species}`}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "filter 180ms ease",
          "&:hover": onClick
            ? { filter: "contrast(1.04) saturate(1.06)" }
            : undefined,
        }}
      />

      <Box sx={{ position: "absolute", top: 14, left: 14 }}>
        <Chip
          label="Featured"
          color="primary"
          size="small"
          sx={{ fontWeight: 800 }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          p: 2,
          color: "text.primary",
          bgcolor: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(8px)",
          borderTop: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
          {attraction.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {attraction.species}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
          {attraction.location ? (
            <Chip size="small" label={attraction.location} variant="outlined" />
          ) : null}
          {attraction.isEndangered ? (
            <Chip size="small" label="Endangered" color="secondary" />
          ) : null}
          {attraction.venomous ? (
            <Chip size="small" label="Venomous" color="secondary" />
          ) : null}
        </Stack>
      </Box>
    </ImageListItem>
  );
}

export default FeaturedAttractionCard;
