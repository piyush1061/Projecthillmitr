import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/navbar";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem("token", json.authToken);
        localStorage.setItem("email", credentials.email);
        localStorage.setItem("userName", json.user.name.split(" ")[0]); // Store the first word of the name
        setMessage("Logged in successfully");
        navigate("/"); // Navigate to home page
      } else {
        setMessage("Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Failed to fetch", error);
      setMessage("Failed to fetch data. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
};
export default Login;
