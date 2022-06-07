import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Incompleted.css";
import Navbar from "../store/Navbar";
import { baseUrl } from "../store/BaseUrl";

const Incompleted = () => {
  const [todo, settodo] = useState([]);
  const [isLoading, setLoading] = useState(true);
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
  }, []);

  function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous;
  }
  const previousdate = getPreviousDay();
  const previousDateFormat = previousdate.toISOString().substring(0, 10);

  const newTodo = todo.filter(
    (todos, key) => todos.complitionTime < previousDateFormat && todos.isDone === false
  );

  return (
    <div className="mainpage_style">
      <Navbar isIncompleteActive={true} />
      <hr />
      {error}
      <div className="app">
        <div className="container">
          <h1 className="text-center mb-4">Todo List</h1>
          <table className="table">
            <thead>
              <tr>
                <th className="table-body">Title</th>
                <th className="table-body">Description</th>
                <th className="table-body">Last Date</th>
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
              {!isLoading && newTodo.length <= 0 && (
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
                      <td className="table-body">{todos.title}</td>
                      <td className="table-body">{todos.description}</td>
                      <td className="table-body">{todos.complitionTime}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Incompleted;
