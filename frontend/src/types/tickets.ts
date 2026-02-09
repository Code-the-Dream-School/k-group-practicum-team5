export type TicketTypeId = "adult" | "child" | "toddler";

export interface TicketType {
  id: TicketTypeId;
  label: string;
  priceCents: number;
}

export interface QuoteItemInput {
  ticketTypeId: TicketTypeId;
  quantity: number;
}

export interface QuoteResponse {
  subtotalCents: number;
  serviceFeeCents: number;
  totalCents: number;
  currency: string;
}
