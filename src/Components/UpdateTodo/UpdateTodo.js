import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthContext from "../store/authCntext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./UpdateTodo.css";

const UpdateTodo = () => {
  let path = window.location.pathname;
  let params = path.slice(12);
  const authCtx = useContext(AuthContext);

  const title = useRef();
  const description = useRef();
  const complitionTime = useRef();

  const isLoggedIn = authCtx.isLoggedIn;
  const email = authCtx.userEmail;
  const history = useHistory();
  const [data, setData] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
  }
  useEffect(() => {
    axios
      .get(
        `https://todo-8adda-default-rtdb.firebaseio.com/userdata/${params}.json`
      )
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        history.push("/mainpage");
      });
  }, [params, authCtx, history]);

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .put(
        `https://todo-8adda-default-rtdb.firebaseio.com/userdata/${params}.json`,
        {
          title: title.current.value,
          description: description.current.value,
          complitionTime: complitionTime.current.value,
        }
      )
      .then(function (response) {
        history.push("/mainpage");
      })
      .catch(function (error) {
        history.push("/mainpage");
      });
  };

  const logoutHandler = () => {
    authCtx.logout();
  };

  let dtToday = new Date();
  let minDate = dtToday.toISOString().substring(0, 10);

  return (
    <div>
      <div className="mainpage_style">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <h1 className="navbar-expand-lg">UpdateTodo</h1>
            <div className="nav-style">
              {isLoggedIn && <h6 className="userEmail">{email}</h6>}
              {isLoggedIn && (
                <div>
                  <Link to="/mainpage" className="btn btn-outline-success">
                    Home
                  </Link>
                </div>
              )}
              {isLoggedIn && (
                <div className="dropdown">
                  <button type="button" className="btn btn-outline-success">
                    <FontAwesomeIcon icon={faUser} />
                  </button>
                  <div className="dropdown-content">
                    <div>
                      <Link to="/mainpage">
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={logoutHandler}
                        >
                          Log out
                        </button>
                      </Link>
                    </div>
                    <div>
                      <Link to="/resetprofile">
                        <button type="button" className="btn btn-outline-info">
                          Update Profile
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
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
            <Form.Group size="lg" controlId="description">
              <Form.Label>Description</Form.Label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
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
                Create
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
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodo;
