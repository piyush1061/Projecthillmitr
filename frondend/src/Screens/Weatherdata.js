import React from "react";
import Treks from "./Treksdata";
import Hills from "./Hillsdata";

export default function Weatherdata() {
  return (
    <div>
      <div className="my-6">
        <h2 className="text-2xl font-bold mb-4 ml-2">
          Best Treks to Travel in Next 5 Days
        </h2>
        <Treks />
      </div>
      <div className="my-6">
        <h2 className="text-2xl font-bold mb-4 ml-2">
          Best Hill Stations to Travel in Next 5 Days
        </h2>
        <Hills />
      </div>
    </div>
  );
}
