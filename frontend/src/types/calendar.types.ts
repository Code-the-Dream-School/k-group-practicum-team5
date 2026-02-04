export interface OpeningDay {
  _id: string;
  date: string;
  isOpen: boolean;
  notes?: string;
  specialHours?: {
    openTime: string;
    closeTime: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Event {
  _id: string;
  title: string;
  description?: string;
  eventType: "Show" | "Feeding" | "Workshop" | "Guided Tour" | "Education";
  date: string;
  startTime?: string;
  endTime?: string;
  location: string;
  capacity: number;
  booked: number;
  price: number;
  image?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MonthData {
  openingDays: OpeningDay[];
  events: Event[];
  meta: {
    year: number;
    month: number;
    startDate?: string;
    endDate?: string;
  };
}
