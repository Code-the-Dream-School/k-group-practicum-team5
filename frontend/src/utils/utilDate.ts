
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);



export const formatDate = (date: string | Date | Dayjs) => {
  const parsed = dayjs.utc(date);
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : "";
};
