import { apiCall } from "./axios";
import type { Event, OpeningDay } from "@/types/calendar.types";

export const adminCalendarApi = {
  createEvent(data: Partial<Event>) {
    return apiCall<Event>("post", "/admin/events", data);
  },

  updateEvent(id: string, data: Partial<Event>) {
    return apiCall<Event>("put", `/admin/events/${id}`, data);
  },

  deleteEvent(id: string) {
    return apiCall<void>("delete", `/admin/events/${id}`);
  },

  createOpeningDay(data: Partial<OpeningDay>) {
    return apiCall<OpeningDay>("post", "/admin/opening-days", data);
  },

  updateOpeningDay(id: string, data: Partial<OpeningDay>) {
    return apiCall<OpeningDay>("put", `/admin/opening-days/${id}`, data);
  },

  deleteOpeningDay(id: string) {
    return apiCall<void>("delete", `/admin/opening-days/${id}`);
  },
};
