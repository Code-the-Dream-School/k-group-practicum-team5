import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Navigation from "./shared/Navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import lizardLogo from "src/assets/logo/rep-zoo-best.png";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

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
      <Box
        sx={{
          position: "absolute",
          right: 24,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <LanguageSwitcher />
      </Box>
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
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
