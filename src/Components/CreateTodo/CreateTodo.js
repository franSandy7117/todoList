import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthContext from "../store/authCntext";
import axios from "axios";
import "./CreateTodo.css";
import Navbar from "../store/Navbar";
import { baseUrl } from "../store/BaseUrl";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [isDone] = useState(false);
  const [description, setDescription] = useState("");
  const [complitionTime, setComplitionTime] = useState("");
  const authCtx = useContext(AuthContext);
  const email = authCtx.userEmail;
  const history = useHistory();
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
  }
  let dtToday = new Date();
  let minDate = dtToday.toISOString().substring(0, 10);

  const validate = title.length > 0 && description.length > 0 && complitionTime >=minDate;

  const submitHandler = () => {
    axios
      .post(baseUrl, {
        title: title,
        description: description,
        complitionTime: complitionTime,
        email: email,
        isDone: isDone,
      })
      .then(function (response) {
        history.push("/mainpage");
      })
      .catch(function (error) {
        setError(error.message);
      });
  };

  return (
    <div className="mainpage_style">
      <Navbar isCreateActive={true} />
      <hr />
      {error}
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <div>
            <h1>Add New</h1>
          </div>
          <hr />
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group size="lg" controlId="ControlTextarea">
            <Form.Label>Description</Form.Label>
            <textarea
              className="form-control"
              rows="5"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </Form.Group>
          <br />
          <Form.Group size="lg" controlId="date">
            <Form.Label>Complition Time</Form.Label>
            <Form.Control
              autoFocus
              type="date"
              min={minDate}
              onChange={(e) => setComplitionTime(e.target.value)}
            />
          </Form.Group>
          <div className="button-style">
            <Button
              block="true"
              size="lg"
              type="button"
              disabled={!validate}
              onClick={submitHandler}
            >
              Create
            </Button>
            <Link to="/mainpage">
              <Button
                className="back-button"
                block="true"
                size="lg"
                type="button"
              >
                Back
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateTodo;
