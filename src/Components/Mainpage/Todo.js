import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import AuthContext from "../store/authCntext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./Todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

const Todo = (props) => {
  const todo = props.todo;
  const markTodo = props.markTodo;
  const removeTodo = props.removeTodo;
  const isLoading = props.isLoading;
  const authCtx = useContext(AuthContext);
  const savedEmail = authCtx.userEmail;

  const newTodo = todo.filter((todos, key) => todos.email === savedEmail);

  function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous;
  }
  const previousdate = getPreviousDay();
  const yesterdayDate = previousdate.toISOString().substring(0, 10);

  let dtToday = new Date();
  let striTDate = dtToday.toISOString().substring(0, 10);

  return (
    <div className="todo">
      <table className="table">
        <thead>
          <tr>
            <th className="title-width">Title</th>
            <th className="description-width">Description</th>
            <th className="before-width">Complete before</th>
            <th className="status-width">Status</th>
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
                  <td className="title-width">{todos.title}</td>
                  <td className="description-width">{todos.description}</td>
                  <td className="before-width">{todos.complitionTime}</td>
                  <td className="status-width">
                    {todos.complitionTime < yesterdayDate && !todos.isDone
                      ? "Incompleted"
                      :todos.complitionTime <= yesterdayDate && todos.isDone
                      ? "Completed"
                      : todos.complitionTime >= striTDate && todos.isDone
                      ? "Completed"
                      : "Yet to Complete"
                    }
                  </td>
                  <td className="options-width">
                    {todos.complitionTime >= yesterdayDate && !todos.isDone && (
                      <Button
                        type="button"
                        variant="outline-success"
                        onClick={() => markTodo(key, todos.id)}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                    )}
                    {todos.complitionTime >= yesterdayDate && (
                      <Link to={"updatetodo/" + todos.id}>
                        <Button type="button" variant="outline-info">
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                      </Link>
                    )}
                    <Button
                      type="button"
                      variant="outline-danger"
                      onClick={() => removeTodo(key, todos.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
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
