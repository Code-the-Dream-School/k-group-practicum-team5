import { useEffect, useState } from "react";
import axios from "axios";

type Hour = {
  day: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
};

export default function BusinessHours() {
  const [hours, setHours] = useState<Hour[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/business-hours`)
      .then((res) => setHours(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-zooGreen text-white p-6 rounded-xl space-y-2">
      <h2 className="text-xl font-bold mb-3">Business Hours</h2>
      {hours.map((h) => (
        <div key={h.day} className="flex justify-between">
          <span>{h.day}</span>
          <span>
            {h.isClosed ? "Closed" : `${h.openTime} - ${h.closeTime}`}
          </span>
        </div>
      ))}
    </div>
  );
}
