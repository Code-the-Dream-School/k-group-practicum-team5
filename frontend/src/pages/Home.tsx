import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import BusinessHoursPanel from '@/components/BusinessHoursPanel';


import Hero from "../components/Hero/Hero";

function Home() {
  return (
    <Box>
      {/* Hero Section */}
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
        {/* Placeholder sections */}
            


        <Box
          sx={{ mt: 8, opacity: 0.85, maxWidth: 600, color: "text.primary" }}
        >
      
          <Typography>Real-time open/closed status</Typography>
                  <BusinessHoursPanel/>
          <Typography>Featured Attractions</Typography>
          <Typography>Highlights from Trip Advisor Reviews</Typography>
        </Box>
        </Box>
    </Box>
      
  );
}

export default Home;
