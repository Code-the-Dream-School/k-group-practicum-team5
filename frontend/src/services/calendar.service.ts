import type { MonthData, OpeningDay, Event } from '../types/calendar.types';

const API_BASE_URL = 'http://localhost:8080/api/calendar';

export const calendarService = {
    async getMonthData(year: number, month: number): Promise<MonthData> {
        const response = await fetch(`${API_BASE_URL}/month-data?year=${year}&month=${month}`);
        if (!response.ok) throw new Error('Failed to fetch calendar data');
        return response.json();
    },

    async getOpeningDays(startDate: string, endDate: string): Promise<OpeningDay[]> {
        const response = await fetch(`${API_BASE_URL}/opening-days?startDate=${startDate}&endDate=${endDate}`);
        if (!response.ok) throw new Error('Failed to fetch opening days');
        return response.json();
    },

    async getEvents(startDate: string, endDate: string): Promise<Event[]> {
        const response = await fetch(`${API_BASE_URL}/events?startDate=${startDate}&endDate=${endDate}`);
        if (!response.ok) throw new Error('Failed to fetch events');
        return response.json();
    }
};
