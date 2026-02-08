import { Box, Typography, Button } from "@mui/material";
import HeroMedia from "./HeroMedia";
import { heroMediaMock } from "../../data/heroMediaMock";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: { xs: "calc(70vh - 72px)", md: "calc(100vh - 72px)" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "common.white",
        px: 0,
        pt: 0,
        pb: 0,
      }}
    >
      <HeroMedia items={heroMediaMock} />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 900,
          px: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "left",
          color: "common.white",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.75rem",
            opacity: 0.85,
            letterSpacing: 0.8,
            textTransform: "uppercase",
            mb: 1,
          }}
        >
          Monroe, Washington
        </Typography>

        <Box
          sx={{
            width: 158,
            height: 3,
            backgroundColor: "secondary.main",
            borderRadius: 2,
            mb: 2,
          }}
        />

        <Typography variant="h3" sx={{ mb: 1 }}>
          A Closer Look at Nature’s Most Fascinating Creatures
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: 900,
            opacity: 0.9,
            mb: 3,
          }}
        >
          Come face-to-face with extraordinary reptiles through immersive,
          hands-on experiences.
        </Typography>

        <Button
          component={Link}
          to="/book-tickets"
          variant="contained"
          color="secondary"
          size="large"
        >
          Purchase Tickets
        </Button>
      </Box>
    </Box>
  );
}
