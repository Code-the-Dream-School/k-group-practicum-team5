import dayjs, { Dayjs } from "dayjs";

export const formatDate = (d: Dayjs | string) => dayjs(d).format("YYYY-MM-DD");
