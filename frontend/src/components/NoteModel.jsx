import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function NoteModel({ setIsModelOpen, addNote, currentNote, onEdit }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentNote) {
      onEdit(currentNote._id, title, description);
    } else {
      addNote(title, description);
    }
  };

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    }
  }, [currentNote]);

  return (
    <form
      className="
  flex flex-col gap-5 
  px-6 py-5 mt-20 
  border border-gray-400 
  bg-white rounded-2xl 
  w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] 
  m-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold">
        {currentNote ? "Edit Note" : "Add New Note"}
      </h2>
      <input
        className="border border-gray-400 py-1 px-3 rounded-xl"
        type="text"
        placeholder="New Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Note Description"
        rows={3}
        className="border border-gray-400 py-2 px-3 rounded-xl"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button
        className="border border-gray-400 py-2 px-3 rounded-2xl bg-blue-400 cursor-pointer"
        type="submit"
      >
        {currentNote ? "Edit Note" : "Add Note"}
      </button>
      <p
        className="ml-3 text-red-500 cursor-pointer"
        onClick={() => setIsModelOpen(false)}
      >
        Cancel
      </p>
    </form>
  );
}

export default NoteModel;
