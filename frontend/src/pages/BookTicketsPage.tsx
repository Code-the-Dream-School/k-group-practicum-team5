import { useEffect, useMemo, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { getCheckoutQuote, getTicketTypes } from "@/api/apiCheckout";
import { TicketList } from "@/components/tickets/TicketList";
import { OrderSummary } from "@/components/tickets/OrderSummary";
import type { QuoteResponse, TicketType, TicketTypeId } from "@/types/tickets";
import axios from "axios";

const EMPTY_QTY: Record<TicketTypeId, number> = {
  adult: 0,
  child: 0,
  toddler: 0,
};

export default function BookTicketsPage() {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [qty, setQty] = useState(EMPTY_QTY);
  const [quote, setQuote] = useState<QuoteResponse | null>(null);

  useEffect(() => {
    getTicketTypes().then((res) => setTickets(res.ticketTypes));
  }, []);

  const items = useMemo(
    () =>
      (Object.keys(qty) as TicketTypeId[]).map((id) => ({
        ticketTypeId: id,
        quantity: qty[id],
      })),
    [qty]
  );

  useEffect(() => {
    getCheckoutQuote(items).then(setQuote);
  }, [items]);

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/stripe/create-session`,
        { items }
      );

      window.location.href = data.url;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.error || "Checkout failed");
      } else {
        alert("Unexpected error occurred");
      }
      console.error("Stripe checkout error:", err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Admission
      </Typography>

      <Box
        sx={{ display: "grid", gridTemplateColumns: { md: "2fr 1fr" }, gap: 2 }}
      >
        <Card>
          <CardContent>
            <TicketList
              tickets={tickets}
              quantities={qty}
              onChange={(id, next) =>
                setQty((prev) => ({ ...prev, [id]: Math.max(0, next) }))
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <OrderSummary
              quote={quote}
              disabled={!quote}
              onCheckout={handleCheckout}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
