// import { useState, useEffect } from 'react';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { Box, CircularProgress, Alert, Typography } from '@mui/material';
// import dayjs from 'dayjs';
// import type { Dayjs } from 'dayjs';
// import type { MonthData } from '../types/calendar.types';
// import { calendarService } from '../services/calendar.service';

// export default function Calendar() {
//     const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
//     const [monthData, setMonthData] = useState<MonthData | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         loadMonthData(selectedDate.year(), selectedDate.month() + 1);
//     }, [selectedDate]);

//     const loadMonthData = async (year: number, month: number) => {
//         setLoading(true);
//         setError(null);
//         try {
//             const data = await calendarService.getMonthData(year, month);
//             setMonthData(data);
//             console.log('Calendar data loaded:', data);
//         } catch (err) {
//             setError('Failed to load calendar data');
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const eventsOnSelectedDay = monthData?.events.filter(
//         (event) => dayjs(event.date).format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD')
//     ) || [];

//     const openingDayInfo = monthData?.openingDays.find(
//         (od) => dayjs(od.date).format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD')
//     );

//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Box sx={{ p: 3 }}>
//                 <Typography variant="h4" gutterBottom>
//                     Zoo Calendar
//                 </Typography>

//                 {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                
//                 <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
//                     <Box>
//                         {loading ? (
//                             <CircularProgress />
//                         ) : (
//                             <DateCalendar
//                                 value={selectedDate}
//                                 onChange={(newValue) => setSelectedDate(newValue || dayjs())}
//                             />
//                         )}
//                     </Box>

//                     <Box sx={{ flex: 1, minWidth: 300 }}>
//                         <Typography variant="h6" gutterBottom>
//                             {selectedDate.format('MMMM D, YYYY')}
//                         </Typography>

//                         {openingDayInfo && (
//                             <Alert severity={openingDayInfo.isOpen ? 'success' : 'error'} sx={{ mb: 2 }}>
//                                 Zoo is {openingDayInfo.isOpen ? 'OPEN' : 'CLOSED'}
//                                 {openingDayInfo.notes && ` - ${openingDayInfo.notes}`}
//                             </Alert>
//                         )}

//                         {eventsOnSelectedDay.length > 0 ? (
//                             <>
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     Events Today:
//                                 </Typography>
//                                 {eventsOnSelectedDay.map((event) => (
//                                     <Box key={event._id} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
//                                         <Typography variant="h6">{event.title}</Typography>
//                                         <Typography variant="body2" color="text.secondary">
//                                             {event.eventType} • {event.startTime || 'TBD'}
//                                         </Typography>
//                                         {event.description && (
//                                             <Typography variant="body2" sx={{ mt: 1 }}>
//                                                 {event.description}
//                                             </Typography>
//                                         )}
//                                     </Box>
//                                 ))}
//                             </>
//                         ) : (
//                             <Typography color="text.secondary">
//                                 No events scheduled for this day.
//                             </Typography>
//                         )}
//                     </Box>
//                 </Box>
//             </Box>
//         </LocalizationProvider>
//     );
// }

import { useState, useEffect } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import type { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { Box, CircularProgress, Alert, Typography, Paper, Chip } from '@mui/material';
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

    // Check if a day has events
    const hasEventsOnDay = (day: Dayjs): boolean => {
        if (!monthData) return false;
        const dayStr = day.format('YYYY-MM-DD');
        return monthData.events.some(
            (event) => dayjs(event.date).format('YYYY-MM-DD') === dayStr
        );
    };

    // Check if zoo is closed on a day
    const isClosedOnDay = (day: Dayjs): boolean => {
        if (!monthData) return false;
        const dayStr = day.format('YYYY-MM-DD');
        const openingDay = monthData.openingDays.find(
            (od) => dayjs(od.date).format('YYYY-MM-DD') === dayStr
        );
        return openingDay ? !openingDay.isOpen : false;
    };

    // Check if day has special hours
    const hasSpecialHours = (day: Dayjs): boolean => {
        if (!monthData) return false;
        const dayStr = day.format('YYYY-MM-DD');
        const openingDay = monthData.openingDays.find(
            (od) => dayjs(od.date).format('YYYY-MM-DD') === dayStr
        );
        return openingDay?.specialHours ? true : false;
    };

    // Premium custom day renderer with color shading
    const CustomDay = (props: PickersDayProps) => {
        const { day, ...other } = props;
        const hasEvents = hasEventsOnDay(day as Dayjs);
        const isClosed = isClosedOnDay(day as Dayjs);
        const specialHours = hasSpecialHours(day as Dayjs);

        // Determine background color (priority: closed > special > events)
        let backgroundColor = 'transparent';
        let hoverColor = 'transparent';
        
        if (isClosed) {
            backgroundColor = '#ffcdd2'; // Light red
            hoverColor = '#ef9a9a';
        } else if (specialHours) {
            backgroundColor = '#fff9c4'; // Light yellow
            hoverColor = '#fff59d';
        } else if (hasEvents) {
            backgroundColor = '#c8e6c9'; // Light green
            hoverColor = '#a5d6a7';
        }

        return (
            <PickersDay
                {...other}
                day={day}
                sx={{
                    backgroundColor,
                    fontWeight: (hasEvents || isClosed || specialHours) ? 'bold' : 'normal',
                    '&:hover': {
                        backgroundColor: hoverColor,
                    },
                    // Selected day styling
                    '&.Mui-selected': {
                        backgroundColor: `${backgroundColor} !important`,
                        border: '2px solid #2e7d32',
                        color: '#2e7d32 !important',
                        fontWeight: 'bold !important',
                    },
                }}
            />
        );
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
                    {/* Calendar Section */}
                    <Paper elevation={2} sx={{ p: 2 }}>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <DateCalendar
                                    value={selectedDate}
                                    onChange={(newValue) => setSelectedDate(newValue || dayjs())}
                                    slots={{
                                        day: CustomDay,
                                    }}
                                />
                                
                                {/* Premium Legend */}
                                <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                                        Legend:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box
                                                sx={{
                                                    width: 20,
                                                    height: 20,
                                                    backgroundColor: '#c8e6c9',
                                                    border: '1px solid #81c784',
                                                    borderRadius: '4px',
                                                }}
                                            />
                                            <Typography variant="body2">Days with events</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box
                                                sx={{
                                                    width: 20,
                                                    height: 20,
                                                    backgroundColor: '#ffcdd2',
                                                    border: '1px solid #e57373',
                                                    borderRadius: '4px',
                                                }}
                                            />
                                            <Typography variant="body2">Zoo closed</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box
                                                sx={{
                                                    width: 20,
                                                    height: 20,
                                                    backgroundColor: '#fff9c4',
                                                    border: '1px solid #fff176',
                                                    borderRadius: '4px',
                                                }}
                                            />
                                            <Typography variant="body2">Special hours</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </>
                        )}
                    </Paper>

                    {/* Selected Date Details Section */}
                    <Box sx={{ flex: 1, minWidth: 300 }}>
                        <Paper elevation={2} sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                {selectedDate.format('MMMM D, YYYY')}
                            </Typography>

                            {/* Opening Status */}
                            {openingDayInfo && (
                                <Box sx={{ mb: 2 }}>
                                    <Chip
                                        label={openingDayInfo.isOpen ? 'Zoo Open' : 'Zoo Closed'}
                                        color={openingDayInfo.isOpen ? 'success' : 'error'}
                                        sx={{ mb: 1 }}
                                    />
                                    {openingDayInfo.specialHours && (
                                        <Typography variant="body2" color="text.secondary">
                                            Special Hours: {openingDayInfo.specialHours.openTime} - {openingDayInfo.specialHours.closeTime}
                                        </Typography>
                                    )}
                                    {openingDayInfo.notes && (
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                            {openingDayInfo.notes}
                                        </Typography>
                                    )}
                                </Box>
                            )}

                            {/* Events for Selected Date */}
                            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
                                Events:
                            </Typography>
                            {eventsOnSelectedDay.length > 0 ? (
                                eventsOnSelectedDay.map((event) => (
                                    <Paper key={event._id} elevation={1} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
                                        {/* Display event image if it exists */}
                                        {event.image && (
                                            <Box
                                                component="img"
                                                src={event.image}
                                                alt={event.title}
                                                sx={{
                                                    width: '100%',
                                                    maxHeight: 200,
                                                    objectFit: 'cover',
                                                    borderRadius: 1,
                                                    mb: 2,
                                                }}
                                            />
                                        )}
                                        <Typography variant="h6" gutterBottom>
                                            {event.title}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                            <Chip label={event.eventType} size="small" color="primary" />
                                            {event.price > 0 && (
                                                <Chip label={`$${event.price}`} size="small" color="secondary" />
                                            )}
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            {event.startTime || 'TBD'}
                                            {event.endTime && ` - ${event.endTime}`}
                                        </Typography>
                                        {event.description && (
                                            <Typography variant="body2" sx={{ mt: 1 }}>
                                                {event.description}
                                            </Typography>
                                        )}
                                    </Paper>
                                ))
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    No events scheduled for this day.
                                </Typography>
                            )}
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </LocalizationProvider>
    );
}