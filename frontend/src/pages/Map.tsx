import { useTranslation } from "react-i18next";
import InteractiveMap from "../components/InteractiveMap";

export default function MapPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-zooGreen/80 px-4 py-12">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-zooGreen mb-2">
          {t("map.title")}
        </h1>
        <p className="text-gray-600 mb-6">{t("map.description")}</p>

        <InteractiveMap />
      </div>
    </div>
  );
}
