import { useState } from "react";
import { useTranslation } from "react-i18next";
import ContactInfo from "../components/ContactInfo";
import SuccessAlert from "../components/alert/SuccessAlert";
import { sendContactMessage } from "@/api/contact";
import type { ContactFormData } from "@/types/contact";

export default function Contact() {
  const { t } = useTranslation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors]= useState<Record<string, string>>({});
  const [serverError, setServerError]= useState("");
const [isSubmitting, setIsSubmitting]= useState(false);

  const [formData, setFormData] = useState<ContactFormData>({
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
  
  const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const newErrors: Record<string, string>= {};
  setServerError("");
  setErrors({});

    if (!formData.name.trim()) {newErrors.name = "Name is required";}
  if (!formData.email.trim()) {newErrors.email = "Email is required";}
  else if (!emailRegex.test(formData.email)) {
    newErrors.email = "Enter a valid email address!"}
  if (!formData.message.trim()) {newErrors.message = "Message is required";}

  if (Object.keys(newErrors).length) {
    setErrors(newErrors);
    return;
  }
  try {
    setIsSubmitting(true)
    await sendContactMessage(
      formData
    );

    setShowSuccess(true);
    // setErrors({})

    setFormData({
      name: "",
      email: "",
      category: "general",
      message: "",
    });

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  } catch (err) {
    console.error(err);
    setServerError("Failed to send message");
  } finally {
    setIsSubmitting(false);
  }
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
          { serverError && (
            <div className="text-red-600 text-center font-medium mb-4">
              {serverError}
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
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          {/* Email */}
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("contact.fields.email")}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-zooGreen"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-zooGreen text-white font-semibold py-3 rounded-lg hover:bg-zooDark transition"
          >
            {isSubmitting ? "Sending....": "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
