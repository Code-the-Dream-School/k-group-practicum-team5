import { apiCall } from "./axios";
import type { Event } from "@/types/calendar.types";

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
};
