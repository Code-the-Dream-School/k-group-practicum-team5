import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calendar from "./components/Calendar";
import { Divider } from "@mui/material";
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

      <Divider sx={{ my: 4 }} />
      
      <Calendar />


    </BrowserRouter>
  );
}

export default App;
