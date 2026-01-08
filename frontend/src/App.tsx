import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "@/layout/MainLayout";
import VideoListPage from "@/pages/VideoListPage";
import { Box } from "@mui/material";

function App() {
  // const [message, setMessage] = useState("");
  // const [error, setError] = useState(null);
  // useEffect(() => {
  //   // Call the backend API
  //   fetch("http://localhost:5000/api/hello")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch from backend");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setMessage(data.message);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //     });
  // }, []);

  return (
    // <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
    //   <h1>Frontend ↔ Backend Test</h1>
    //   {error && <p style={{ color: "red" }}>{error}</p>}
    //   {!error && (
    //     <p>
    //       Message from API: <strong>{message}</strong>
    //     </p>
    //   )}
    //   <FormattedLabel text="MUI is working" />
    //   MUI is working <CheckCircleIcon />
    // </main>
     <BrowserRouter>
      <Routes>
        <Route path="/contact" element={<Contact />} />
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
