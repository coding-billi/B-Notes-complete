import React, { useState, useEffect, useContext } from "react";
import NoteContext from "../contexts/NoteContext";

function NoteEditor() {
  const context = useContext(NoteContext);
  const { notes, addNote, selectedNote, setSelectedNote, newNote, editNote } =
    context;

  const [noteValues, setNoteValues] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (selectedNote) {
      // Find the selected note in the notes array
      const selectedNoteData = notes.find((note) => note._id === selectedNote);

      // Check if selectedNoteData exists before updating the state
      if (selectedNoteData) {
        // Update the state with the values of the selected note
        setNoteValues({
          title: selectedNoteData.title,
          description: selectedNoteData.description,
          tag: selectedNoteData.tag,
        });
      } else {
        // If selectedNoteData is undefined, it means the note was deleted or not found
        // Deselect the note and reset the form
        setSelectedNote("");
        setNoteValues({
          title: "",
          description: "",
        });
      }
    } else {
      // If no note is selected, reset the form
      setNoteValues({
        title: "",
        description: "",
      });
    }
  }, [selectedNote, notes]);

  function getValue(e) {
    const value = e.target.value;
    const name = e.target.name;
    setNoteValues((prev) => ({ ...prev, [name]: value }));
  }

  function addAnimation() {
    setAnimation("fa-flip");
    setTimeout(() => {
      setAnimation("");
    }, 1100);
  }

  function handleAddNote() {
    addAnimation();
    setSelectedNote("");
    addNote(noteValues);
    setNoteValues({
      title: "",
      description: "",
      tag: "",
    });
  }

  function handleEditNote() {
    editNote(noteValues, selectedNote);
    addAnimation();
  }

  const [animation, setAnimation] = useState("");

  return (
    <>
      {selectedNote || newNote ? (
        <div
          className="d-flex flex-column h-100"
          style={{ marginLeft: "400px", marginRight: "60px" }}
        >
          <input
            type="text"
            className="form-control my-0 py-4 fs-4 shadow-none rounded-0 border-0 border-bottom"
            placeholder="Title"
            onChange={getValue}
            name="title"
            value={noteValues.title}
          />
          <textarea
            className="form-control flex-fill border-0 my-0 shadow-none fs-5"
            style={{ resize: "none" }}
            placeholder="Description"
            onChange={getValue}
            name="description"
            value={noteValues.description}
          />
          <div className="position-fixed top-0 end-0 bottom-0 bg-white px-1 d-flex flex-column">
            <i
              className={`fa-solid fa-check fa-2xl my-5 p-3 ${animation}`}
              style={{ color: "#15d1ab" }}
              // onClick={handleEditNote}
              onClick={newNote ? handleAddNote : handleEditNote}
            ></i>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default NoteEditor;
