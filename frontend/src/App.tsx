import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { zooTheme } from "@/theme";
import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home";
import VideoListPage from "@/pages/VideoListPage";
import GalleryPage from "./pages/GalleryPage";
import Contact from "@/pages/Contact";
import NewVolunteeringOpportunity from "@/pages/volunteering/admin/NewVolunteeringOpportunity";
import ViewOpportunities from "@/pages/volunteering/admin/viewOpportunities";
import { Box } from "@mui/material";
import MapPage from "./pages/Map";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Box>Home Page</Box>} />
          <Route path='video' element={<VideoListPage />} />
          <Route path='contact' element={<Contact />} />
          <Route path= "/map" element={<MapPage/>} />
          <Route path='volunteering/opportunities/admin/new' element={<NewVolunteeringOpportunity />} />
          <Route path='volunteering/opportunities/admin/view' element={<ViewOpportunities />} />
          <Route path='*' element={<p>Page Not Found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
import ViewOpportunitiesAdmin from "@/pages/volunteering/admin/ViewOpportunitiesAdmin";
// import { Box } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={zooTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="video" element={<VideoListPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="volunteering/opportunities/admin/new"
              element={<NewVolunteeringOpportunity />}
            />
            <Route
              path="volunteering/opportunities/admin/view"
              element={<ViewOpportunitiesAdmin />}
            />

            <Route path="*" element={<p>Page Not Found</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
