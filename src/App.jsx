import React from "react";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteState from "./contexts/NoteState";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Router>
        <NoteState>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </NoteState>
      </Router>
    </>
  );
}

export default App;
