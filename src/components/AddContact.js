import React, { useState } from "react";
import crmFacade from "../facades/contactFacade";

export default function AddContact() {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    company: "",
    jobtitle: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setContact({ ...contact, [e.target.name]: e.target.value });
    setError("");
    setMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    crmFacade
      .addContact(contact)
      .then((res) => setMsg(`${res.name} has been added!`));
  };

  return (
    <div>
      <br></br>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <label>Contact Name</label>
        <br />
        <input
          onChange={handleChange}
          value={contact.name}
          name="name"
          required="required"
        ></input>
        <br />
        <br />
        <label>Email</label>
        <br />
        <input
          onChange={handleChange}
          type="email"
          value={contact.email}
          name="email"
          required="required"
        ></input>
        <br />
        <br />
        <label>Company Name</label>
        <br />
        <input
          onChange={handleChange}
          value={contact.company}
          name="company"
          required="required"
        ></input>
        <br />
        <br />
        <label>Jobtitle</label>
        <br />
        <input
          onChange={handleChange}
          value={contact.jobtitle}
          name="jobtitle"
          required="required"
        ></input>
        <br />
        <br />
        <label>Phone</label>
        <br />
        <input
          onChange={handleChange}
          value={contact.phone}
          name="phone"
          required="required"
        ></input>
        <br />
        <br />
        <input
          type="submit"
          value="Add Contact"
          className="btn btn-secondary"
        ></input>
        <p style={{ color: "red" }}>{error}</p>
        <p style={{ color: "green" }}>{msg}</p>
      </form>
    </div>
  );
}
