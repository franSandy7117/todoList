import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./UpdateTodo.css";
import Navbar from "../store/Navbar";

const UpdateTodo = () => {
  let path = window.location.pathname;
  let params = path.slice(12);

  const title = useRef();
  const description = useRef();
  const complitionTime = useRef();

  const history = useHistory();
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
  }

  const url = `https://todo-8adda-default-rtdb.firebaseio.com/userdata/${params}.json`;

  useEffect(() => {
    axios
      .get(url)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        setError(error.message);
      });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .patch(url, {
        title: title.current.value,
        description: description.current.value,
        complitionTime: complitionTime.current.value,
      })
      .then(function (response) {
        history.push("/mainpage");
      })
      .catch(function (error) {
        setError(error.message);
      });
  };

  let dtToday = new Date();
  let minDate = dtToday.toISOString().substring(0, 10);

  const validated = data.complitionTime >= minDate;

  return (
    <div className="mainpage_style">
      <Navbar />
      <hr />
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <div>
            <h1 className="update-heading">Update</h1>
          </div>
          <hr />
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              defaultValue={data.title}
              ref={title}
            />
          </Form.Group>
          <br />
          <Form.Group size="lg" controlId="ControlTextarea">
            <Form.Label>Description</Form.Label>
            <textarea
              className="form-control"
              rows="5"
              defaultValue={data.description}
              ref={description}
            ></textarea>
          </Form.Group>
          <br />
          <Form.Group size="lg" controlId="date">
            <Form.Label>Complition Time</Form.Label>
            <Form.Control
              autoFocus
              type="date"
              min={minDate}
              defaultValue={data.complitionTime}
              disabled={!validated}
              ref={complitionTime}
            />
          </Form.Group>
          <div className="button-style">
            <Button
              block="true"
              size="lg"
              type="button"
              onClick={submitHandler}
            >
              Update
            </Button>
            <Link to="/mainpage">
              <Button
                className="btn-style"
                block="true"
                size="lg"
                type="button"
              >
                Back
              </Button>
            </Link>
          </div>
          <div>
            <p className="error-handle">{error}</p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateTodo;
