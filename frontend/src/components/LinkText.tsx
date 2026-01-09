import type { ReactNode } from "react";
import { Typography } from "@mui/material";

interface LinkTextProps {
  link: string;
  text: string;
  icon?: ReactNode;
}

function LinkText({ link, text, icon }: LinkTextProps) {
  return (
    <Typography
      component="a"
      href={link}
      target="_blank"
      variant="h6"
      fontWeight={700}
      sx={{
        display: "flex",
        alignItems: "center",
        horizontalAlign: "center",
        gap: 1,
        color: "primary.main",
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      }}
    >
      {icon}
      {text}
    </Typography>
  );
}

export default LinkText;
