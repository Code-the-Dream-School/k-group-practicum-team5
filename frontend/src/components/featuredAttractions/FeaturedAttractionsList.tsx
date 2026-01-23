import { Box, Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import { FeaturedAttractionCard } from "./FeaturedAttractionCard";
import { featuredAttractionsMock } from "@/data/featuredAttractionsMock";
import type { FeaturedAttraction } from "@/data/featuredAttractionsMock";

type FeaturedAttractionsListProps = {
  onSelect?: (attraction: FeaturedAttraction) => void;
};

export function FeaturedAttractionsList({
  onSelect,
}: FeaturedAttractionsListProps) {
  const items = featuredAttractionsMock;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ textAlign: "center", mt: 4, mb: 2, px: 2 }}>
        <Typography variant="h2">Featured Attractions</Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 1, maxWidth: 760, mx: "auto" }}
        >
          Discover rare species, iconic favorites, and unforgettable exhibits
          that define the Reptile Zoo experience.
        </Typography>
      </Box>

      <ImageList
        cols={3}
        gap={24}
        rowHeight={300}
        sx={{
          width: "100%",
          m: 0,
          px: { xs: 2, md: 4 },
          pb: { xs: 2, md: 3 },
          overflow: "visible",
        }}
      >
        {items.map((item) => (
          <FeaturedAttractionCard
            key={item.id}
            attraction={item}
            onClick={onSelect}
          />
        ))}
      </ImageList>
    </Box>
  );
}

export default FeaturedAttractionsList;
