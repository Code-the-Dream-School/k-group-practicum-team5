import { Dialog, IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Image } from "@/types";

interface ModalImageProps {
  open: boolean;
  activeImage: Image | null;
  onClose: () => void;
}

export function ModalImage({ open, activeImage, onClose }: ModalImageProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "background.paper",
          borderRadius: 2,
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: (theme) =>
              `rgba(${theme.palette.primary.dark}, 0.8)`,
            backdropFilter: "blur(1px)",
          },
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 1,
          color: "primary.main",
        }}
      >
        <CloseIcon />
      </IconButton>

      {activeImage && (
        <Box
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              m: 1,
            }}
          >
            <img
              src={activeImage.url}
              alt={activeImage.title}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "80vh",
                objectFit: "cover",
                borderRadius: "24px",
              }}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              p: 3,
              pt: 8,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "primary.main", mb: 2 }}
            >
              {activeImage.title}
            </Typography>
            {activeImage.description && (
              <Typography
                variant="body2"
                align="justify"
                sx={{ color: "text.secondary" }}
              >
                {activeImage.description}
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Dialog>
  );
}
