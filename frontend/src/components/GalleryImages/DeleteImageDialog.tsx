import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

interface DeleteImageDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteImageDialog = ({
  open,
  onCancel,
  onConfirm,
}: DeleteImageDialogProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      slots={{
        paper: (props) => (
          <div
            {...props}
            style={{
              ...(props.style || {}),
              backdropFilter: "blur(4px)",
              backgroundColor: theme.palette.background.default,
              borderRadius: 16,
              border: `2px solid ${theme.palette.primary.main}`,
            }}
          />
        ),
        backdrop: (props) => (
          <div
            {...props}
            style={{
              ...(props.style || {}),
              backgroundColor: theme.palette.background.default,
              backdropFilter: "blur(4px)",
            }}
          />
        ),
      }}
    >
      <DialogTitle>{t("deleteImage.title")}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t("deleteImage.message")}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          {t("deleteImage.cancel")}
        </Button>
        <Button onClick={onConfirm} color="error" autoFocus>
          {t("deleteImage.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteImageDialog;
