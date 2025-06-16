import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import NoteModel from "../components/NoteModel";
import axios from "axios";
import { useEffect } from "react";
import NoteCard from "../components/NoteCard";
import { useAuth } from "../context/ContextProvider";
import { toast } from "react-toastify";

function Home() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();
  const [currentNote, setCurrentNote] = useState(null);
  const [filterNotes, setFilterNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fectNotes = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/note/notes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, //send token to server side
        },
      });
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fectNotes();
  }, []);

  useEffect(() => {
    if (user) {
      fectNotes();
    } else {
      setNotes([]); // clear notes if not logged in
    }
  }, [user]);

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/note/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, //send token to server side
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fectNotes();
        setIsModelOpen(false);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.log(error);
    }
  };

  const editNote = (note) => {
    setCurrentNote(note);
    setIsModelOpen(true);
    // console.log(currentNote);
  };

  const onEdit = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/note/edit/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fectNotes();
        setIsModelOpen(false);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.log(error);
    }
  };
  
  const deleteNote = async (note) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/note/delete/${note._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);

        fectNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    setFilterNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, notes]);

  return (
    <div className="filter-saturate-50 bg-gray-100 z-40 min-h-screen ">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="grid grid-cols-1 md:grid-cols-3 px-8 pt-4 gap-3">
        {isLoading ? (
          <p>Loading notes...</p>
        ) : filterNotes.length > 0 ? (
          filterNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              editNote={editNote}
              deleteNote={deleteNote}
            />
          ))
        ) : (
          <p>no notes</p>
        )}
      </div>
      <button
        onClick={() => {
          setCurrentNote(null);
          setIsModelOpen(true);
        }}
        className=" fixed right-4 bottom-4 bg-teal-500 text-white text-2xl font-bold p-4 rounded-full cursor-pointer"
      >
        +
      </button>
      {isModelOpen && (
        <>
          <div className="fixed inset-0 bg-black/80 z-40"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <NoteModel
              setIsModelOpen={setIsModelOpen}
              addNote={addNote}
              currentNote={currentNote}
              onEdit={onEdit}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
