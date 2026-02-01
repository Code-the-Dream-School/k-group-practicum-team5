import { Typography, Box } from "@mui/material";

interface SectionHeadingProps {
  title: string;
  fontSize?: { xs: string; sm: string; md: string };
}

export function SectionHeading({ title, fontSize }: SectionHeadingProps) {
  return (
    <Box sx={{ position: "relative", display: "inline-block", margin: 2 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontSize: fontSize || { xs: "1rem", sm: "1.5rem", md: "2rem" },
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        <span role="img" aria-label="lizard">
          🦎
        </span>{" "}
        {title}{" "}
        <span role="img" aria-label="snake">
          🐍
        </span>
      </Typography>
    </Box>
  );
}
