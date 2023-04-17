import React, {useContext} from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, useNotes } = context;
  return (
    <div className="row my-3">
      <h3>Your notes</h3>
      {notes.map((note) => {
        return <NoteItem key={note._id}note={note}/>
      })}
    </div>
  );
};

export default Notes;