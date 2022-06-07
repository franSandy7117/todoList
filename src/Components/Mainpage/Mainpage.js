import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../store/authCntext";
import "./Mainpage.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Todo from "./Todo";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../store/Navbar";
import { baseUrl } from "../store/BaseUrl";

const Mainpage = () => {
  const authCtx = useContext(AuthContext);
  const userEmail = authCtx.userEmail;
  const [todo, settodo] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();
  const [allUserDetails, setallUserDetails] = useState([{}]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(function (response) {
        setLoading(false);
        const loadedData = [];
        for (const key in response.data) {
          loadedData.push({
            ...response.data[key],
            id: key,
          });
        }
        settodo(loadedData);
      })
      .catch(function (error) {
        setError(error.message);
      });

    axios
      .get("https://todo-8adda-default-rtdb.firebaseio.com/userDetails.json")
      .then(function (response) {
        const loadedData = [];
        for (const key in response.data) {
          loadedData.push({
            ...response.data[key],
            id: key,
          });
        }
        setallUserDetails(loadedData);
      });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const filteredDetails = allUserDetails.filter(
        (user, key) => user.email === userEmail
      );
      authCtx.saveUserName(filteredDetails[0].firstName);
    }
  }, [isLoading]);

  function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous;
  }
  const previousdate = getPreviousDay();

  const yesterdayDate = previousdate.toISOString().substring(0, 10);

  const markTodo = (key, index) => {
    if (todo[key].complitionTime >= yesterdayDate) {
      const newtodo = [...todo];
      newtodo[key].isDone = true;
      settodo(newtodo);
      axios
        .patch(
          `https://todo-8adda-default-rtdb.firebaseio.com/userdata/${index}.json`,
          {
            isDone: true,
          }
        )
        .then(function (response) {
          history.push("/mainpage");
        })
        .catch(function (error) {
          setError(error.message);
        });
    }
  };

  const removeTodo = (key, index) => {
    const newtodo = [...todo];
    newtodo.splice(key, 1);
    settodo(newtodo);
    axios
      .delete(
        `https://todo-8adda-default-rtdb.firebaseio.com/userdata/${index}.json`
      )
      .then(function (response) {
        history.push("/mainpage");
      })
      .catch(function (error) {
        setError(error.message);
      });
  };

  return (
    <div className="mainpage_style">
      <Navbar />
      <hr />
      <div className="app">
        <div className="container">
          <h1 className="text-center mb-4">Todo List</h1>
          <div>
            <Card>
              <Card.Body>
                <Todo
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                  isLoading={isLoading}
                />
              </Card.Body>
            </Card>
          </div>
        </div>
        <div>
          <p className="error-handle">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
