import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "@/layout/MainLayout";
import VideoListPage from "@/pages/VideoListPage";
import Contact from "@/pages/Contact";
import NewVolunteeringOpportunity from "@/pages/volunteering/admin/NewVolunteeringOpportunity";
import { Box } from "@mui/material";
import ViewOpportunitiesAdmin from "./pages/volunteering/admin/ViewOpportunitiesAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Box>Home Page</Box>} />
          <Route path='video' element={<VideoListPage />} />
          <Route path='contact' element={<Contact />} />
          <Route path='volunteering/opportunities/admin/new' element={<NewVolunteeringOpportunity />} />
          <Route path='volunteering/opportunities/admin/view' element={<ViewOpportunitiesAdmin />} />
          <Route path='*' element={<p>Page Not Found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
