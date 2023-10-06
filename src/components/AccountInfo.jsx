import React, { useState, useEffect, useContext } from "react";
import NoteContext from "../contexts/NoteContext";

function AccountInfo() {
  const context = useContext(NoteContext);
  const { notes, userName, userEmail } = context;

  return (
    <>
      {/* <div className="d-flex position-fixed top-0 left-0">
        <div className="conainter p-4 px-5 custom-hover-effect">
          <i
            className="fa-solid fa-arrow-left-long fa-2xl"
            style={{ color: "#616161" }}
          ></i>
        </div>
      </div> */}

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div
          className="card p-4 text-center"
          style={{ width: "30rem", fontSize: "1.5rem" }}
        >
          <div className="card-header fs-3 p-0 m-0">{userName}</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{userEmail}</li>
            <li className="list-group-item">Total notes: {notes.length}</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AccountInfo;
