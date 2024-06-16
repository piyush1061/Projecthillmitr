import React from "react";

import Navbar from "../Components/navbar";

const Home = () => {
  return (
    
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            Welcome to Travel Reviews
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-md shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Explore Reviews</h2>
              <p className="text-lg mb-4">
                Discover detailed reviews of various locations around the world
                shared by fellow travelers.
              </p>
              <a href="/reviews" className="btn">
                Explore Reviews
              </a>
            </div>
            <div className="bg-white rounded-md shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Best Locations</h2>
              <p className="text-lg mb-4">
                Find the best travel destinations recommended by experienced
                travelers and adventure enthusiasts.
              </p>
              <a href="/best-locations" className="btn">
                Discover Best Locations
              </a>
            </div>
            <div className="bg-white rounded-md shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Guides</h2>
              <p className="text-lg mb-4">
                Connect with knowledgeable guides who can provide expert advice
                and guidance for your travels.
              </p>
              <a href="/contact-guides" className="btn">
                Contact Guides
              </a>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Home;
