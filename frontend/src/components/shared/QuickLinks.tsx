import { Box, Typography } from "@mui/material";
import { navItems, adminNavItems, LoggedNavItems } from "./navConfig";
import { useAuth } from "@/hooks/useAuth";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function QuickLinks() {
  const { user, isAdmin } = useAuth();
  const { t } = useTranslation();
  const items =
    user && isAdmin ? adminNavItems : user ? LoggedNavItems : navItems;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {items.map(({ labelKey, path }) => (
        <Typography
          key={labelKey}
          component={NavLink}
          to={path}
          variant="body2"
          sx={{
            color: "primary.contrastText",
            opacity: 0.8,
            textDecoration: "none",
            transition: "opacity 0.2s ease",
            "&:hover": { opacity: 1 },
            "&.active": { fontWeight: 700, opacity: 1 },
          }}
        >
          {t(labelKey)}
        </Typography>
      ))}
    </Box>
  );
}

export default QuickLinks;
