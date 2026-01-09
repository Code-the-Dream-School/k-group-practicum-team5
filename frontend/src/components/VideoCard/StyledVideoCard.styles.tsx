import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import type { CardProps } from "@mui/material/Card";

const StyledVideoCard = styled(Card)<CardProps>(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.10)",
  },

  [theme.breakpoints.down("md")]: {
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
}));

export default StyledVideoCard;
