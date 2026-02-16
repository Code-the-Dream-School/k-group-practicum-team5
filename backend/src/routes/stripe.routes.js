const express = require("express");
const Stripe = require("stripe");

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const TICKET_TYPES = [
  { id: "adult", label: "Adult (13+)", priceCents: 1500 },
  { id: "child", label: "Child (4–12)", priceCents: 1000 },
  { id: "toddler", label: "Toddler (0–3)", priceCents: 0 },
];

router.post("/create-session", async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json({ error: "items must be an array" });
  }

  const line_items = [];

  for (const it of items) {
    const ticketTypeId = it?.ticketTypeId;
    const quantity = Number(it?.quantity);

    const type = TICKET_TYPES.find((t) => t.id === ticketTypeId);
    if (!type)
      return res
        .status(400)
        .json({ error: `Unknown ticketTypeId: ${ticketTypeId}` });

    if (!Number.isInteger(quantity) || quantity < 0 || quantity > 20) {
      return res
        .status(400)
        .json({ error: `Invalid quantity for ${ticketTypeId}` });
    }

    if (quantity === 0) continue;
    if (type.priceCents === 0) continue;

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: type.label },
        unit_amount: type.priceCents,
      },
      quantity,
    });
  }

  if (line_items.length === 0) {
    return res.status(400).json({ error: "No paid tickets selected." });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    success_url: `${process.env.FRONTEND_URL}/tickets-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/book-tickets`,
  });

  res.json({ url: session.url });
});

module.exports = router;
