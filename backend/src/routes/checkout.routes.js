const express = require("express");

const router = express.Router();

const TICKET_TYPES = [
  { id: "adult", label: "Adult", priceCents: 1500 },
  { id: "child", label: "Child", priceCents: 1000 },
  { id: "toddler", label: "Toddler", priceCents: 0 },
];

router.get("/ticket-types", (req, res) => {
  res.json({ ticketTypes: TICKET_TYPES });
});

router.post("/quote", (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json({ error: "items must be an array" });
  }

  let subtotalCents = 0;

  const normalizedItems = items.map((it) => {
    const ticketTypeId = it?.ticketTypeId;
    const quantity = Number(it?.quantity);

    const type = TICKET_TYPES.find((t) => t.id === ticketTypeId);
    if (!type) {
      return res
        .status(400)
        .json({ error: `Unknown ticketTypeId: ${ticketTypeId}` });
    }

    if (!Number.isInteger(quantity) || quantity < 0 || quantity > 20) {
      return res
        .status(400)
        .json({ error: `Invalid quantity for ${ticketTypeId}` });
    }

    const lineTotalCents = type.priceCents * quantity;
    subtotalCents += lineTotalCents;

    return {
      ticketTypeId: type.id,
      label: type.label,
      unitPriceCents: type.priceCents,
      quantity,
      lineTotalCents,
    };
  });

  if (res.headersSent) return;

  const serviceFeeCents = Math.round(subtotalCents * 0.05);
  const totalCents = subtotalCents + serviceFeeCents;

  res.json({
    items: normalizedItems,
    subtotalCents,
    serviceFeeCents,
    totalCents,
    currency: "usd",
  });
});

module.exports = router;
