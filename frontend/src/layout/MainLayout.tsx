import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Box component="header">
        <Header />
      </Box>
      <Box
        component="main"
        sx={{
          flex: "1 1 auto",
          overflow: "hidden",
        }}
      >
        <Outlet />
      </Box>
      <Box component="footer">
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
