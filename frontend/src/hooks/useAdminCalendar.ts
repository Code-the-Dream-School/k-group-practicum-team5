import { useCallback } from "react";
import useRequest from "./useRequest";
import { adminCalendarApi } from "@/api/apiAdminCalendar";
import type { Event, OpeningDay } from "@/types/calendar.types";

export const useAdminCalendar = () => {
  const { run, isLoading, isError, error } = useRequest();

  const createEvent = useCallback(
    (data: Partial<Event>) =>
      run(() => adminCalendarApi.createEvent(data)),
    [run]
  );

  const updateEvent = useCallback(
    (id: string, data: Partial<Event>) =>
      run(() => adminCalendarApi.updateEvent(id, data)),
    [run]
  );

  const deleteEvent = useCallback(
    (id: string) =>
      run(() => adminCalendarApi.deleteEvent(id)),
    [run]
  );

  const createOpeningDay = useCallback(
    (data: Partial<OpeningDay>) =>
      run(() => adminCalendarApi.createOpeningDay(data)),
    [run]
  );

  const updateOpeningDay = useCallback(
    (id: string, data: Partial<OpeningDay>) =>
      run(() => adminCalendarApi.updateOpeningDay(id, data)),
    [run]
  );

  const deleteOpeningDay = useCallback(
    (id: string) =>
      run(() => adminCalendarApi.deleteOpeningDay(id)),
    [run]
  );

  return {
    createEvent,
    updateEvent,
    deleteEvent,
    createOpeningDay,
    updateOpeningDay,
    deleteOpeningDay,
    isLoading,
    isError,
    error,
  };
};

export default useAdminCalendar;