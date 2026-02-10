import { useCallback } from "react";
import { apiCalendar } from "@/api/apiCalendar";
import useRequest from "./useRequest";
import type { MonthData, OpeningDay, Event } from "@/types/calendar.types";

export const useCalendar = () => {
  const { run, isLoading, isError, error } = useRequest();

  const getMonthData = useCallback(
    (year: number, month: number) => {
  
      return run<MonthData>(() => apiCalendar.getMonthData(year, month));
      
    },
    [run],
  );

  const getOpeningDays = useCallback(
    (startDate: string, endDate: string) => {
      return run<OpeningDay[]>(() =>
        apiCalendar.getOpeningDays(startDate, endDate),
      );
    },
    [run],
  );

  const getEvents = useCallback(
    (startDate: string, endDate: string) => {
      return run<Event[]>(() => apiCalendar.getEvents(startDate, endDate));
    },
    [run],
  );

  return {
    isLoading,
    isError,
    error,
    getMonthData,
    getOpeningDays,
    getEvents,
  };
};
