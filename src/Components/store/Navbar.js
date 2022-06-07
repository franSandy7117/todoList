import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import AuthContext from "../store/authCntext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHouseUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = (props) => {
  const authCtx = useContext(AuthContext);
  const username = authCtx.userName;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <h1 className="navbar-expand-lg">Todos</h1>
          <div>
            <Link to="/mainpage" className="btn btn-outline-success">
              <FontAwesomeIcon icon={faHouseUser} />
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="navbar-li">
                <Link
                  to="/completed"
                  className={props.isCompletedactive ? "nav" : "nav-link"}
                >
                  Completed
                </Link>
              </li>
              <li className="navbar-li">
                <Link
                  to="/incompleted"
                  className={props.isIncompleteActive ? "nav" : "nav-link"}
                >
                  Incompleted
                </Link>
              </li>
              <li className="navbar-li">
                <Link
                  to="/timenotarrived"
                  className={props.isTimeActive ? "nav" : "nav-link"}
                >
                  Yet to Complete
                </Link>
              </li>
              <li className="navbar-li">
                <Link
                  to="/createtodo"
                  className={props.isCreateActive ? "nav" : "nav-link"}
                >
                  Createtodo
                </Link>
              </li>
            </ul>
          </div>
          <h6>{username}</h6>
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
        </div>
      </nav>
    </>
  );
};

export default Navbar;
