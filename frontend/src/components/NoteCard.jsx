import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function NoteCard({ note, editNote, deleteNote }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">{note.title}</h2>
      <p>{note.description}</p>
      <div className="flex justify-end mt-2">
        <button className="text-blue-500 mr-2">
          <FaEdit onClick={() => editNote(note)} />
        </button>
        <button className="text-red-500">
          <FaTrash onClick={() => deleteNote(note)} />
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
