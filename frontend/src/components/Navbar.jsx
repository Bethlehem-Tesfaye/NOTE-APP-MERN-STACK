import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar({ setSearchTerm, searchTerm }) {
  const { user, login } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 700) setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = () => {
    toast.success("User Logged out");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    login(null); // also reset the context
    navigate("/");
  };

  return (
    <div className="bg-neutral-700 text-white w-full">
      {/* Top bar */}
      <div className="flex justify-between items-center py-2 px-4">
        <p className="text-white text-sm md:text-xl lg:text-2xl">NoteApp</p>

        <input
          type="text"
          placeholder="Search notes"
          className="bg-cyan-950 py-2 px-3 text-white  rounded-md w-80 hidden min-[465px]:block"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Hamburger for small screens */}
        <div className="flex gap-2">
          <div className="border rounded-full h-8 w-8 text-center flex items-center justify-center">
            <p className="text-xl">{user ? user.name[0] : "G"}</p>
          </div>

          <button
            className="md:hidden text-xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Menu buttons (visible on md and up) */}
        <div className="hidden md:flex gap-5">
          {!user ? (
            <>
              <button className="border py-1 px-2 rounded-md bg-emerald-600 cursor-pointer">
                <Link to="/login">Login</Link>
              </button>
              <button className="border py-1 px-2 rounded-md bg-cyan-700 cursor-pointer">
                <Link to="/register">Signup</Link>
              </button>
            </>
          ) : (
            <>
              <button
                className="border py-1 px-2 rounded-md bg-red-400 cursor-pointer"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Toggle menu for small screens */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-end px-8 pb-4 gap-3">
          {window.innerWidth < 465 && (
            <input
              type="text"
              placeholder="Search notes"
              className="bg-cyan-950 py-2 px-3 text-white rounded-md w-full"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
          {!user ? (
            <>
              <button className="border py-1 px-2 rounded-md bg-emerald-600 cursor-pointer">
                <Link to="/login">Login</Link>
              </button>
              <button className="border py-1 px-2 rounded-md bg-cyan-700 cursor-pointer">
                <Link to="/register">Signup</Link>
              </button>
            </>
          ) : (
            <>
              <button
                className="border py-1 px-2 rounded-md bg-red-400 cursor-pointer"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
