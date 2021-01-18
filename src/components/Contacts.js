import { useState, useEffect } from "react";
import contactFacade from "../facades/contactFacade";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import printError from "../utils/error";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  let { path, url } = useRouteMatch();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    contactFacade
      .getAllContacts()
      .then((res) => setContacts([...res]))
      .catch((err) => printError(err, setError));
  }, [msg]);

  const deleteContact = (e) => {
    e.preventDefault();

    contactFacade
      .deleteContact(e.target.value)
      .then((res) => setMsg(`${res.name} has been deleted`));
  };

  return (
    <div className="container">
      <p style={{ color: "red" }}>{error}</p>
      <table className="table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Jobtitle</th>
            <th>Phone</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.company}</td>
              <td>{contact.jobtitle}</td>
              <td>{contact.phone}</td>
              <td>
                <Link to={`/edit/${contact.id}`}>
                  <Button variant="primary">Edit</Button>
                </Link>
              </td>
              <td>
                {" "}
                <Button
                  value={contact.id}
                  variant="danger"
                  onClick={deleteContact}
                >
                  Delete
                </Button>
              </td>
              <td>
                <Link to={`/add-opp/${contact.id}`}>
                  <Button variant="success">Add Opportunity</Button>
                </Link>
              </td>
              <td>
                <Link to={`/get-opp/${contact.id}`}>
                  <Button variant="info">Get Opportunities</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
