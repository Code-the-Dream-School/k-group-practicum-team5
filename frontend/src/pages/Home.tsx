import Box from "@mui/material/Box";

import Hero from "../components/Hero/Hero";
import { FeaturedAttractionsList } from "@/components/featuredAttractions";
import { TripadvisorHighlightsSection } from "@/components/tripadvisor";

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

          <TripadvisorHighlightsSection />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
