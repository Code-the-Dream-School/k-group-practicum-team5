import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

type GenericModalProps = {
  width?: number | string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function GenericModal({ width = 500, open, onClose, children }: GenericModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width,
          bgcolor: "var(--zooLight)",
          border: "1px solid var(--zooGreen)",
          borderRadius: "1rem",
          boxShadow: 24,
          py: 4,
          px: 8,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}
