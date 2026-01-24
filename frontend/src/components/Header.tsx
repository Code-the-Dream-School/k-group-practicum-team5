import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import lizardLogo from "src/assets/logo/rep-zoo-best.png";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();

  const navItems = [
    { label: "home", path: "/" },
    { label: "education", path: "/video" },
    { label: "gallery", path: "/gallery" },
    { label: "volunteer", path: "/volunteer" },
    { label: "calendar", path: "/calendar" },
  ];

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: "primary.dark",
        color: "primary.contrastText",
        height: 72,
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* INNER CONTAINER */}
      <Box
        sx={{
          maxWidth: 1200,
          width: "100%",
          mx: "auto",
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        {/* LOGO */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            component="img"
            src={lizardLogo}
            alt="Reptile Zoo logo"
            sx={{ height: 56 }}
          />

          <Typography
            variant="h6"
            sx={{
              color: "primary.contrastText",
              fontWeight: 500,
              letterSpacing: 0.5,
            }}
          >
            {t("header.siteTitle")}
          </Typography>
        </Box>

        {/* Navigation + Button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          {/* Navigation */}
          <Box sx={{ display: "flex", gap: 3 }}>
            {navItems.map(({ label, path }) => (
              <Typography
                key={label}
                component={NavLink}
                to={path}
                variant="body2"
                sx={{
                  color: "primary.contrastText",
                  textDecoration: "none",
                  fontWeight: 500,
                  opacity: 0.85,
                  transition: "opacity 0.2s ease",
                  "&:hover": { opacity: 1 },
                  "&.active": { opacity: 1, fontWeight: 700 },
                }}
              >
                {t(`header.${label}`)}
              </Typography>
            ))}
          </Box>

          {/* Get Tickets */}
          <Button
            variant="contained"
            color="secondary"
            sx={{
              borderRadius: 999,
              color: "secondary.contrastText",
            }}
          >
            {t("header.getTickets")}
          </Button>
          <LanguageSwitcher />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
