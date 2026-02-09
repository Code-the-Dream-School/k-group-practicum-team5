import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Navigation from "./shared/Navigation";
import MobileNavigation from "./shared/MobileNavigation";
import LanguageSwitcher from "./LanguageSwitcher";
import lizardLogo from "src/assets/logo/rep-zoo-best.png";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = (open: boolean) => () => {
    setMobileOpen(open);
  };

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: "primary.dark",
        color: "primary.contrastText",
        height: 72,
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* INNER CONTAINER */}
      <Box
        sx={{
          maxWidth: 1500,
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
            sx={{
              height: 56,
              display: { xs: "block", md: "none", lg: "block" },
            }}
          />

          <Typography
            variant="h6"
            sx={{
              color: "primary.contrastText",
              fontWeight: 500,
              letterSpacing: 0.5,
              display: { xs: "block", md: "none", lg: "block" },
            }}
          >
            {t("header.siteTitle")}
          </Typography>
        </Box>

        {/* Navigation + Button (desktop) */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "right",
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Navigation */}
          <Navigation />
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

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" onClick={toggleMobileMenu(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleMobileMenu(false)}
      >
        <MobileNavigation toggleMobileMenu={toggleMobileMenu} />
      </Drawer>
    </Box>
  );
};

export default Header;
