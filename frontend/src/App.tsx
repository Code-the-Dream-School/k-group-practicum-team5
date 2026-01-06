import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import FormattedLabel from "./components/FormattedLabel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
