import React, { useState, useEffect } from "react";


const CACHE_DURATION = 60 * 60 * 1000; // Cache duration in milliseconds (e.g., 1 hour)

export default function Hills() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if data is already in local storage
    const cachedData = localStorage.getItem("locations");
    const cachedTimestamp = localStorage.getItem("locationsTimestamp");

    if (cachedData && cachedTimestamp) {
      const now = Date.now();
      const cacheAge = now - cachedTimestamp;

      if (cacheAge < CACHE_DURATION) {
        setLocations(JSON.parse(cachedData));
        setLoading(false);
        return;
      }
    }
    // Fetch data from API if not in local storage or cache is stale
    fetch("http://localhost:5001/api/hills")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const slicedData = data.slice(0, 5);
        setLocations(slicedData);
        localStorage.setItem("locations", JSON.stringify(slicedData)); // Cache data in local storage
        localStorage.setItem("locationsTimestamp", Date.now()); // Cache timestamp
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.error("Fetch error:", error);
      });
  }, []);

  const getRecommendation = (probability) => {
    if (probability > 0.9) return "Highly Not Recommended";
    else if (probability > 0.7) return "Not Recommended";
    else return "Go Ahead Happy Journey";
  };

  return (
    <div>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Travel Recommendations</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <svg
              className="animate-spin -ml-1 mr-3 h-10 w-10 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 0a10 10 0 110 20h-2c-1.105 0-2-.895-2-2s.895-2 2-2h2a8 8 0 100-16h-2c-1.105 0-2-.895-2-2s.895-2 2-2z"
              ></path>
            </svg>
            <p>Loading...</p>
          </div>
        ) : error ? (
          <div className="text-red-500">Error: {error.message}</div>
        ) : (
          <div className="overflow-x-auto">
            <div className="hidden lg:block">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Probability
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recommendation
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {locations.map((location, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {location.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {location.probability.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {getRecommendation(location.probability)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="block lg:hidden">
              {locations.map((location, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border border-gray-200 rounded"
                >
                  <div className="text-lg font-semibold text-gray-900">
                    {location.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {location.probability.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {getRecommendation(location.probability)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
