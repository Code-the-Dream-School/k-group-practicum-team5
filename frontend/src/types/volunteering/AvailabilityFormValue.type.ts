import { Dayjs } from "dayjs";

export type AvailabilityFormValue = {
    date: Dayjs | null,
    timeFrom: Dayjs | null,
    timeTo: Dayjs | null,
    slotsAvailable: number,
};
