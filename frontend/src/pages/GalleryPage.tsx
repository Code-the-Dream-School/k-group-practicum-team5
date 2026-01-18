import { useState } from "react";
import { Box, IconButton, Backdrop, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {
  ImagesList,
  SectionHeading,
  SearchFilter,
} from "@/components/GalleryImages";

function GalleryPage() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

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
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <SectionHeading title="Gallery" />
      </Box>

      <Box sx={{ position: "fixed", top: 20, right: 20, zIndex: 1300 }}>
        <IconButton
          onClick={() => setShowSearch(!showSearch)}
          sx={{
            color: theme.palette.primary.main,
            borderRadius: "0.5rem",
            border: `2px solid ${theme.palette.primary.main}`,
            p: 1.5,
            backgroundColor: "background.paper",
            boxShadow: 2,
            "&:hover": {
              backgroundColor: theme.palette.background.default,
            },
          }}
        >
          {showSearch ? (
            <CloseIcon fontSize="large" />
          ) : (
            <SearchIcon fontSize="large" />
          )}
        </IconButton>
      </Box>

      {showSearch && (
        <>
          <Backdrop
            open={showSearch}
            onClick={() => setShowSearch(false)}
            sx={{ zIndex: 1200 }}
          />
          <Box
            sx={{
              position: "fixed",
              top: 100,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1300,
              backgroundColor: "background.paper",
              p: 3,
              borderRadius: 2,
              boxShadow: 4,
              minWidth: 350,
              maxWidth: 600,
            }}
          >
            <SearchFilter
              initialQuery={searchQuery}
              isLoading={false}
              onSearch={handleSearch}
              onClear={handleClear}
            />
          </Box>
        </>
      )}

      <Box sx={{ flex: 1, width: "100%", overflow: "auto" }}>
        <ImagesList searchQuery={searchQuery} />
      </Box>
    </Box>
  );
}

export default GalleryPage;
