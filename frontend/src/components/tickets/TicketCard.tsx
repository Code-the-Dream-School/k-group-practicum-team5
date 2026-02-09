import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { TicketType } from "@/types/tickets";

interface Props {
  ticket: TicketType;
  quantity: number;
  onChange: (next: number) => void;
}

function getAgeLabel(id: string) {
  if (id === "adult") return "Ages 13+";
  if (id === "child") return "Ages 4–12";
  if (id === "toddler") return "Ages 0–3";
  return "";
}

export function TicketCard({ ticket, quantity, onChange }: Props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h4">{ticket.label}</Typography>
            <Chip
              size="small"
              label={
                ticket.priceCents === 0
                  ? "Free"
                  : `$${(ticket.priceCents / 100).toFixed(2)}`
              }
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {getAgeLabel(ticket.id)}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              onClick={() => onChange(quantity - 1)}
              disabled={quantity <= 0}
            >
              -
            </Button>

            <TextField
              value={quantity}
              size="small"
              inputProps={{ style: { width: 50, textAlign: "center" } }}
              onChange={(e) => onChange(Number(e.target.value))}
            />

            <Button variant="contained" onClick={() => onChange(quantity + 1)}>
              +
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
