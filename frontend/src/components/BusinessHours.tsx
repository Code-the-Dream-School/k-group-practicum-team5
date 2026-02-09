import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

type Hour = {
  day: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
};

export default function BusinessHours() {
  const { t } = useTranslation();
  const [hours, setHours] = useState<Hour[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/business-hours`)
      .then((res) => setHours(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-zooGreen text-white p-6 rounded-xl space-y-2">
      <h2 className="text-xl font-bold mb-3">{t("businessHours.title")}</h2>
      {hours.map((h) => (
        <div key={h.day} className="flex justify-between">
          <span>{t(`businessHours.days.${h.day.toLowerCase()}`, h.day)}</span>
          <span>
            {h.isClosed
              ? t("businessHours.status.closed")
              : `${h.openTime} - ${h.closeTime}`}
          </span>
        </div>
      ))}
    </div>
  );
}
