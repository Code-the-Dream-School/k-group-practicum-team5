import Box from "@mui/material/Box";

function Home() {
  return (
    <Box
      sx={{
        backgroundColor: "#0B3D2E", // dark green
        minHeight: "100vh", // full viewport height
        color: "#FFFFFF", // text color white
        p: 4, // padding
      }}
    >
      <div>
        <h1>This is the home page!</h1>
        <p>Hero section</p>
        <p>Buy ticket button</p>
        <p>Real-time open/closed status</p>
        <p>Featured Attractions</p>
        <p>Highlights from Trip Advisor Reviews</p>
      </div>
    </Box>
  );
}

export default Home;
