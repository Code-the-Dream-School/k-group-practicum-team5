import { Link as RouterLink } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

export default function TicketSuccessPage() {
  return (
    <Box
      sx={{ minHeight: "70vh", display: "grid", placeItems: "center", p: 2 }}
    >
      <Card sx={{ width: "100%", maxWidth: 560 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h3" gutterBottom>
            Payment successful!
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            Thanks! Your payment went through.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              component={RouterLink}
              to="/book-tickets"
              variant="contained"
              color="primary"
            >
              Book more tickets
            </Button>

            <Button
              component={RouterLink}
              to="/"
              variant="outlined"
              color="primary"
            >
              Back home
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
