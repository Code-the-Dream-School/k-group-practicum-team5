import { useState } from "react";
import { useTranslation } from "react-i18next";
import ContactInfo from "../components/ContactInfo";
import SuccessAlert from "../components/alert/SuccessAlert";

export default function Contact() {
  const { t } = useTranslation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "general",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setShowSuccess(true);

    setFormData({
      name: "",
      email: "",
      category: "general",
      message: "",
    });
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-zooGreen/80 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full p-10">
        <h1 className="text-3xl font-bold text-zooGreen text-center">
          {t("contact.title")}
        </h1>

        <p className="text-center text-gray-600 mt-2 mb-8">
          {t("contact.subtitle")}
        </p>
        <div className="mt-8">
          <ContactInfo />
        </div>
        {showSuccess && (
          <div className="mb-6">
            <SuccessAlert message={t("contact.success")} />
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          {/* Name */}
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("contact.fields.name")}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-zooGreen"
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("contact.fields.email")}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-zooGreen"
          />

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-zooGreen"
          >
            <option value="general">{t("contact.categories.general")}</option>
            <option value="parties">{t("contact.categories.parties")}</option>
            <option value="volunteers">
              {t("contact.categories.volunteers")}
            </option>
            <option value="education">
              {t("contact.categories.education")}
            </option>
            <option value="other">{t("contact.categories.other")}</option>
          </select>

          {/* Message */}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder={t("contact.fields.message")}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-zooGreen"
          />

          <button
            type="submit"
            className="w-full bg-zooGreen text-white font-semibold py-3 rounded-lg hover:bg-zooDark transition"
          >
            {t("contact.send")}
          </button>
        </form>
      </div>
    </div>
  );
}
