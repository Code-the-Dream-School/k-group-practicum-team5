import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import type { QuoteResponse } from "@/types/tickets";

function money(cents?: number) {
  return cents == null ? "—" : `$${(cents / 100).toFixed(2)}`;
}

interface Props {
  quote: QuoteResponse | null;
  disabled: boolean;
}

export function OrderSummary({ quote, disabled }: Props) {
  return (
    <Box>
      <Typography variant="h3">Order Summary</Typography>
      <Divider sx={{ my: 2 }} />

      <Stack spacing={1}>
        <Row label="Subtotal" value={money(quote?.subtotalCents)} />
        <Row label="Service Fee" value={money(quote?.serviceFeeCents)} />
        <Divider />
        <Row
          label={<strong>Total</strong>}
          value={<strong>{money(quote?.totalCents)}</strong>}
        />

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          disabled={disabled}
        >
          Continue to payment
        </Button>
      </Stack>
    </Box>
  );
}

function Row({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography color="text.secondary">{label}</Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
}
