import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TimeNotArrived.css";
import Navbar from "../store/Navbar";
import { baseUrl } from "../store/BaseUrl";

const TimeNotArrived = () => {
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

  const d = new Date();
  
  const todayDate = d.toISOString().substring(0, 10);

  const newTodo = todo.filter(
    (todos, key) => todos.complitionTime >= todayDate && todos.isDone === false
  );

  return (
    <div className="mainpage_style">
      <Navbar isTimeActive={true} />
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
              {!isLoading && newTodo.length < 1 && (
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
  );
};

export default TimeNotArrived;
