import Typography from "@mui/material/Typography";

function FormattedLabel({ text }: { text: string }) {
  return (
    <div>
      <Typography variant="body1">{text}</Typography>
    </div>
  );
}

export default FormattedLabel;
