import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react"; // optional icon (requires lucide-react)

function ContactList({ contacts, setContacts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch contacts from backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/contacts");
        setContacts(res.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, [setContacts]);

  // Delete contact
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/contacts/${id}`);

      // Remove deleted contact from list instantly
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact.");
    }
  };

  // Filter logic
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || contact.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
        📋 Saved Contacts
      </h2>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-6">
        <input
          type="text"
          placeholder="🔍 Search name, company, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="Interested">Interested</option>
          <option value="Follow Up">Follow Up</option>
          <option value="Not Interested">Not Interested</option>
        </select>
      </div>

      {/* Contact List */}
      <ul className="divide-y divide-gray-200">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <li
              key={contact._id}
              className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 transition rounded-lg"
            >
              {/* Contact Details */}
              <div>
                <p className="font-semibold text-gray-800">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.company}</p>
                <p className="text-sm text-gray-500">{contact.email}</p>
                <p className="text-sm text-gray-500">{contact.phone}</p>
              </div>

              {/* Status + Delete */}
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    contact.status === "Interested"
                      ? "bg-green-100 text-green-700"
                      : contact.status === "Follow Up"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {contact.status}
                </span>

                <button
                  onClick={() => handleDelete(contact._id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium transition"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6">No contacts found.</p>
        )}
      </ul>
    </div>
  );
}

export default ContactList;
