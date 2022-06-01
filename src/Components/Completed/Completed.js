import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../store/authCntext";
import "./Completed.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../store/Navbar";

const Completed = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const [todo, settodo] = React.useState([{}]);
  const [isLoading, setLoading] = useState(true);
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

  const newTodo = todo.filter((todos, key) => todos.isDone);

  return (
    <div>
      <div className="mainpage_style">
        <Navbar isLoggedIn={isLoggedIn} isCompletedactive={true} />
        <hr />
        {error}
        <div className="app">
          <div className="container">
            <h1 className="text-center mb-4">Todo List</h1>
            <table className="table">
              <thead>
                <tr>
                  <th className="table-width">Title</th>
                  <th className="table-width">Description</th>
                  <th className="table-width">Complete before</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td className="loading-row" colSpan="6">
                      Loading...
                    </td>
                  </tr>
                )}
                {!isLoading && todo.length <= 0 && (
                  <tr>
                    <td className="loading-row" colSpan="6">
                      No Todo List found
                    </td>
                  </tr>
                )}
                {!isLoading &&
                  newTodo.length > 0 &&
                  newTodo.map((todos, key) => {
                    return (
                      <tr key={key}>
                        <td className="table-width">{todos.title}</td>
                        <td className="table-width">{todos.description}</td>
                        <td className="table-width">{todos.complitionTime}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Completed;
