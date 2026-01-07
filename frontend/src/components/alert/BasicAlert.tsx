import { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";

interface BasicAlertProps {
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

const BasicAlert = ({ message, severity }: BasicAlertProps) => {
  const [open, setOpen] = useState(true);

  return (
    <Collapse in={open}>
      <Stack sx={{ width: "100%", mt: 2, mb: 2 }}>
        <Alert severity={severity} onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Stack>
    </Collapse>
  );
};

export default BasicAlert;
