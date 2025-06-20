console.log("Componente Home cargado");
import React, { useState } from "react";

export const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.name || !formData.address || !formData.phone || !formData.email) {
      alert("All fields are required");
      return;
    }

    const updatedContacts = [...contacts];
    if (editingIndex !== null) {
      updatedContacts[editingIndex] = formData;
    } else {
      updatedContacts.push(formData);
    }

    setContacts(updatedContacts);
    setFormData({ name: "", address: "", phone: "", email: "" });
    setEditingIndex(null);
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setFormData(contacts[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      const updated = contacts.filter((_, i) => i !== index);
      setContacts(updated);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Contact List</h2>
        <button className="btn btn-success" onClick={() => setShowForm(true)}>
          Add new contact
        </button>
      </div>

      {showForm && (
        <div className="card p-3 mb-4">
          <div className="row g-2">
            <div className="col-md-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-1 d-grid">
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {contacts.map((contact, index) => (
        <div
          key={index}
          className="card mb-2 p-3 d-flex flex-row align-items-center justify-content-between"
        >
          <div className="d-flex align-items-center gap-3">
            <img
              src={`https://randomuser.me/api/portraits/men/${index + 10}.jpg`}
              width="70"
              className="rounded-circle"
              alt="avatar"
            />
            <div>
              <h5>{contact.name}</h5>
              <p className="mb-0">📍 {contact.address}</p>
              <p className="mb-0">📞 {contact.phone}</p>
              <p className="mb-0">✉️ {contact.email}</p>
            </div>
          </div>
          <div>
            <button
              className="btn btn-sm btn-outline-secondary me-2"
              onClick={() => handleEdit(index)}
            >
              ✏️
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleDelete(index)}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
