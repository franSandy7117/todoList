import React, { useEffect, useState, useContext } from "react";
import "./Mainpage.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../store/authCntext";
import Todo from "./Todo";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../store/Navbar";

const Mainpage = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const [todo, settodo] = React.useState([{}]);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://todo-8adda-default-rtdb.firebaseio.com/userdata.json")
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
        setError("Something went wrong");
      });
  }, []);

  const markTodo = (key, index) => {
    const presentDate = new Date();
    const newDate = `${presentDate.getFullYear()}-0${
      presentDate.getMonth() + 1
    }-0${presentDate.getDate()}`;
    if (todo[key].complitionTime >= newDate) {
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
          setError("Something went wrong");
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
        setError("Something went wrong");
      });
  };

  return (
    <div>
      <div className="mainpage_style">
        <Navbar isLoggedIn={isLoggedIn} />
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
          <div>{error}</div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
