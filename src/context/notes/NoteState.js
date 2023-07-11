import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  // Get all note
  const getNotes = async () => {
    //  API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NDk5NmMwMjRjMmY3MWJjNjJlYmQxZDcifX0sImlhdCI6MTY4Nzg2MzUwN30.MocbHyQGqdbKbLmuWjiouOrXHs0GBRxJcMOclpwU5uE",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    console.log("Adding a note");
    //  API call
    const response   = await fetch(`${host}/api/notes/addnotes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NDk5NmMwMjRjMmY3MWJjNjJlYmQxZDcifX0sImlhdCI6MTY4Nzg2MzUwN30.MocbHyQGqdbKbLmuWjiouOrXHs0GBRxJcMOclpwU5uE",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json;
    console.log(json);
  

    // note logic
    const note = {
      _id: "64a79ggg8a99c0887srdst2fea61b118",
      title: title,
      description: description,
      tag: tag,
      date: "2023-07-07T04:46:33.164Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  // Delete a note
  const deleteNote = async (id) => {
    // API call -----> Theres a problem in delete end point need to fix it.
    // const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "auth-token":
    //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NDk5NmMwMjRjMmY3MWJjNjJlYmQxZDcifX0sImlhdCI6MTY4Nzg2MzUwN30.MocbHyQGqdbKbLmuWjiouOrXHs0GBRxJcMOclpwU5uE",
    //   },
    // });
    // const json = await response.json();
    // console.log(json);

    // client logic
    console.log("Deleting a note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NDk5NmMwMjRjMmY3MWJjNjJlYmQxZDcifX0sImlhdCI6MTY4Nzg2MzUwN30.MocbHyQGqdbKbLmuWjiouOrXHs0GBRxJcMOclpwU5uE",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);


    // logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
       break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
