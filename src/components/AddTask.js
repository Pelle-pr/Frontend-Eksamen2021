import { useState, useEffect } from "react";
import contactFacade from "../facades/contactFacade";
import "bootstrap/dist/css/bootstrap.min.css";
import printError from "../utils/error";
import { useParams } from "react-router-dom";

export default function AddTask() {
  const [task, setTask] = useState({
    title: "",
    comment: "",
    dueDate: "",
    taskType: "",
    taskStatus: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState([]);
  const [type, setType] = useState([]);
  let id = useParams().id;

  useEffect(() => {
    contactFacade
      .getTaskStatus()
      .then((res) => setStatus([...res]))
      .catch((err) => printError(err, setError));
  }, [msg]);

  useEffect(() => {
    contactFacade
      .getTaskType()
      .then((res) => setType([...res]))
      .catch((err) => printError(err, setError));
  }, [msg]);

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    setTask({ ...task, [e.target.name]: e.target.value });
    setError("");
    setMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    contactFacade
      .addTask(id, task)
      .then((res) => setMsg(`Task for #${id} has been added`))
      .catch((err) => printError(err, setError));
  };

  return (
    <div>
      <br></br>
      <form
        onChange={handleChange}
        onSubmit={handleSubmit}
        style={{ textAlign: "center" }}
      >
        <label>Title</label>
        <br />
        <input
          onChange={handleChange}
          value={task.title}
          name="title"
          required="required"
        ></input>
        <br />
        <br />
        <label>Comment</label>
        <br />
        <input
          onChange={handleChange}
          value={task.comment}
          name="comment"
          required="required"
        ></input>
        <br />
        <br />
        <label>Due Date</label>
        <br />
        <input
          onChange={handleChange}
          value={task.dueDate}
          name="dueDate"
          required="required"
        ></input>
        <br />
        <br />
        <label>Task Status:</label>
        <br />
        <select onChange={handleChange}>
          {status.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
        <br />
        <br />
        <label>Task Type:</label>
        <br />
        <select>
          {type.map((t) => (
            <option
              onChange={handleChange}
              name="taskType"
              key={t.id}
              value={t.name}
            >
              {t.name}
            </option>
          ))}
        </select>
        <br />
        <br />
        <input
          type="submit"
          value="Add Task"
          className="btn btn-secondary"
        ></input>
        <p style={{ color: "red" }}>{error}</p>
        <p style={{ color: "green" }}>{msg}</p>
      </form>
    </div>
  );
}
