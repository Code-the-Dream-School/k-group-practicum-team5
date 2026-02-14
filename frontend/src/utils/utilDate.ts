
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const formatDate = (date: string | Date | Dayjs) => {
  const parsed = dayjs(date);
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : "";
};

// Format a date that's stored as UTC midnight (from database) to local date string
export const formatUTCDateToLocal = (date: string | Date | Dayjs) => {
  // Parse as UTC, then get the date part in UTC
  const utcDate = dayjs.utc(date);
  return utcDate.isValid() ? utcDate.format("YYYY-MM-DD") : "";
};
