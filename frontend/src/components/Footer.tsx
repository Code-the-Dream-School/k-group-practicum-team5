import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import QuickLinks from "./shared/QuickLinks";
import lizard from "src/assets/logo/rep-zoo-best.png";

const CONTACT = {
  email: "info@thereptilezoo.com",
  phone: "+1 (714) 500-0591",
  hours: "Mon–Fri: 9am – 5pm",
};

const sectionTitleSx = {
  fontWeight: 500,
  mb: 1,
  color: "primary.contrastText",
};

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.dark",
        color: "primary.contrastText",
        px: 8,
        py: 6,
      }}
    >
      {/* Top content */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        {/* Logo + About */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 320,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              component="img"
              src={lizard}
              alt="Lizard Logo"
              sx={{ height: 56 }}
            />
            <Typography variant="h6" sx={{ color: "primary.contrastText" }}>
              Reptile Zoo
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ opacity: 0.85, lineHeight: 1.6 }}>
            Experience the fascinating world of reptiles. Education,
            conservation, and wonder await at every turn.
          </Typography>
        </Box>

        {/* Quick Links */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="subtitle1" sx={sectionTitleSx}>
            Quick Links
          </Typography>
          <QuickLinks />
        </Box>

        {/* Contact */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="subtitle1" sx={sectionTitleSx}>
            Contact
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {CONTACT.email}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {CONTACT.phone}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {CONTACT.hours}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Bottom bar */}
      <Box
        sx={{
          mt: 6,
          pt: 3,
          borderTop: "1px solid",
          borderColor: "rgba(255,255,255,0.15)",
        }}
      >
        <Typography variant="body2" textAlign="center" sx={{ opacity: 0.7 }}>
          © 2025 The Reptile Zoo. All Rights Reserved. Discover the wild within.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
