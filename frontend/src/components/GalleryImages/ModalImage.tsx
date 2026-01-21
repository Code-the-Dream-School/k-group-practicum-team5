import { Dialog, IconButton } from "@mui/material";
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
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "transparent",
          boxShadow: "none",
          overflow: "hidden",
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
          color: "primary.contrastText",
        }}
      >
        <CloseIcon />
      </IconButton>

      {activeImage && (
        <img
          src={activeImage.url}
          alt={activeImage.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
    </Dialog>
  );
}
