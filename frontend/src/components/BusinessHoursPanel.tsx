import { useEffect, useState } from "react";
import axios from "axios";

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
  const [data, setData] = useState<BusinessHoursResponse | null>(null);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  const today = new Date().toLocaleString("en-US", { weekday: "long" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hoursRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/business-hours`
        );

        const statusRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/business-hours/status`
        );

        setData(hoursRes.data[0]);
        setIsOpen(statusRes.data.isOpen);
      } catch (err) {
        console.error("Failed to load business hours", err);
      }
    };

    fetchData();
  }, []);

  if (!data) return null;

  return (
    <div className="bg-zooGreen text-zooLight rounded-lg p-4 shadow-md w-full max-w-[240px]">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm">Hours of Operation</h2>

        {isOpen !== null && (
          <span
            className={`px-2 py-0.5 rounded-full text-sm font-semibold ${
              isOpen ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {isOpen ? "OPEN NOW" : "CLOSED"}
          </span>
        )}
      </div>

      <ul className="space-y-1 text-sm">
        {data.schedule.map((item) => {
          const isToday = item.day === today;

          return (
            <li
              key={item.day}
              className={`flex justify-between px-3 py-2 rounded ${
                isToday ? "bg-zooDark font-bold" : "opacity-90"
              }`}
            >
              <span>{item.day}</span>
              <span>
                {item.open === "Closed" ? "Closed" : `${item.open} – ${item.close}`}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
