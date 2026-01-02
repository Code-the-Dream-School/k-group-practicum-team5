import { useState, useEffect } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type { MonthData } from '../types/calendar.types';
import { calendarService } from '../services/calendar.service';

export default function Calendar() {
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
    const [monthData, setMonthData] = useState<MonthData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadMonthData(selectedDate.year(), selectedDate.month() + 1);
    }, [selectedDate]);

    const loadMonthData = async (year: number, month: number) => {
        setLoading(true);
        setError(null);
        try {
            const data = await calendarService.getMonthData(year, month);
            setMonthData(data);
            console.log('Calendar data loaded:', data);
        } catch (err) {
            setError('Failed to load calendar data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const eventsOnSelectedDay = monthData?.events.filter(
        (event) => dayjs(event.date).format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD')
    ) || [];

    const openingDayInfo = monthData?.openingDays.find(
        (od) => dayjs(od.date).format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD')
    );

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Zoo Calendar
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    <Box>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <DateCalendar
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue || dayjs())}
                            />
                        )}
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 300 }}>
                        <Typography variant="h6" gutterBottom>
                            {selectedDate.format('MMMM D, YYYY')}
                        </Typography>

                        {openingDayInfo && (
                            <Alert severity={openingDayInfo.isOpen ? 'success' : 'error'} sx={{ mb: 2 }}>
                                Zoo is {openingDayInfo.isOpen ? 'OPEN' : 'CLOSED'}
                                {openingDayInfo.notes && ` - ${openingDayInfo.notes}`}
                            </Alert>
                        )}

                        {eventsOnSelectedDay.length > 0 ? (
                            <>
                                <Typography variant="subtitle1" gutterBottom>
                                    Events Today:
                                </Typography>
                                {eventsOnSelectedDay.map((event) => (
                                    <Box key={event._id} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                                        <Typography variant="h6">{event.title}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {event.eventType} • {event.startTime || 'TBD'}
                                        </Typography>
                                        {event.description && (
                                            <Typography variant="body2" sx={{ mt: 1 }}>
                                                {event.description}
                                            </Typography>
                                        )}
                                    </Box>
                                ))}
                            </>
                        ) : (
                            <Typography color="text.secondary">
                                No events scheduled for this day.
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </LocalizationProvider>
    );
}