import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        { name, email, password }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        navigate("/");
        login(response.data.user);
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border shadow p-6 w-80 bg-white rounded-md">
        <h2 className="text-2xl text-center font-bold mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded-2xl"
              type="text"
              placeholder="Enter name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Email">Email</label>
            <input
              className="w-full px-3 py-2 border rounded-2xl"
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded-2xl"
              type="password"
              placeholder="**********"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <button className="w-full bg-teal-600 text-white py-2 rounded-xl">
              Signup
            </button>
            <p className="text-center">
              Already have account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
