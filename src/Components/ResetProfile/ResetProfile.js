import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/authCntext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./ResetProfile.css";

const ResetProfile = () => {
  const authCtx = useContext(AuthContext);
  const userEmail = authCtx.userEmail;

  const email = useRef();
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

  useEffect(() => {
    axios
      .get(`https://todo-8adda-default-rtdb.firebaseio.com/userDetails.json`)
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
        setError("something went wrong");
      });
  }, []);

  const newTodo = data.filter((todos, key) => todos.email === userEmail);

  const submitHandler = () => {
    axios
      .patch(
        "https://todo-8adda-default-rtdb.firebaseio.com/userDetails.json",
        {
          firstName: firstName.current.value,
          lastName: lastName.current.value,
          dateofBirth: dateofBirth.current.value,
          email: email.current.value,
        }
      )
      .then(function (response) {
        history.push("/mainpage");
      })
      .catch(function (error) {
        setError("something went wrong");
      });
  };

  return (
    <div>
      <div className="content_style">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <h1 className="navbar-expand-lg">Update Profile</h1>
            <div>
              <Link to="/mainpage" className="btn btn-outline-success">
                Home
              </Link>
            </div>
          </div>
        </nav>
        <hr />
        <div className="Login">
          {!loading && (
            <Form onSubmit={handleSubmit}>
              <div>
                <h1>Update</h1>
              </div>
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
              <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  defaultValue={newTodo[0].email}
                  ref={email}
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
              <div>{error}</div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetProfile;
