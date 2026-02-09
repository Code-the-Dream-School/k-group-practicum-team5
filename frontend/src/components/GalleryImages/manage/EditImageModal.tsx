import { useState, useEffect, useCallback } from "react";
import { Dialog, TextField, Button, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Image } from "@/types";
import { SuccessAlert, ErrorAlert } from "@/components/alert";
import { useGallery } from "@/hooks";
import { useTranslation } from "react-i18next";

type EditImageModalProps = {
  open: boolean;
  image: Image | null;
  onClose: () => void;
  onSave?: () => void;
};

const MESSAGE_DURATION = 2000;
const ERROR_DURATION = 3000;

export default function EditImageModal({
  open,
  image,
  onClose,
  onSave,
}: EditImageModalProps) {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const { editImage } = useGallery();

  useEffect(() => {
    if (open && image) {
      setTitle(image.title || "");
      setDescription(image.description || "");
    }
    // Only reset state when modal opens with a new image
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, image?.publicId]);

  const resetForm = useCallback(() => {
    setTitle("");
    setDescription("");
    setMessage(null);
  }, []);

  const showMessage = useCallback((text: string, isError = false) => {
    setMessage({ text, isError });
    const duration = isError ? ERROR_DURATION : MESSAGE_DURATION;
    setTimeout(() => setMessage(null), duration);
  }, []);

  const handleSave = async () => {
    if (!image) return;

    try {
      await editImage({
        publicId: image.publicId,
        title: title.trim(),
        description: description.trim(),
      });
      showMessage(t("editImage.success"));
      setTimeout(() => {
        resetForm();
        onClose();
        if (onSave) onSave();
      }, MESSAGE_DURATION);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : t("editImage.saveFailed");
      showMessage(errorMessage, true);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!image) return null;

  const hasChanges =
    title !== image.title || description !== (image.description || "");

  return (
    <>
      {message && (
        <Box
          sx={{
            position: "fixed",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2000,
          }}
        >
          {message.isError ? (
            <ErrorAlert message={message.text} />
          ) : (
            <SuccessAlert message={message.text} />
          )}
        </Box>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
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
                `rgba(${theme.palette.mode === "dark" ? "0,0,0" : theme.palette.primary.dark}, 0.8)`,
              backdropFilter: "blur(1px)",
            },
          },
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 1,
            color: "primary.main",
          }}
          aria-label={t("editImage.closeAria")}
        >
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            minHeight: { xs: "auto", md: 500 },
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
              backgroundColor: "action.hover",
            }}
          >
            <Box
              component="img"
              src={image.url}
              alt={image.title}
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: { xs: 300, md: "80vh" },
                objectFit: "contain",
                borderRadius: 3,
              }}
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              p: 3,
              pt: { xs: 2, md: 8 },
            }}
          >
            <TextField
              fullWidth
              label={t("editImage.fields.title")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("editImage.placeholders.title")}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label={t("editImage.fields.description")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("editImage.placeholders.description")}
              multiline
              rows={6}
              sx={{ mb: 3, flex: 1 }}
            />

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                mt: "auto",
              }}
            >
              <Button onClick={handleClose} variant="outlined">
                {t("editImage.cancel")}
              </Button>
              <Button
                onClick={handleSave}
                variant="contained"
                disabled={!hasChanges || !title.trim()}
              >
                {t("editImage.save")}
              </Button>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
