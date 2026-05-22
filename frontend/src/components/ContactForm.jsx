import React, { useState } from "react";
import axios from "axios";

function ContactForm({ contacts, setContacts }){
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("Interested");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !company || !email || !phone) {
    alert("Please fill in all required fields.");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/contacts", {
      name,
      company,
      email,
      phone,
      status,
    });

    console.log("Contact Added ✅", res.data);

    // 🆕 Update contacts list immediately
    setContacts([res.data, ...contacts]);

    // clear fields after submit
    setName("");
    setCompany("");
    setEmail("");
    setPhone("");
    setStatus("Interested");

  } catch (error) {
    console.error("Error adding contact:", error);
  }
};


  

  return (


      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-[#eff4ff] p-3 rounded w-full text-[#0c002b] outline-0"
        />

        <input
          type="text"
          placeholder="Enter company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          className="bg-[#eff4ff] p-3 rounded w-full text-[#0c002b] outline-0"
        />

        <input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-[#eff4ff] p-3 rounded w-full text-[#0c002b] outline-0"
        />

        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="bg-[#eff4ff] p-3 rounded w-full text-[#0c002b] outline-0"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-[#eff4ff] p-3 rounded w-full text-[#0c002b] outline-0"
        >
          <option value="Interested">Interested</option>
          <option value="Follow Up">Follow Up</option>
          <option value="Not Interested">Not Interested</option>
        </select>

        <button
          type="submit"
          className="text-white px-4 py-2 bg-[#00277a] rounded-md font-semibold hover:bg-[#003bb5] transition cursor-pointer"
        >
          Save Contact
        </button>
      </form>

  );
}

export default ContactForm;
