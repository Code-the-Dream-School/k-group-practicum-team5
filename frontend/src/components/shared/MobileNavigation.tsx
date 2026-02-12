import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { navItems, LoggedNavItems, adminNavItems } from "./navConfig";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import lizardLogo from "src/assets/logo/rep-zoo-best.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface MobileNavigationProps {
  toggleMobileMenu: (open: boolean) => () => void;
}

function MobileNavigation({ toggleMobileMenu }: MobileNavigationProps) {
  const { user, isAdmin } = useAuth();
  const { t } = useTranslation();
  const items =
    user && isAdmin ? adminNavItems : user ? LoggedNavItems : navItems;

  return (
    <Box
      role="presentation"
      sx={(theme) => ({
        width: 280,
        p: 2,
        backgroundColor: theme.palette.primary.dark,
        height: "100%",
      })}
      onClick={toggleMobileMenu(false)}
      onKeyDown={toggleMobileMenu(false)}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <Box
          component="img"
          src={lizardLogo}
          alt={t("header.siteTitle")}
          sx={{ height: 44 }}
        />
        <Typography
          variant="h6"
          sx={{ color: "primary.contrastText", fontWeight: 500 }}
        >
          {t("header.siteTitle")}
        </Typography>
      </Box>
      <Divider
        sx={(theme) => ({ borderColor: theme.palette.primary.contrastText })}
      />
      <List sx={{ mt: 1 }}>
        {items.map(({ labelKey, path }) => (
          <ListItemButton
            key={labelKey}
            component={NavLink}
            to={path}
            sx={{
              color: "primary.contrastText",
              borderRadius: 1,
              "&.active": { backgroundColor: "primary.main" },
            }}
          >
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 600 }} color="inherit">
                  {t(labelKey)}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>
      <Divider
        sx={(theme) => ({
          borderColor: theme.palette.primary.contrastText,
          my: 2,
        })}
      />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <LanguageSwitcher />
      </Box>
    </Box>
  );
}

export default MobileNavigation;
