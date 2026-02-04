import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { zooTheme } from "@/theme";
import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home";
import VideoListPage from "@/pages/VideoListPage";
import GalleryPage from "./pages/GalleryPage";
import ManageGalleryPage from "./pages/ManageGalleryPage";
import Contact from "@/pages/Contact";
import NewVolunteeringOpportunity from "@/pages/volunteering/admin/NewVolunteeringOpportunity";
import ViewOpportunitiesAdmin from "@/pages/volunteering/admin/ViewOpportunitiesAdmin";
import MapPage from "./pages/Map";
import Calendar from "./components/Calendar";
import ProtectedRoute from "@/routes/ProtectedRoute";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import ResetPassword from "./components/Authentication/ResetPassword";

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
            <Route path="map" element={<MapPage />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route
              path="volunteering/opportunities/admin/new"
              element={<NewVolunteeringOpportunity />}
            />
            <Route
              path="volunteering/opportunities/admin/view"
              element={<ViewOpportunitiesAdmin />}
            />
            <Route element={<ProtectedRoute />}>
              <Route path="gallery/manage" element={<ManageGalleryPage />} />
            </Route>
            <Route path="*" element={<p>Page Not Found</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;