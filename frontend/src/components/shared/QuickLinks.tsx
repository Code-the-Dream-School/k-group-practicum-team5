import { Box, Typography } from "@mui/material";
import { navItems, adminNavItems } from "./navConfig";
import { useAuth } from "@/hooks/useAuth";
import { NavLink } from "react-router-dom";

function QuickLinks() {
  const { isAdmin } = useAuth();
  const items = isAdmin ? adminNavItems : navItems;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {items.map(({ label, path }) => (
        <Typography
          key={label}
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
          {label}
        </Typography>
      ))}
    </Box>
  );
}

export default QuickLinks;
