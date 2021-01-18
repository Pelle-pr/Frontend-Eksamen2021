import React, { useState } from "react";
import { useParams } from "react-router-dom";
import facade from "../facades/opportunityFacade";
import printError from "../utils/error";
import DatePicker from "react-date-picker";

export default function AddOpp() {
  const [date, setDate] = useState(new Date());
  const [opportunity, setOpportunity] = useState({
    name: "",
    amount: "",
    closeDate: date,
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  let id = useParams().id;

  const handleSubmit = (e) => {
    e.preventDefault();
    facade
      .addOpportunity(id, opportunity)
      .then((res) => setMsg(`New Opportunity has been added to Contact #${id}`))
      .catch((err) => printError(err, setError));
  };

  const handleChange = (e) => {
    setOpportunity({ ...opportunity, [e.target.name]: e.target.value });
    setError("");
    setMsg("");
  };

  return (
    <div>
      <br></br>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <label>Name</label>
        <br />
        <input
          onChange={handleChange}
          value={opportunity.name}
          name="name"
          required="required"
        ></input>
        <br />
        <br />
        <label>Amount</label>
        <br />
        <input
          onChange={handleChange}
          value={opportunity.email}
          name="amount"
          required="required"
        ></input>
        <br />
        <br />
        <label>Close Date</label>
        <br />
        <DatePicker
          onChange={setDate}
          value={date}
          format="y-MM-dd"
        ></DatePicker>

        <br />
        <br />
        <input
          type="submit"
          value="Add Opportunity"
          className="btn btn-success"
        ></input>
        <p style={{ color: "red" }}>{error}</p>
        <p style={{ color: "green" }}>{msg}</p>
      </form>
    </div>
  );
}
