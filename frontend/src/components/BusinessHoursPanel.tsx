import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

type DaySchedule = {
  day: string;
  open: string;
  close: string;
};

type BusinessHoursResponse = {
  isClosed: boolean;
  schedule: DaySchedule[];
};

export default function BusinessHoursPanel() {
  const [data, setData] = useState<BusinessHoursResponse>({
    isClosed: false,
    schedule:[],
  });

  useEffect(() => {
    const fetchHours = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/business-hours`
      );

      setData(res.data[0]); 
    };
    fetchHours();
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const orderedSchedule = useMemo(() => {
    if (!data?.schedule) return [];

    const index = data.schedule.findIndex((d) => d.day === today);

    if (index === -1) return data.schedule;

    return [
      ...data.schedule.slice(index),
      ...data.schedule.slice(0, index),
    ];
  }, [data, today]);

  if (!data) return null;

  const todaySchedule = data.schedule.find((d) => d.day === today);

  const isClosedToday =
    todaySchedule?.open === "Closed" || data.isClosed;

  return (
    <Box sx={{ maxWidth: 240 }}>
      <Accordion
        sx={{
          borderRadius: 3,
          boxShadow: 2,
        //   bgcolor: "var(--zooLight)",
        }}
      >
        {/* HEADER */}
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box
            display="flex"
            gap={1}
            alignItems="center"
            width="100%"
          >
            <AccessTimeIcon fontSize="small" />

            <Chip
              label={isClosedToday ? "CLOSED" : "OPEN NOW"}
              color={isClosedToday ? "error" : "success"}
              size="small"
              sx={{ fontWeight: 700 }}
            />
          </Box>
        </AccordionSummary>

        {/* DROPDOWN LIST */}
        <AccordionDetails sx={{pt:0}}>
            {orderedSchedule.map((item) => {
            const isToday = item.day === today;

            return (
              <Box
                key={item.day}
                display="flex"
                justifyContent="space-between"
                sx={{
                  py: 0.6,
                  px: 1,
                  fontSize: "0.95rem",
                  fontWeight: isToday ? 700 : 400,
                  borderRadius: 2,
                  bgcolor: isToday ? "action.hover" : "transparent",
                }}
              >
                <Typography fontSize="inherit" fontWeight={isToday ? 700 : 400}>
                  {item.day}
                </Typography>

                <Typography fontSize="inherit" fontWeight={isToday ? 700 : 400}>
                  {item.open === "Closed"
                    ? "Closed"
                    : `${item.open} – ${item.close}`}
              </Typography>
            </Box>
            )
          })}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
