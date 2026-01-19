import { useState } from "react";
import ContactInfo from "../components/ContactInfo";
import SuccessAlert from "../components/alert/SuccessAlert";
import InteractiveMap from "../components/InteractiveMap";

export default function Contact() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setShowSuccess(true);

    setFormData({
      name: "",
      email: "",
      category: "General",
      message: "",
    });
    setTimeout(()=>{
      setShowSuccess(false)
    },3000)
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
        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          {/* Name */}
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-zooGreen"
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-zooGreen"
          />

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

          <button
            type="submit"
            className="w-full bg-zooGreen text-white font-semibold py-3 rounded-lg hover:bg-zooDark transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
