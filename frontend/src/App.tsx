import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { zooTheme } from "@/theme";
import MainLayout from "@/layout/MainLayout";
import VideoListPage from "@/pages/VideoListPage";
import GalleryPage from "./pages/GalleryPage";
import { Box } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={zooTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Box>Home Page</Box>} />
            <Route path="video" element={<VideoListPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="*" element={<p>Page Not Found</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
