import { useState, useEffect, useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import type { PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { Box, CircularProgress, Typography, Paper, Chip } from "@mui/material";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { formatDate } from "../utils/utilDate";
import { downloadICS } from "../utils/addToCalendar";
import { useCalendar } from "../hooks/useCalendar";
import type { MonthData, Event, OpeningDay } from "../types/calendar.types";
import { ErrorAlert } from "./alert";
import { useTranslation } from "react-i18next";

export default function Calendar() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [monthData, setMonthData] = useState<MonthData>({
    events: [],
    openingDays: [],
    meta: {
      year: dayjs().year(),
      month: dayjs().month() + 1,
    },
  });
  const year = selectedDate.year();
  const month = selectedDate.month() + 1;

  const { getMonthData, isLoading, isError, error } = useCalendar();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMonthData(year, month);
      setMonthData(data);
    };
    fetchData();
  }, [year, month, getMonthData]);

  const eventDaysSet = useMemo(() => {
    if (!monthData) return new Set<string>();
    return new Set(
      monthData.events.map((event: Event) => formatDate(event.date)),
    );
  }, [monthData]);

  const hasEventsOnDay = (day: Dayjs): boolean => {
    if (!monthData) return false;
    return eventDaysSet.has(formatDate(day));
  };

  const isClosedOnDay = (day: Dayjs): boolean => {
    if (!monthData) return false;
    const dayStr = formatDate(day);
    const openingDay = monthData.openingDays.find(
      (od: OpeningDay) => formatDate(od.date) === dayStr,
    );
    return openingDay ? !openingDay.isOpen : false;
  };

  const hasSpecialHours = (day: Dayjs): boolean => {
    if (!monthData) return false;
    const dayStr = formatDate(day);
    const openingDay = monthData.openingDays.find(
      (od: OpeningDay) => formatDate(od.date) === dayStr,
    );
    return openingDay?.specialHours ? true : false;
  };

  const CustomDay = (props: PickersDayProps) => {
    const { day, ...other } = props;
    const hasEvents = hasEventsOnDay(day as Dayjs);
    const isClosed = isClosedOnDay(day as Dayjs);
    const specialHours = hasSpecialHours(day as Dayjs);

    let backgroundColor = "transparent";
    let hoverColor = "transparent";

    if (isClosed) {
      backgroundColor = theme.palette.error.light;
      hoverColor = theme.palette.error.main;
    } else if (specialHours) {
      backgroundColor = theme.palette.warning.light;
      hoverColor = theme.palette.warning.main;
    } else if (hasEvents) {
      backgroundColor = theme.palette.success.light;
      hoverColor = theme.palette.success.main;
    }

    return (
      <PickersDay
        {...other}
        day={day}
        disabled={isClosed}
        sx={{
          backgroundColor,
          fontWeight: hasEvents || isClosed || specialHours ? "bold" : "normal",
          "&:hover": {
            backgroundColor: hoverColor,
          },
          "&.Mui-selected": {
            backgroundColor: `${backgroundColor} !important`,
            border: `2px solid ${theme.palette.success.dark}`,
            color: `${theme.palette.success.dark} !important`,
            fontWeight: "bold !important",
          },
        }}
      />
    );
  };

  const eventsOnSelectedDay = (monthData?.events ?? []).filter(
    (event) => formatDate(event.date) === formatDate(selectedDate),
  );

  const openingDayInfo = (monthData?.openingDays ?? []).find(
    (od) => formatDate(od.date) === formatDate(selectedDate),
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {t("calendar.title")}
        </Typography>

        {isError && <ErrorAlert message={error} />}

        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <DateCalendar
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue || dayjs())}
                  onMonthChange={(newValue) => {
                    setSelectedDate(newValue || dayjs());
                  }}
                  slots={{
                    day: CustomDay,
                  }}
                />

                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    backgroundColor: theme.palette.background.default,
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1, fontWeight: "bold" }}
                  >
                    {t("calendar.legend")}
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          backgroundColor: theme.palette.success.light,
                          border: `1px solid ${theme.palette.success.main}`,
                          borderRadius: "4px",
                        }}
                      />
                      <Typography variant="body2">
                        {t("calendar.daysWithEvents")}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          backgroundColor: theme.palette.error.light,
                          border: `1px solid ${theme.palette.error.main}`,
                          borderRadius: "4px",
                        }}
                      />
                      <Typography variant="body2">
                        {t("calendar.zooClosed")}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          backgroundColor: theme.palette.warning.light,
                          border: `1px solid ${theme.palette.warning.main}`,
                          borderRadius: "4px",
                        }}
                      />
                      <Typography variant="body2">
                        {t("calendar.specialHours")}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          </Paper>
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                {selectedDate.format("MMMM D, YYYY")}
              </Typography>
              {openingDayInfo && (
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={
                      openingDayInfo.isOpen
                        ? t("calendar.zooOpen")
                        : t("calendar.zooClosed")
                    }
                    color={openingDayInfo.isOpen ? "success" : "error"}
                    sx={{ mb: 1 }}
                  />
                  {openingDayInfo.specialHours && (
                    <Typography variant="body2" color="text.secondary">
                      {t("calendar.specialHours")}:{" "}
                      {openingDayInfo.specialHours.openTime} -{" "}
                      {openingDayInfo.specialHours.closeTime}
                    </Typography>
                  )}
                  {openingDayInfo.notes && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {openingDayInfo.notes}
                    </Typography>
                  )}
                </Box>
              )}
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ mt: 2, fontWeight: "bold" }}
              >
                {t("calendar.events")}
              </Typography>
              {eventsOnSelectedDay.length > 0 ? (
                eventsOnSelectedDay.map((event) => {
                  const handleAddToCalendar = () => {
                    const date = formatDate(selectedDate);
                    const start = event.startTime
                      ? `${date}T${event.startTime}`
                      : `${date}T12:00:00`;
                    const end = event.endTime
                      ? `${date}T${event.endTime}`
                      : `${date}T13:00:00`;
                    downloadICS({
                      title: event.title,
                      description: event.description,
                      location: event.location,
                      start,
                      end,
                    });
                  };
                  return (
                    <Paper
                      key={event._id}
                      elevation={1}
                      sx={{ mb: 2, p: 2, borderRadius: 2 }}
                    >
                      <Typography variant="h6" gutterBottom>
                        {event.title}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                        <Chip
                          label={event.eventType}
                          size="small"
                          color="primary"
                        />
                        {event.price > 0 && (
                          <Chip
                            label={`$${event.price}`}
                            size="small"
                            color="secondary"
                          />
                        )}
                        {typeof event.capacity === "number" &&
                          typeof event.booked === "number" && (
                            <Chip
                              label={`${t("calendar.available")}: ${
                                event.capacity - event.booked
                              }`}
                              size="small"
                              color={
                                event.capacity - event.booked > 0
                                  ? "success"
                                  : "error"
                              }
                            />
                          )}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {event.startTime || t("calendar.tbd")}
                        {event.endTime && ` - ${event.endTime}`}
                      </Typography>
                      {event.description && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {event.description}
                        </Typography>
                      )}
                      <Box sx={{ mt: 2 }}>
                        <Chip
                          label={t("calendar.addToCalendar")}
                          color="info"
                          onClick={handleAddToCalendar}
                          sx={{ cursor: "pointer" }}
                        />
                      </Box>
                      {event.image && (
                        <Box
                          component="img"
                          src={event.image}
                          alt={event.title}
                          sx={{
                            width: 400,
                            maxHeight: 400,
                            objectFit: "cover",
                            borderRadius: 2,
                            display: "block",
                            mt: 2,
                          }}
                        />
                      )}
                    </Paper>
                  );
                })
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {t("calendar.noEvents")}
                </Typography>
              )}
            </Paper>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
