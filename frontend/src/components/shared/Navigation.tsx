import React from "react";
import { Box, Typography } from "@mui/material";
import { navItems, LoggedNavItems, adminNavItems } from "./navConfig";
import { useAuth } from "@/hooks/useAuth";
import { NavLink } from "react-router-dom";

const Navigation: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const items =
    user && isAdmin ? adminNavItems : user ? LoggedNavItems : navItems;

  return (
    <Box sx={{ display: "flex", gap: 3 }}>
      {items.map(({ label, path }) => (
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
          {label}
        </Typography>
      ))}
    </Box>
  );
};

export default Navigation;
