import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Hero from "../components/Hero/Hero";
import { FeaturedAttractionsList } from "@/components/featuredAttractions";

function Home() {
  return (
    <Box>
      <Hero />
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box sx={{ color: "text.primary" }}>
          <FeaturedAttractionsList />
          <Typography>Highlights from Trip Advisor Reviews</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
