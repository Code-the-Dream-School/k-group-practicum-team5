import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Home() {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        color: "primary.contrastText",
        px: 4,
        py: 8,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h2" color="text.primary">
          Welcome to The Reptile Zoo
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: 600,
            color: "text.primary",
          }}
        >
          Explore the fascinating world of reptiles through hands-on exhibits,
          conservation efforts, and unforgettable experiences.
        </Typography>

        {/* CTA */}
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="secondary" size="large">
            Buy Tickets
          </Button>
        </Box>

        {/* Placeholder sections */}
        <Box
          sx={{ mt: 8, opacity: 0.85, maxWidth: 600, color: "text.primary" }}
        >
          <Typography>Real-time open/closed status</Typography>
          <Typography>Featured Attractions</Typography>
          <Typography>Highlights from Trip Advisor Reviews</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
