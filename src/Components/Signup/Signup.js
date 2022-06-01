import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../store/authCntext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Signup.css";
import axios from "axios";

const Signup = () => {
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateofBirth, setDateofBirth] = useState("");
  const history = useHistory();
  const [error, setError] = useState(null);

  function validateForm() {
    return email.length > 0 && password.length > 5;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const submitHandler = () => {
    const userLoginData = JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true,
    });
    const userDetails = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      dateofBirth: dateofBirth,
      email: email,
    });

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBtalPDDFBNpI0wLvZfC7exMoLQhLSu9QA",
        userLoginData,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then(function (response) {
        authCtx.login(response.data.idToken);
        authCtx.useemail(response.data.email);
        history.push("/mainpage");
      })
      .catch(function (error) {
        setError("Something went wrong");
      });

    axios.post(
      "https://todo-8adda-default-rtdb.firebaseio.com/userDetails.json",
      userDetails,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
  };

  return (
    <div className="content_style">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <h1 className="navbar-expand-lg">Sign Up Page</h1>
          <div>
            <Link to="/login" className="btn btn-outline-success">
              Login
            </Link>
          </div>
        </div>
      </nav>
      <hr />
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <div>
            <h1>Sign Up</h1>
          </div>
          <Form.Group size="lg" controlId="first">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="last">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="date">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              autoFocus
              type="date"
              onChange={(e) => setDateofBirth(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="button-style">
            <Button
              block="true"
              size="lg"
              type="submit"
              onClick={submitHandler}
              disabled={!validateForm()}
            >
              Signup
            </Button>
          </div>
          <div>{error}</div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
