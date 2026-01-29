import { Box, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import type { AvailabilityFormValue } from "@/types/volunteering/AvailabilityFormValue.type";

export default function Schedule({
  schedules,
  setSchedules,
}: {
  schedules: AvailabilityFormValue[];
  setSchedules: React.Dispatch<React.SetStateAction<AvailabilityFormValue[]>>;
}) {
  const validateTimeRange = (timeFrom: Dayjs | null, timeTo: Dayjs | null) => {
    if (timeFrom && timeTo) {
      if (!timeFrom || !timeTo) return true; // don't error until both exist
      return timeTo.isAfter(timeFrom);
    }
    return true; // If one of the times is null, consider it valid
  };

  return (
    <>
      {schedules.map((val, index) => (
        <LocalizationProvider dateAdapter={AdapterDayjs} key={index}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr 1fr 0.5fr 42px" },
              gap: 2,
              alignItems: "center",
              marginBottom: 1,
              position: "relative",
              top: "-9px",
              paddingX: { xs: 1.5, md: 0 },
              paddingLeft: { xs: 0, md: 1.5 },
              marginTop: { xs: 3, md: 0 },
            }}
          >
            {/* Date */}
            <DatePicker
              value={val.date}
              onChange={(date) =>
                setSchedules((p) => [...p.slice(0, index), { ...p[index], date }, ...p.slice(index + 1)])
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  error: val.date !== null && val.date < dayjs().startOf("day"),
                },
              }}
            />

            {/* Time From */}
            <TimePicker
              value={val.timeFrom}
              onChange={(timeFrom) =>
                setSchedules((p) => [...p.slice(0, index), { ...p[index], timeFrom }, ...p.slice(index + 1)])
              }
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  error: !validateTimeRange(schedules[index].timeFrom, schedules[index].timeTo),
                },
              }}
            />

            {/* Time To */}
            <TimePicker
              value={val.timeTo}
              onChange={(timeTo) =>
                setSchedules((p) => [...p.slice(0, index), { ...p[index], timeTo }, ...p.slice(index + 1)])
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  error: !validateTimeRange(schedules[index].timeFrom, schedules[index].timeTo),
                },
              }}
            />

            {/* Slots Available */}
            <TextField
              type='number'
              value={val.slotsAvailable}
              size='small'
              fullWidth
              onChange={(e) => {
                const raw = e.target.value;

                // If user deletes everything or typed 0 force back to 1
                if (raw === "" || raw === "0") {
                  return;
                }

                // block decimals
                if (raw.includes(".")) return;

                const parsed = Number(raw);
                setSchedules((p) => [
                  ...p.slice(0, index),
                  { ...p[index], slotsAvailable: parsed },
                  ...p.slice(index + 1),
                ]);
              }}
            />
            {index === schedules.length - 1 && (
              <IconButton
                sx={{
                  "&:hover": { color: "primary.light", backgroundColor: "transparent" },
                  color: "primary.main",
                  marginRight: 4,
                }}
                >
                <AddIcon
                  sx={{ fontWeight: "bold" }}
                  onClick={() => {
                    setSchedules((p) => [
                      ...p,
                      {
                        date: null,
                        timeFrom: null,
                        timeTo: null,
                        slotsAvailable: 1,
                      },
                    ]);
                  }}
                />
              </IconButton>
            )}
            {index !== schedules.length - 1 && (
              <IconButton
              sx={{
                  "&:hover": { color: "error.dark", backgroundColor: "transparent" },
                  color: "error.main",
                  marginRight: 4,
                }}
              >
                <RemoveIcon
                  onClick={() => {
                    setSchedules((p) => [...p.slice(0, index), ...p.slice(index + 1)]);
                  }}
                />
              </IconButton>
            )}
          </Box>
        </LocalizationProvider>
      ))}
    </>
  );
}
