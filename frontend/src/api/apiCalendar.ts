import { apiCall } from "./axios";
import type { MonthData, OpeningDay, Event } from "../types/calendar.types";

export const apiCalendar = {
  async getMonthData(year: number, month: number): Promise<MonthData> {
    return await apiCall<MonthData>("get", "/calendar/month-data", {
      year,
      month,
    });
  },

  async getOpeningDays(
    startDate: string,
    endDate: string,
  ): Promise<OpeningDay[]> {
    return await apiCall<OpeningDay[]>("get", "/calendar/opening-days", {
      startDate,
      endDate,
    });
  },

  async getEvents(startDate: string, endDate: string): Promise<Event[]> {
    return await apiCall<Event[]>("get", "/calendar/events", {
      startDate,
      endDate,
    });
  },
};
