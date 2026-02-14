
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Button, MenuItem, Alert,  Typography } from "@mui/material";
import Calendar from "@/components/Calendar";
import { useAdminCalendar } from "@/hooks/useAdminCalendar";
import type { Event, OpeningDay } from "@/types/calendar.types";
import {useAuth} from "@/hooks/useAuth";
import BasicAlert from "@/components/alert/BasicAlert";
import { formatUTCDateToLocal } from "@/utils/utilDate";
 import dayjs from "dayjs";

export default function ManageCalendar() {
  const { isAdmin, token} = useAuth();
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [openingDays, setOpeningDays] = useState<OpeningDay[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<
    "success" | "info" | "warning" | "error"
  >("success");
  const [showAlert, setShowAlert] = useState(false);
  const { createEvent, updateEvent, deleteEvent, createOpeningDay, updateOpeningDay } = useAdminCalendar();
  type EventForm = Partial<Omit<Event, "_id" | "createdAt">>;

  const [form, setForm] = useState<EventForm >({});
  const [formError, setFormError] = useState<string | null>(null);

  const fetchOpeningDays = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/calendar/opening-days`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpeningDays(res.data);
    } catch (error) {
      console.error("Error fetching opening days:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!isAdmin ||!token) return null;
      try {
        const [eventsRes, openingDaysRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/events`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/calendar/opening-days`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        ]);
        setEvents(eventsRes.data);
        setOpeningDays(openingDaysRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [isAdmin,token]);

  const isPastOrYesterday = (dateStr: string) => {
    const selected = dayjs(dateStr).startOf("day");
    const today = dayjs().startOf("day");
    return selected.isBefore(today); 
  };

  const isZooClosed = (dateStr: string) => {
    const openingDay = openingDays.find(
      (od) => formatUTCDateToLocal(od.date) === dateStr
    );
    return openingDay ? !openingDay.isOpen : false;
  };

  const handleTimeChange =
  (field: "startTime" | "endTime") =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value });
    setFormError(null);
  };

  const handleCreate = (date: string) => {
    if (isPastOrYesterday(date)) {
    setFormError("Cannot create an event for past dates.");
    return;
    }
    if (isZooClosed(date)) {
      setFormError("Cannot create an event on a day when the zoo is closed.");
      return;
    }
    setEditingEvent(null);
     setForm({ date });
    setFormError(null);
    setOpen(true);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setForm({
      ...event,
      date: event.date.slice(0, 10)
    });
    setOpen(true);
  };
   const handleDeleteEvent = async (id: string) => {
   if (!confirm("Are you sure you want to delete this event?")) return;
  try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((event) => event._id !== id));
      setAlertMessage("Event deleted successfully!");
      setAlertSeverity("success");
      setShowAlert(true);
    } catch (err) {
      console.error(err);
      setAlertMessage("Failed to delete event.");
      setAlertSeverity("error");
      setShowAlert(true);
    }
  };
  const handleSubmit = async () => {
    if (form.startTime && form.endTime && form.startTime >= form.endTime) {
      setFormError("End time must be after start time!");
      return; 
    }
  
    try {   
        const payload : Partial<Event> = {...form };
       
      if (editingEvent) {
        const updatedEvent = await updateEvent(editingEvent._id, payload);
        setEvents((prev) =>
          prev.map((event) => (event._id === editingEvent._id ? updatedEvent : event))
        );
        
      } else {
        const createdEvent = await createEvent(form);
        setEvents((prev) => [...prev, createdEvent]);
      }
      setFormError(null);
      setOpen(false);
    } catch (err : unknown) {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data?.message || "An error occurred");
      }
      
    }
  };

  const handleUpdateZooStatus = async (date: string, isOpen: boolean, openingDayId?: string) => {
    try {
      if (openingDayId) {
        // Update existing opening day
        await updateOpeningDay(openingDayId, { isOpen });
      } else {
        // Create new opening day
        await createOpeningDay({ date, isOpen });
      }
      // Refetch opening days to update calendar
      await fetchOpeningDays();
      
      setAlertMessage(
        isOpen
          ? "Zoo marked as Open for this date!"
          : "Zoo marked as Closed for this date!"
      );
      setAlertSeverity("success");
      setShowAlert(true);
    } catch (err) {
      console.error(err);
      setAlertMessage("Failed to update zoo status.");
      setAlertSeverity("error");
      setShowAlert(true);
    }
  };


  return (
    <Box>
       {showAlert && <BasicAlert message={alertMessage} severity={alertSeverity} />}
      <Calendar
        events={events}
        openingDays={openingDays}
        isAdmin = {true}
        onCreateEvent={handleCreate}
        onEditEvent={handleEdit}
        onDeleteEvent={handleDeleteEvent}
        onUpdateZooStatus={handleUpdateZooStatus}
      />

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle >
          {editingEvent ? "Edit Event" : "Create Event"}
        </DialogTitle>
        
        <DialogContent sx={{ display: "flex", gap: 3, flexDirection: "column",
         "& .MuiDialogContent-root": {
          paddingTop: "0",

         }
         }}>
           {formError && ( <Alert severity="error" onClose={() => setFormError(null)} sx={{ mb: 2 }}>{formError} </Alert>)}

          <TextField
            id="event-title"
            label="Title"
            required
            value={form.title || ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            
          />
          <TextField
            id="event-description"
            label="Description"
            multiline
            required
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            
          />
         

          <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap">
            {/* Event Type */}
            <Stack direction="row" spacing={1} alignItems="center" flex={1} minWidth={150}>
              <Typography variant="body1">Event Type:</Typography>
              <TextField
                select
                value={form.eventType ?? ""}
                onChange={(e) =>
                  setForm({ ...form, eventType: e.target.value as Event["eventType"] })
                }
                size="small"
                fullWidth
              >
                <MenuItem value="Show">Show</MenuItem>
                <MenuItem value="Feeding">Feeding</MenuItem>
                <MenuItem value="Workshop">Workshop</MenuItem>
                <MenuItem value="Guided Tour">Guided Tour</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
              </TextField>
            </Stack>

            {/* Date */}
            <Stack direction="row" spacing={1} alignItems="center" flex={1} minWidth={150}>
              <Typography variant="body1">Date:</Typography>
              <TextField
                type="date"
                value={form.date || ""}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                size="small"
                fullWidth
               
              />
            </Stack>
          </Stack>

         
          <Stack direction="row" spacing={4} alignItems="center">
 
              <Stack direction="row" spacing={1} alignItems="center" flex={1}>
                <Typography variant="body1">Start Time:</Typography>
                <TextField
                  type="time"
                  value={form.startTime || ""}
                  onChange={handleTimeChange("startTime")}
                  size="small"
                  fullWidth
                 
                />
              </Stack>

          
            <Stack direction="row" spacing={1} alignItems="center" flex={1}>
              <Typography variant="body1">End Time:</Typography>
              <TextField
                type="time"
                value={form.endTime || ""}
                onChange={handleTimeChange("endTime")}
                size="small"
                fullWidth
             
              />
            </Stack>
         </Stack>
          <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap">
 
            <Stack direction="row" spacing={1} alignItems="center" flex={1} minWidth={120}>
              <Typography variant="body1">Capacity:</Typography>
              <TextField
                type="number"
                value={form.capacity || ""}
                onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
                size="small"
                fullWidth
            
              />
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" flex={1} minWidth={120}>
              <Typography variant="body1">Price:</Typography>
              <TextField
                type="number"
                value={form.price || ""}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                size="small"
                fullWidth
               
              />
            </Stack>
          </Stack>
          

        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={!form.title || !form.description || !form.date ||!form.eventType ||!form.capacity || !form.startTime || !form.endTime|| isPastOrYesterday(form.date)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

