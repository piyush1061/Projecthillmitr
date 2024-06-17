import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/navbar";

const SubmitReview = () => {
  const [form, setForm] = useState({
    location: "",
    review: "",
    problemFaced: "",
    adviceForOthers: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5001/api/postreview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      navigate("/reviews");
    } else {
      alert("Your form was not submitted");
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Submit Review</h2>
          <div className="mb-4">
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="review"
              placeholder="Review"
              value={form.review}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="problemFaced"
              placeholder="Problem Faced"
              value={form.problemFaced}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="adviceForOthers"
              placeholder="Advice For Others"
              value={form.adviceForOthers}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitReview;
