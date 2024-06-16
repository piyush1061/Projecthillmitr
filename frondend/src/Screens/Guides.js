import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/navbar";

export default function Guides() {
const [guides, setGuides] = useState([]);
const [error, setError] = useState(null);

useEffect(() => {
fetch("http://localhost:5001/api/getguide")
.then((response) => response.json())
.then((data) => setGuides(data))
.catch((error) => {
setError(error);
console.error("Fetch error:", error);
});
}, []);

return (
<div>
<Navbar />
<div className="p-6">
<h1 className="text-3xl font-bold mb-4">Guides Information</h1>
{error ? (
<div className="text-red-500">Error: {error.message}</div>
) : (
<div className="guides-list">
{guides.map((guide, index) => (
<div key={index} className="mb-4 p-4 border rounded">
<h2 className="text-xl font-bold">{guide.name}</h2>
<p>Location: {guide.location}</p>
<p>Mobile No: {guide.mobile}</p>
<p>Contact: {guide.contact}</p>
<p>Information: {guide.info}</p>
</div>
))}
</div>
)}
</div>
<div className="fixed bottom-4 right-4">
<Link
       to="/submit-guide"
       className="bg-blue-500 text-white px-4 py-2 rounded"
     >
Submit a Guide
</Link>
</div>
</div>
);
}