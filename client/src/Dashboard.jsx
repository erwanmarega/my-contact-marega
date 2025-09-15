import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import {Pencil, X} from "lucide-react";

export default function ContactWidget() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);


  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch(`${apiURL}/api/contacts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur chargement contacts");
        return res.json();
      })
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Erreur chargement contacts:", err);
        setError("Impossible de charger les contacts.");
        setLoading(false);
      });
  }, [apiURL, token]);

  const addContact = () => {
    if (!newContact.firstName || !newContact.lastName || !newContact.email)
      return;

    fetch(`${apiURL}/api/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newContact),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur ajout contact");
        return res.json();
      })
      .then((contact) => {
        setContacts((prev) => [...prev, contact]);
        setNewContact({ firstName: "", lastName: "", email: "", phone: "" });
      })
      .catch((err) =>
        setError("Erreur lors de l’ajout du contact : " + err.message)
      );
  };

  const deleteContact = (id) => {
    fetch(`${apiURL}/api/contacts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur suppression contact");
        setContacts((prev) => prev.filter((c) => c._id !== id));
      })
      .catch((err) =>
        setError("Erreur lors de la suppression du contact : " + err.message)
      );
  };

  const updateContact = (id, updatedInfo) => {
    fetch(`${apiURL}/api/contacts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(updatedInfo),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur mise à jour contact");
        return res.json();
      })
      .then((updatedContact) => {
        setContacts((prev) =>
          prev.map((c) => (c._id === id ? updatedContact : c))
        );
        setIsModalOpen(false);
        setSelectedContact(null);
      })
      .catch((err) =>
        setError("Erreur lors de la mise à jour du contact : " + err.message)
      );
  };

  const openEditModal = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleModalChange = (field, value) => {
    setSelectedContact((prev) => ({ ...prev, [field]: value }));
  };  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="absolute left-0">
        <Navbar />
      </div>
      <div className="size-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          📇 Gestionnaire de contacts
        </h2>

        {loading && <p className="text-gray-500">Chargement...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <ul className="space-y-3 mb-4">
          {contacts.map((contact) => (
            <li
              key={contact._id}
              className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-xl"
            >
              <div>
                <p className="text-gray-800 dark:text-white font-medium">
                  {contact.firstName} {contact.lastName}
                </p>
                <p className="text-gray-500 text-sm">{contact.email}</p>
                {contact.phone && (
                  <p className="text-gray-500 text-sm">{contact.phone}</p>
                )}
              </div>
              <div className="flex ">
              <button
                onClick={() => openEditModal(contact)}
                className="text-white mr-4 hover:text-gray-400 transition"
              >
                <Pencil />
              </button>
              <button
                onClick={() => deleteContact(contact._id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <X />
              </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Prénom"
            value={newContact.firstName}
            onChange={(e) =>
              setNewContact({ ...newContact, firstName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Nom"
            value={newContact.lastName}
            onChange={(e) =>
              setNewContact({ ...newContact, lastName: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={newContact.email}
            onChange={(e) =>
              setNewContact({ ...newContact, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Téléphone"
            value={newContact.phone}
            onChange={(e) =>
              setNewContact({ ...newContact, phone: e.target.value })
            }
          />
          <button
            onClick={addContact}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            ➕
          </button>
        </div>
      </div>

      {isModalOpen && selectedContact && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-96">
            <h3 className="text-lg font-semibold mb-4">Modifier le contact</h3>
            <input
              type="text"
              value={selectedContact.firstName}
              onChange={(e) => handleModalChange("firstName", e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              value={selectedContact.lastName}
              onChange={(e) => handleModalChange("lastName", e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="email"
              value={selectedContact.email}
              onChange={(e) => handleModalChange("email", e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              value={selectedContact.phone || ""}
              onChange={(e) => handleModalChange("phone", e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-red-700 hover:bg-red-900"
              >
                Annuler
              </button>
              <button
                onClick={() =>
                  updateContact(selectedContact._id, selectedContact)
                }
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
