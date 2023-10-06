import React, { useState, useEffect, useContext } from "react";
import NoteEditor from "./NoteEditor";
import Navbar from "./Navbar";
import NoteContext from "../contexts/NoteContext";
import AccountInfo from "./AccountInfo";

function Home() {
  const context = useContext(NoteContext);
  const { accountInfoTrue, setAccountInfoTrue } = context;

  return (
    <>
      <Navbar />
      {accountInfoTrue ? <AccountInfo /> : <NoteEditor />}
    </>
  );
}

export default Home;
