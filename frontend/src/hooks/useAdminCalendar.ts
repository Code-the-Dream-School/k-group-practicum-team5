import { useCallback } from "react";
import useRequest from "./useRequest";
import { adminCalendarApi } from "@/api/apiAdminCalendar";
import type { Event } from "@/types/calendar.types";

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

  return {
    createEvent,
    updateEvent,
    deleteEvent,
    isLoading,
    isError,
    error,
  };
};

export default useAdminCalendar;