import React, { useState, useEffect, useContext } from "react";
import NoteContext from "../contexts/NoteContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const context = useContext(NoteContext);
  const { login, error } = context;

  const history = useHistory();

  const [loginValues, setLoginValues] = useState({ email: "", password: "" });

  function onchange(e) {
    setLoginValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function onSubmit(event) {
    event.preventDefault();
    login(loginValues);
  }

  return (
    <>
      {error && (
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <i
            className="fa-solid fa-circle-exclamation bi flex-shrink-0 me-2"
            style={{ color: "#db1414" }}
          ></i>
          <div>ERROR: Invalid User Data</div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          marginTop: "-100px",
        }}
      >
        <form
          className="d-flex align-items-center flex-column"
          style={{ fontSize: "1.2rem" }}
          onSubmit={onSubmit}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={loginValues.email}
              onChange={onchange}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
              style={{
                width: "400px",
                height: "50px",
                fontSize: "1.2rem",
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={loginValues.password}
              onChange={onchange}
              required
              style={{
                width: "400px",
                height: "50px",
                fontSize: "1.2rem",
              }}
              minLength={4}
              maxLength={20}
            />
          </div>
          <div className="container d-flex justify-content-around">
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                fontSize: "1.2rem",
                padding: "8px 17px",
              }}
            >
              Login
            </button>
            <Link to="/signup">
              <button className="btn">Create Acount</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
