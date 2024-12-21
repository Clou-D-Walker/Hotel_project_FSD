// import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   CircularProgress,
//   Snackbar,
//   Alert,
// } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/auth/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const res = JSON.parse(xhr.responseText);
          dispatch({ type: "LOGIN_SUCCESS", payload: res.details });
          navigate("/");
        } else {
          const err = JSON.parse(xhr.responseText);
          dispatch({ type: "LOGIN_FAILURE", payload: err });
        }
      }
    };

    const data = JSON.stringify(credentials); // Convert credentials to JSON string
    xhr.send(data);
  };

  return (
    <section className="container forms">
      <div className="form login">
        <div className="form-content">
          <header>Login</header>

          <form action="#">
            <div className="field input-field">
              <input
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
                className="lInput"
              />
            </div>

            <div className="field input-field">
              <input
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
                className="lInput"
              />
            </div>

            <div className="field button-filed">
              <button
                disabled={loading}
                onClick={handleClick}
                className="lButton"
              >
                Login{" "}
              </button>
              {error && <span>{error.message}</span>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
