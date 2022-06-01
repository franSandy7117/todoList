import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import AuthContext from "../store/authCntext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./Todo.css";

const Todo = (props) => {
  const todo = props.todo;
  const markTodo = props.markTodo;
  const removeTodo = props.removeTodo;
  const isLoading = props.isLoading;
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const presentDate = new Date();
  const newDate = `${presentDate.getFullYear()}-0${
    presentDate.getMonth() + 1
  }-0${presentDate.getDate()}`;
  return (
    <div className="todo">
      <table className="table">
        <thead>
          <tr>
            <th className="title-width">Title</th>
            <th className="description-width">Description</th>
            <th className="before-width">Complete before</th>
            <th className="delete-width">Status</th>
            <th className="options-width">Options</th>
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
          {!isLoading && !isLoggedIn && (
            <tr>
              <td className="loading-row" colSpan="6">
                No Todo List found
              </td>
            </tr>
          )}
          {isLoggedIn && todo.length < 1 && (
            <tr>
              <td className="loading-row" colSpan="6">
                Create New Todo
              </td>
            </tr>
          )}
          {!isLoading &&
            isLoggedIn &&
            todo.length > 0 &&
            todo.map((todos, key) => {
              return (
                <tr key={key}>
                  <td className="title-width">{todos.title}</td>
                  <td className="description-width">{todos.description}</td>
                  <td className="before-width">{todos.complitionTime}</td>
                  <td className="delete-width">
                    {todos.isDone ? "Completed" : "Incompleted"}
                  </td>
                  <td className="options-width">
                    {todos.complitionTime >= newDate && (
                      <Button
                        type="button"
                        variant="outline-success"
                        onClick={() => markTodo(key, todos.id)}
                      >
                        ✓
                      </Button>
                    )}
                    {todos.complitionTime >= newDate && (
                      <Link to={"updatetodo/" + todos.id}>
                        <Button type="button" variant="outline-info">
                          Edit
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="outline-danger"
                      onClick={() => removeTodo(key, todos.id)}
                    >
                      ✕
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Todo;
