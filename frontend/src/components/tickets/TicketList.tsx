import { Stack } from "@mui/material";
import type { TicketType, TicketTypeId } from "@/types/tickets";
import { TicketCard } from "./TicketCard";

interface Props {
  tickets: TicketType[];
  quantities: Record<TicketTypeId, number>;
  onChange: (id: TicketTypeId, next: number) => void;
}

export function TicketList({ tickets, quantities, onChange }: Props) {
  return (
    <Stack spacing={2}>
      {tickets.map((t) => (
        <TicketCard
          key={t.id}
          ticket={t}
          quantity={quantities[t.id]}
          onChange={(next) => onChange(t.id, next)}
        />
      ))}
    </Stack>
  );
}
