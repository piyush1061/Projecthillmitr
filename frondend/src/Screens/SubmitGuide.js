import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/navbar";

export default function SubmitGuide() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    mobile: "",
    contact: "",
    info: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5001/api/postguide", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(() => {
        navigate("/guides");
      })
      .catch((error) => {
        setError(error);
        console.error("Submit error:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Submit Guide Information</h1>
        {error && <div className="text-red-500">Error: {error.message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-lg">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-lg">Mobile No</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-lg">Website or Email</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-lg">Any Other Information</label>
            <textarea
              name="info"
              value={formData.info}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
