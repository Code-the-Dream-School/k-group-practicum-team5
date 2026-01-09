import axios from "axios";
import type { MonthData, OpeningDay, Event } from "../types/calendar.types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/calendar";

export const calendarService = {
  async getMonthData(year: number, month: number): Promise<MonthData> {
    try {
      const response = await axios.get<MonthData>(
        `${API_BASE_URL}/month-data`,
        {
          params: { year, month },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching month data:", error);
      throw new Error("Failed to fetch calendar data");
    }
  },

  async getOpeningDays(
    startDate: string,
    endDate: string
  ): Promise<OpeningDay[]> {
    try {
      const response = await axios.get<OpeningDay[]>(
        `${API_BASE_URL}/opening-days`,
        {
          params: { startDate, endDate },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching opening days:", error);
      throw new Error("Failed to fetch opening days");
    }
  },

  async getEvents(startDate: string, endDate: string): Promise<Event[]> {
    try {
      const response = await axios.get<Event[]>(`${API_BASE_URL}/events`, {
        params: { startDate, endDate },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw new Error("Failed to fetch events");
    }
  },
};
