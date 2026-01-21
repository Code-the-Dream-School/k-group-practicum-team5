import { createTheme } from "@mui/material/styles";

export const zooTheme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#2F6F3E", // zooGreen
      dark: "#1F3D2B", // zooDark
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#E67E22", // zooOrange
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#EAF4ED", // zooLight
      paper: "#FFFFFF",
    },

    text: {
      primary: "#1F3D2B", // zooDark
      secondary: "#000000",
    },
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: `"Inter", "Roboto", "Arial", sans-serif`,

    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 20px",
        },
        containedPrimary: {
          boxShadow: "0 6px 16px rgba(47, 111, 62, 0.25)",
        },
        containedSecondary: {
          boxShadow: "0 6px 16px rgba(230, 126, 34, 0.3)",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1F3D2B",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});
