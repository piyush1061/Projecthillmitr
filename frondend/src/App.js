import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/navbar";
import Login from "./Screens/Login";
import Home from "./Screens/Home"; // Your Home component
import Reviews from "./Screens/Reviews"; // Your Reviews component
import Guides from "./Screens/Guides"; // Your Guides component
import Weatherdata from "./Screens/Weatherdata"; // Your WeatherData component
import SubmitGuide from "./Screens/SubmitGuide";
import SubmitReview from "./Screens/Submitreview";
import Signup from "./Screens/Signup";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/submit-review" element={<SubmitReview />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/submit-guide" element={<SubmitGuide />} />
        <Route path="/weatherdata" element={<Weatherdata />} />
      </Routes>
    </Router>
  );
};

export default App;
