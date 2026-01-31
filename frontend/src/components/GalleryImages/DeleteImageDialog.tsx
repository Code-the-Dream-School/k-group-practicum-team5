import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";

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
      <DialogTitle>Delete Image</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this image?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteImageDialog;
