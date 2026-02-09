import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

type ContactInfoData = {
  phone: string;
  email: string;
  address: string;
};

export default function ContactInfo() {
  const { t } = useTranslation();
  const [info, setInfo] = useState<ContactInfoData | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/contact-info`,
        );
        // console.log("CONTACT INFO RESPONSE:", res.data);
        setInfo(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContactInfo();
  }, []);

  if (!info) return <p>{t("contactInfo.loading")}</p>;

  return (
    <div className="bg-zoo-light p-8 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6 ">
      <div>
        <p className="font-bold text-zoo-green">{t("contactInfo.phone")}</p>
        <p>{info.phone}</p>
      </div>

      <div>
        <p className="font-bold text-zoo-green">{t("contactInfo.email")}</p>
        <p>{info.email}</p>
      </div>

      <div className="md:col-span-2">
        <p className="font-bold text-zoo-green">{t("contactInfo.address")}</p>
        <p className="mt-2 leading-relaxed">{info.address}</p>
      </div>
    </div>
  );
}
