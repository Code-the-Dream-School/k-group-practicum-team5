import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "@/layout/MainLayout";
import VideoListPage from "@/pages/VideoListPage";
import { Box } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Box>Home Page</Box>} />
          <Route path="video" element={<VideoListPage />} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
