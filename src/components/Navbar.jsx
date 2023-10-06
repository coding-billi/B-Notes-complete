import React, { useState, useEffect, useContext } from "react";
import NoteContext from "../contexts/NoteContext";
import logo from "../assets/LOGO.png";
import { useHistory } from "react-router-dom";

function Navbar() {
  const context = useContext(NoteContext);

  const history = useHistory();

  const {
    notes,
    selectedNote,
    setSelectedNote,
    handleNewNote,
    deleteNote,
    userName,
    setAccountInfoTrue,
  } = context;

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength - 3) + "...";
    }
  }

  function updateSelectedNote(id) {
    setSelectedNote(id);
    setAccountInfoTrue(false);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.reload();
    history.push("/login");
  }

  function handleAccountInfo() {
    setAccountInfoTrue(true);
    setSelectedNote("");
  }

  if (!notes) {
    return <div>Loading...</div>;
  }

  const noteElements = notes.map((note) => {
    return (
      <button
        className={`list-group-item list-group-item-action py-3 lh-tight rounded z-1 ${
          selectedNote === note._id && "active"
        }`}
        key={note._id}
        aria-current="true"
        style={{ transition: "0.2s ease" }}
        onClick={() => updateSelectedNote(note._id)}
      >
        <div className="d-flex w-100 align-items-center justify-content-between">
          <strong className="mb-1">{truncateText(note.title, 30)}</strong>
          <small>{note.date.substring(0, 10)}</small>
        </div>
        <div className="py-3 lh-tight rounded my-list-item border-0">
          {truncateText(note.description, 100)}
        </div>
        <div className="container d-flex justify-content-end p-0">
          <i
            className={`fa-solid fa-trash m-0 p-2`}
            onClick={() => deleteNote(note._id)}
            // style={{ color: "#cc0f0f" }}
          ></i>
        </div>
      </button>
    );
  });

  return (
    <div
      className="position-fixed top-0 start-0 bottom-0 bg-white border border-1 border-gray shadow px-1"
      style={{ width: "380px" }}
    >
      <div className="container d-flex align-items-center justify-content-between border-bottom">
        <a
          href="/"
          className="d-flex align-items-center p-3 link-dark text-decoration-none"
        >
          <img src={logo} className="me-3" width={50} alt="" />
          <span className="fs-5 fw-semibold">B-Notes</span>
        </a>

        <i
          className="fa-solid fa-plus p-3 fa-lg"
          style={{ color: "#4a4545" }}
          onClick={handleNewNote}
        ></i>
      </div>
      <div
        className="list-group list-group-flush mt-2"
        style={{
          maxHeight: "calc(100vh - 100px)",
          overflowY: "auto",
          paddingBottom: "70px",
        }}
      >
        {noteElements}
      </div>
      <div
        className="container position-fixed bottom-0 bg-white start-0 custom-shadow z-3"
        style={{ width: "380px" }}
      >
        <div className="dropdown my-3 z-index">
          <button
            className="btn btn-warning dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {userName}
          </button>
          <ul className="dropdown-menu my-2 shadow rounded">
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={handleAccountInfo}>
                Account Info
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
