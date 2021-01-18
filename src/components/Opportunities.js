import { useState, useEffect } from "react";
import facade from "../facades/opportunityFacade";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import printError from "../utils/error";
import { Link, useParams } from "react-router-dom";

export default function Opportunities() {
  const [opps, setOpps] = useState([]);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const id = useParams().id;

  useEffect(() => {
    facade
      .getOpps(id)
      .then((res) => setOpps([...res]))
      .catch((err) => printError(err, setError));
  }, [msg]);

  return (
    <div className="container">
      <p style={{ color: "red" }}>{error}</p>
      <table className="table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Close Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {opps.map((opp) => (
            <tr key={opp.id}>
              <td>{opp.name}</td>
              <td>{opp.amount}</td>
              <td>{opp.closeDate}</td>
              <td>{opp.status}</td>
              <td>
                <Link to={`/add-task/${opp.id}`}>
                  <Button variant="success">Add Task</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
