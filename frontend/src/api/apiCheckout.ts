import { apiCall } from "./axios";
import type {
  QuoteItemInput,
  QuoteResponse,
  TicketType,
} from "@/types/tickets";

export const getTicketTypes = () =>
  apiCall<{ ticketTypes: TicketType[] }>("get", "/checkout/ticket-types");

export const getCheckoutQuote = (items: QuoteItemInput[]) =>
  apiCall<QuoteResponse>("post", "/checkout/quote", { items });
