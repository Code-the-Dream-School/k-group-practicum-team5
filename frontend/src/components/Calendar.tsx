import { useState, useEffect, useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import type { PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Chip,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { formatDate, formatUTCDateToLocal } from "../utils/utilDate";
import { downloadICS } from "../utils/addToCalendar";
import { useCalendar } from "../hooks/useCalendar";
import type { MonthData, Event, OpeningDay } from "../types/calendar.types";
import { ErrorAlert } from "./alert";
import { useTranslation } from "react-i18next";

interface CalendarProps {
  isAdmin?: boolean;
  onEditEvent?: (event: Event) => void;
  onCreateEvent?: (date: string) => void;
  onDeleteEvent?: (eventId: string) => void;
  onUpdateZooStatus?: (
    date: string,
    isOpen: boolean,
    openingDayId?: string,
  ) => void;
  events?: Event[];
  openingDays?: OpeningDay[];
}

export default function Calendar({
  isAdmin = false,
  onEditEvent,
  onCreateEvent,
  onDeleteEvent,
  onUpdateZooStatus,
  events = [],
  openingDays = [],
}: CalendarProps) {
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
  const eventSource = isAdmin ? events : monthData.events;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMonthData(year, month);
      setMonthData(data);
    };
    fetchData();
  }, [year, month, getMonthData]);

  const mergedOpeningDays = useMemo(() => {
    // Use openingDays prop if available (from ManageCalendar), otherwise use monthData.openingDays
    return openingDays.length > 0 ? openingDays : monthData.openingDays;
  }, [openingDays, monthData.openingDays]);

  const eventDaysSet = useMemo(() => {
    const source = isAdmin ? events : monthData.events;
    return new Set(source.map((e) => formatUTCDateToLocal(e.date)));
  }, [isAdmin, events, monthData.events]);

  const isPastDate = (day: Dayjs): boolean => {
    const today = dayjs().startOf("day");
    return day.startOf("day").isBefore(today);
  };

  const hasEventsOnDay = (day: Dayjs): boolean => {
    if (!monthData) return false;
    return eventDaysSet.has(formatDate(day));
  };

  const isClosedOnDay = (day: Dayjs): boolean => {
    const dayStr = formatDate(day);
    const openingDay = mergedOpeningDays.find(
      (od: OpeningDay) => formatUTCDateToLocal(od.date) === dayStr,
    );
    return openingDay ? !openingDay.isOpen : false;
  };

  const hasSpecialHours = (day: Dayjs): boolean => {
    const dayStr = formatDate(day);
    const openingDay = mergedOpeningDays.find(
      (od: OpeningDay) => formatUTCDateToLocal(od.date) === dayStr,
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
        onClick={() => {
          const isClosed = isClosedOnDay(day as Dayjs);
          if (isAdmin && onCreateEvent && !isClosed) {
            onCreateEvent(day.format("YYYY-MM-DD"));
          }
        }}
        disabled={!isAdmin && isClosed}
        sx={{
          backgroundColor,
          fontWeight: hasEvents || isClosed || specialHours ? "bold" : "normal",
          cursor:
            isAdmin && isClosed
              ? "pointer"
              : isClosed
                ? "not-allowed"
                : "pointer",
          opacity: !isAdmin && isClosed ? 0.6 : 1,
          "&:hover": {
            backgroundColor:
              !isAdmin && isClosed ? backgroundColor : hoverColor,
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

  const eventsOnSelectedDay = eventSource.filter(
    (event) => formatUTCDateToLocal(event.date) === formatDate(selectedDate),
  );

  const openingDayInfo = mergedOpeningDays.find(
    (od) => formatUTCDateToLocal(od.date) === formatDate(selectedDate),
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
              {openingDayInfo ? (
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
                  {isAdmin && (
                    <Box sx={{ mb: 1 }}>
                      <ToggleButtonGroup
                        value={openingDayInfo.isOpen ? "open" : "closed"}
                        exclusive
                        onChange={(_event, newValue) => {
                          if (newValue !== null) {
                            onUpdateZooStatus?.(
                              formatDate(selectedDate),
                              newValue === "open",
                              openingDayInfo._id,
                            );
                          }
                        }}
                        size="small"
                      >
                        <ToggleButton
                          value="open"
                          sx={{
                            color: "success.main",
                            "&.Mui-selected": {
                              backgroundColor: "success.light",
                              color: "success.dark",
                              "&:hover": {
                                backgroundColor: "success.light",
                              },
                            },
                          }}
                        >
                          Open
                        </ToggleButton>
                        <ToggleButton
                          value="closed"
                          sx={{
                            color: "error.main",
                            "&.Mui-selected": {
                              backgroundColor: "error.light",
                              color: "error.dark",
                              "&:hover": {
                                backgroundColor: "error.light",
                              },
                            },
                          }}
                        >
                          Closed
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Box>
                  )}
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
              ) : (
                <Box sx={{ mb: 2 }}>
                  <Chip label="Zoo Open" color="success" sx={{ mb: 1 }} />
                  {isAdmin && !isPastDate(selectedDate) && (
                    <Box sx={{ mb: 1, mt: 1 }}>
                      <ToggleButtonGroup
                        value="open"
                        exclusive
                        onChange={(_event, newValue) => {
                          if (newValue !== null) {
                            onUpdateZooStatus?.(
                              formatDate(selectedDate),
                              newValue === "open",
                            );
                          }
                        }}
                        size="small"
                      >
                        <ToggleButton
                          value="open"
                          sx={{
                            color: "success.main",
                            "&.Mui-selected": {
                              backgroundColor: "success.light",
                              color: "success.dark",
                              "&:hover": {
                                backgroundColor: "success.light",
                              },
                            },
                          }}
                        >
                          Open
                        </ToggleButton>
                        <ToggleButton
                          value="closed"
                          sx={{
                            color: "error.main",
                            "&.Mui-selected": {
                              backgroundColor: "error.light",
                              color: "error.dark",
                              "&:hover": {
                                backgroundColor: "error.light",
                              },
                            },
                          }}
                        >
                          Closed
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Box>
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
                      {!isPastDate(selectedDate) && (
                        <Box sx={{ mt: 2 }}>
                          <Chip
                            label="Add to Calendar"
                            color="info"
                            onClick={handleAddToCalendar}
                            sx={{ cursor: "pointer" }}
                          />
                        </Box>
                      )}
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
                      {isAdmin && !isPastDate(selectedDate) && (
                        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => onEditEvent?.(event)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            onClick={() => onDeleteEvent?.(event._id)}
                          >
                            Delete
                          </Button>
                        </Box>
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
