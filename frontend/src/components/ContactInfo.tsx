import { useEffect, useState } from "react";

type ContactInfoData = {
  phone: string;
  email: string;
  address: string;
};

export default function ContactInfo() {
  const [info, setInfo] = useState<ContactInfoData | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/contact-info")
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch((err) => console.error(err));
  }, []);

  if (!info) return null;

  return (
    <div className="bg-zoo-light p-8 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6 ">
      <div>
        <p className="font-bold text-zoo-green">Phone</p>
        <p>{info.phone}</p>
      </div>

      <div>
        <p className="font-bold text-zoo-green">Email</p>
        <p>{info.email}</p>
      </div>

      <div className='md:col-span-2'>                       
        <p className="font-bold text-zoo-green">Address</p>
        <p className='mt-2 leading-relaxed'>{info.address}</p>
      </div>
    </div>
  );
}
