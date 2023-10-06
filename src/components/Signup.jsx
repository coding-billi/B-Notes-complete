import React, { useState, useEffect, useContext } from "react";
import NoteContext from "../contexts/NoteContext";
import { useHistory } from "react-router-dom";

function Signup() {
  const context = useContext(NoteContext);
  const { signup } = context;

  const history = useHistory();

  const [signupValues, setSignupValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  function onchange(e) {
    setSignupValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function onSubmit(event) {
    event.preventDefault(); // Use the native event object
    signup(signupValues);
    history.push("/login");
  }

  return (
    <>
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
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={signupValues.name}
              onChange={onchange}
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              required
              style={{
                width: "400px",
                height: "50px",
                fontSize: "1.2rem",
              }}
              minLength={3}
              maxLength={20}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={signupValues.email}
              onChange={onchange}
              className="form-control"
              id="email"
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={signupValues.password}
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
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              fontSize: "1.2rem",
              padding: "8px 17px",
            }}
          >
            Signup
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
