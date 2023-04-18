import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  const host = 'http://localhost:3001'

  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  //Add a note
  const addNote = async ({title, description, tag}) => {

    const url = `${host}/api/notes/addnote`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxY2FkNjNlMWEwNDAxNGM1ZDE0NGQxIn0sImlhdCI6MTY3OTc2MjQ3N30.kPS2H2lEq00drWXNJkNrwDBV8Sla0acsA72PZcWPFu4"
      },
    
      body: JSON.stringify({title, description, tag}), 
    });
    const newNote = await response.json()
    setNotes(notes.concat(newNote))
    
  };

  //Get all notes
  const getNotes = async () => {
    
    const url = `${host}/api/notes/fetchallnotes`
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxY2FkNjNlMWEwNDAxNGM1ZDE0NGQxIn0sImlhdCI6MTY3OTc2MjQ3N30.kPS2H2lEq00drWXNJkNrwDBV8Sla0acsA72PZcWPFu4"
      },
    });
    const allNotes = await response.json();
    setNotes(allNotes);
    
  };

  //Delete a note
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxY2FkNjNlMWEwNDAxNGM1ZDE0NGQxIn0sImlhdCI6MTY3OTc2MjQ3N30.kPS2H2lEq00drWXNJkNrwDBV8Sla0acsA72PZcWPFu4"
      },
    });
    const json = await response.json()
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxY2FkNjNlMWEwNDAxNGM1ZDE0NGQxIn0sImlhdCI6MTY3OTc2MjQ3N30.kPS2H2lEq00drWXNJkNrwDBV8Sla0acsA72PZcWPFu4"
      },
    
      body: JSON.stringify({title, description, tag}), 
    });
    const json = await response.json();
    
    let newNotes = JSON.parse(JSON.stringify(notes))
    // update notes in the front-end
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break
      }
    }
    setNotes(newNotes)
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;


