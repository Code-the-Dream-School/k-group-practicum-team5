import { useState } from "react";
import ContactInfo from "../components/ContactInfo";
import SuccessAlert from "../components/alert/SuccessAlert";
import { sendContactMessage } from "@/api/contact";
import type { ContactFormData } from "@/types/contact";

export default function Contact() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors]= useState<Record<string, string>>({});
  const [serverError, setServerError]= useState("");
const [isSubmitting, setIsSubmitting]= useState(false);

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    category: "General",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
      category: "General",
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
          Contact Us
        </h1>

        <p className="text-center text-gray-600 mt-2 mb-8">
          Questions about visits, events, or volunteering? We’re happy to help.
        </p>
            <div className="mt-8">
               <ContactInfo />
            </div>
          {showSuccess && (
            <div className="mb-6">
              <SuccessAlert message= "Message sent successfully!"/>
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
            placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-zooGreen"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          {/* Email */}
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
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
            <option>General</option>
            <option>Parties</option>
            <option>Volunteers</option>
            <option>Education</option>
            <option>Other</option>
          </select>

          {/* Message */}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Your message..."
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
