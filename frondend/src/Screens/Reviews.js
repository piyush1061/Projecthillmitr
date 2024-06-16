import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/navbar";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/getreview")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setReviews(data))
      .catch((error) => {
        setError(error);
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Travel Reviews</h1>
        {error ? (
          <div className="text-red-500">Error: {error.message}</div>
        ) : (
          <div className="reviews-list space-y-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="mb-4 p-4 border rounded shadow-md bg-white"
              >
                <h2 className="text-xl font-bold">{review.location}</h2>
                <p className="mt-2 whitespace-pre-wrap break-words">
                  <strong>Review:</strong> {review.review}
                </p>
                <p className="mt-2 whitespace-pre-wrap break-words">
                  <strong>Problem Faced:</strong> {review.problemFaced}
                </p>
                <p className="mt-2 whitespace-pre-wrap break-words">
                  <strong>Advice for Others:</strong> {review.adviceForOthers}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="fixed bottom-4 right-4">
        <Link
          to="/submit-review"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition"
        >
          Submit a Review
        </Link>
      </div>
    </div>
  );
}
