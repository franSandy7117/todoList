import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/authCntext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./ResetProfile.css";
import Navbar from "../store/Navbar";

const ResetProfile = () => {
  const authCtx = useContext(AuthContext);
  const userEmail = authCtx.userEmail;

  const firstName = useRef();
  const lastName = useRef();
  const dateofBirth = useRef();

  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
  }

  const url = "https://todo-8adda-default-rtdb.firebaseio.com/userDetails.json";

  useEffect(() => {
    axios
      .get(url)
      .then(function (response) {
        setLoading(false);
        const loadedData = [];
        for (const key in response.data) {
          loadedData.push({
            ...response.data[key],
            id: key,
          });
        }
        setData(loadedData);
      })
      .catch(function (error) {
        setError(error.message);
      });
  }, []);

  const newTodo = data.filter((todos, key) => todos.email === userEmail);

  const submitHandler = () => {
    const path = newTodo[0].id;
    axios
      .patch(
        `https://todo-8adda-default-rtdb.firebaseio.com/userDetails/${path}.json`,
        {
          firstName: firstName.current.value,
          lastName: lastName.current.value,
          dateofBirth: dateofBirth.current.value,
        }
      )
      .then(function (response) {
        history.push("/mainpage");
      })
      .catch(function (error) {
        setError(error.message);
      });
  };

  return (
    <div className="content_style">
      <Navbar />
      <hr />
      <div className="Login">
        {!loading && (
          <Form onSubmit={handleSubmit}>
            <h2 className="update-heading">Update Profile</h2>
            <Form.Group size="lg" controlId="first">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                defaultValue={newTodo[0].firstName}
                ref={firstName}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="last">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                defaultValue={newTodo[0].lastName}
                ref={lastName}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="date">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                autoFocus
                type="date"
                defaultValue={newTodo[0].dateofBirth}
                ref={dateofBirth}
              />
            </Form.Group>
            <div className="button-style">
              <Button
                block="true"
                size="lg"
                type="submit"
                onClick={submitHandler}
              >
                Submit
              </Button>
              <Link to="/mainpage">
                <Button
                  className="back-button-style"
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
        )}
      </div>
    </div>
  );
};

export default ResetProfile;
