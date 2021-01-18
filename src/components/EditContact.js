import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import contactFacade from "../facades/contactFacade";
import printError from "../utils/error";

export default function EditContact() {
  const [contact, setContact] = useState({
    id: "",
    name: "",
    email: "",
    company: "",
    jobtitle: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  let id = useParams();
  useEffect(() => {
    contactFacade
      .getContactById(id.id)
      .then((res) => setContact({ ...res }))
      .catch((err) => printError(err, setError));
  }, [msg]);

  const handleSubmit = (e) => {
    e.preventDefault();
    contactFacade
      .editContact(contact)
      .then((res) => setMsg(`Contact with ID: ${contact.id} has been changed`))
      .catch((err) => printError(err, setError));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setContact({ ...contact, [e.target.name]: e.target.value });
    setError("");
    setMsg("");
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
        <input type="submit" value="Edit" className="btn btn-secondary"></input>
        <p style={{ color: "red" }}>{error}</p>
        <p style={{ color: "green" }}>{msg}</p>
      </form>
    </div>
  );
}
