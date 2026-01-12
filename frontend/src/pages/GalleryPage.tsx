import { Box } from "@mui/material";
import { ImagesList, SectionHeading } from "@/components/GalleryImages";

function GalleryPage() {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: 4,
      }}
    >
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <SectionHeading title="Gallery" />
      </Box>
      <Box sx={{ flex: 1, width: "100%", overflow: "auto" }}>
        <ImagesList />
      </Box>
    </Box>
  );
}

export default GalleryPage;
