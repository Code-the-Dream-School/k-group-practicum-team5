import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

import lizardLogo from "../assets/logo/lizard.png";

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        backgroundColor: "#0B3D2E",
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
        }}
      >
        {/* LOGO */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            component="img"
            src={lizardLogo}
            alt="Lizard logo"
            sx={{ height: 58 }}
          />

          <Typography
            sx={{
              color: "#7CFF9B",
              fontWeight: 300,
              letterSpacing: 1,
            }}
          >
            Reptile Kingdom
          </Typography>
        </Box>

        {/* Navigation + Button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          {/* Navigation */}
          <Box sx={{ display: "flex", gap: 3 }}>
            {["Home", "Exhibit", "Visit", "About", "Contact"].map((label) => (
              <Typography
                key={label}
                component={NavLink}
                to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                sx={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontWeight: 500,
                  "&:hover": {
                    color: "#FFD700", // gold on hover
                  },
                  "&.active": {
                    color: "#FFD700", // gold when active
                  },
                }}
              >
                {label}
              </Typography>
            ))}
          </Box>

          {/* Getting Tickets*/}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2ECC71",
              color: "#0B3D2E",
              fontWeight: 600,
              textTransform: "none",
              px: 3,
              borderRadius: 999,
              "&:hover": {
                backgroundColor: "#FFFFFF",
                color: "#0B3D2E",
              },
            }}
          >
            Get Tickets
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
