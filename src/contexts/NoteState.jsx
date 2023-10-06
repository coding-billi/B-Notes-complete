import NoteContext from "./NoteContext";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function NoteState(props) {
  const history = useHistory();

  //below are authorization and error handling states as well as the states for holding notes
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState();
  const [newNote, setNewNote] = useState("");
  const [currentAuthToken, setCurrentAuthToken] = useState("");
  const [accountInfoTrue, setAccountInfoTrue] = useState(false);
  const [error, setError] = useState(false);

  // below is account info states
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // below are some variables for ease, and functionality
  let host = "https://b-notes.cyclic.app";
  let localStorageVar = localStorage.getItem("token");

  // below are some functions for rendering certain components and ither missclenious stuff
  function handleNewNote() {
    setSelectedNote("");
    setNewNote("new-note");
    setAccountInfoTrue(false);
  }

  const redirectToHome = () => {
    history.push("/");
  };

  // below are api handling functions and for making requests to provide and fetch data from my own api

  // function to login
  async function login(givenData) {
    if (givenData.email === "" || givenData.password === "") return; // check if values are filled or not

    // save the info to be sent into the body of the request
    const userInfo = {
      email: givenData.email,
      password: givenData.password,
    };

    const response = await fetch(`${host}/api/auth/login`, {
      // now fecthing data from the api
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    // below try catch statements were not working because the history.push() hook from react router dom package doesnt work with conditional statemenst properly
    if (!response.ok) {
      setError(true);
      return;
    } else {
      const data = await response.json();
      setCurrentAuthToken(data.token); // i am using a state also for the auth token for extra funccationality and reliablity i tested it and its better to keep it
      localStorage.setItem("token", data.token);
      setError(false); // this state checks if the error is true or false when signing up if true it will display a alert on the login page that the user has input invalid data
      redirectToHome(); // this function contains the history.push() hook to redirect to home the page
    }
  }

  // function to fetch notes
  async function fetchAllNotes() {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        // now fecthing data from the api
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      setNotes(data); // saving the data to the notes state which is an array of objects each object is a note
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]); // if error than empty the notes state to avoid errors
    }
  }

  // function to fetch user info
  async function getUserInfo() {
    try {
      const response = await fetch(`${host}/api/auth/getuser`, {
        // now fecthing data from the api
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      setUserName(data.name); // setting the userName to display in the ui in the account nfo section
      setUserEmail(data.email); // setting the email to display in the ui in the account nfo section
    } catch (error) {
      console.error("Error fetching info:", error);
    }
  }

  // this useEffect runs when ever the auth token changes i.e: when ever a user logs out or logs in and when the localStorage changes
  // __________________________________________________________________________________________________________________________________________
  // | !!!! dont move the useEffect up the code tree or down it is placed here because synchronousy issues and scope issues of other functions |
  // |_________________________________________________________________________________________________________________________________________|
  useEffect(() => {
    if (localStorageVar) {
      // if user has auth token than the following code will be ran if not then user needs to get auth token by logging in
      fetchAllNotes(); // this will call the fetchAllNotes() function to populate the notes state and be displayed in the navbar
      getUserInfo(); // get user info on page load
    } else {
      history.push("/login"); // this will redirect to login page if user doesnt have auth token in the localStorage
    }
  }, [currentAuthToken, localStorageVar]);

  // function to signup
  async function signup(givenData) {
    if (givenData.email === "" || givenData.password === "") return; // check if values are filled or not

    // save the info to be sent into the body of the request
    const userInfo = {
      name: givenData.name, // note that name is also required which is not required when logging in
      email: givenData.email,
      password: givenData.password,
    };

    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        // now fecthing data from the api
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const data = await response.json();
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  // function to add notes
  async function addNote(givenData) {
    if (givenData.title === "" || givenData.description === "") return; // check if values are filled or not

    // save the info to be sent into the body of the request
    const note = {
      title: givenData.title, // note this is the notes info which requires a title and a description
      description: givenData.description,
    };

    try {
      const response = await fetch(`${host}/api/notes/addnewnote`, {
        // now fecthing data from the api
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(note),
      });

      // const responseData = await response.json(); // this is not used but i still keep it for readablity and avoid confusion
      setNewNote(
        ""
      ); /* this state keeps track that if a new-note is made or not in the navbar component there is a button
      to make new notes the rendering relies on this state it has either two values either new-note or ""   */
    } catch (error) {
      console.error("Error adding note:", error);
    }
    fetchAllNotes(); // calling this function get the new notes which contain the newly added note to be displayed otherwise the page will need to be reloaded
  }

  // function to delete notes
  async function deleteNote(id) {
    // it takes a id of the note you want to delete
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    fetchAllNotes();
  }

  // function to edit notes
  async function editNote(givenData, id) {
    // this takes an id as well as the givenData to edit the note
    if (givenData.title === "" || givenData.description === "") return; // check if values are filled or not

    const note = {
      title: givenData.title,
      description: givenData.description,
    };

    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(note),
      });
      // const responseData = await response.json();
    } catch (error) {
      console.error("Error adding note:", error);
    }
    fetchAllNotes();
  }

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        selectedNote,
        setSelectedNote,
        handleNewNote,
        newNote,
        addNote,
        editNote,
        deleteNote,
        login,
        signup,
        setCurrentAuthToken,
        currentAuthToken,
        userName,
        userEmail,
        accountInfoTrue,
        setAccountInfoTrue,
        error,
        setError,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}
