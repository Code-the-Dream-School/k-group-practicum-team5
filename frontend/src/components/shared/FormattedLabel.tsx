import Typography from "@mui/material/Typography";

export function FormattedLabel({ text }: { text: string }) {
  return (
    <div>
      <Typography variant="body1">{text}</Typography>
    </div>
  );
}
