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
        p: 2,
      }}
    >
      <Box sx={{ textAlign: "center", mb: 1 }}>
        <SectionHeading title="Gallery" />
      </Box>
      <Box sx={{ flex: 1, width: "100%", overflow: "auto", px: 2 }}>
        <ImagesList />
      </Box>
    </Box>
  );
}

export default GalleryPage;
