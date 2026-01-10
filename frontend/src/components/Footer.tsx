import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import lizard from "src/assets/logo/lizard.png";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#0B3D2E", color: "#FFFFFF", mt: 4 }}>
      {/* Top Section: Logo + About */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "flex-start",
          p: 4,
          gap: 4,
        }}
      >
        {/* Logo + Title + Description */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 4000,
          }}
        >
          {/* Logo + Title side by side */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              component="img"
              src={lizard}
              alt="Lizard Logo"
              sx={{ height: 58 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 400, color: "#7CFF9B" }}>
              Reptile Kingdom
            </Typography>
          </Box>

          {/* Description */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: 500,
            }}
          >
            <Typography variant="body2">
              Experience the fascinating world of reptiles. Education,
              conservation, and wonder await at every turn.
            </Typography>
          </Box>
        </Box>

        {/* Quick Links */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="subtitle1">Quick Links</Typography>
          {["Home", "Exhibits", "Visit", "About"].map((label) => (
            <Typography
              key={label}
              variant="body2"
              component={NavLink}
              to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
              sx={{
                color: "#FFFFFF",
                textDecoration: "none",
                "&:hover": { color: "#FFD700" },
                "&.active": { color: "#FFD700" },
              }}
            >
              {label}
            </Typography>
          ))}
        </Box>

        {/* Contact Info */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Contact
          </Typography>

          {/* Contact list */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="body2" sx={{ color: "#AAAAAA" }}>
              info@thereptilezoo.com
            </Typography>
            <Typography variant="body2" sx={{ color: "#AAAAAA" }}>
              + 714.500.0591
            </Typography>
            <Typography variant="body2" sx={{ color: "#AAAAAA" }}>
              Mon-Fri: 9am - 5pm
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* All rights reserved */}
      <Box sx={{ p: 2, textAlign: "center", borderTop: "1px solid #14472B" }}>
        © 2025 The Reptile Zoo. All Rights Reserved. Discover the wild within.
      </Box>
    </Box>
  );
};

export default Footer;
