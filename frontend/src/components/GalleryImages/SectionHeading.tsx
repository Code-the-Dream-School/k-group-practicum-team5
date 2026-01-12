import { Typography, Box } from "@mui/material";

interface SectionHeadingProps {
  title: string;
}

export function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <Box sx={{ position: "relative", display: "inline-block", px: 8 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
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
