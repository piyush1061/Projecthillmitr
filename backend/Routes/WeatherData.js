const express = require("express");
const router = express.Router();

// Replace with your Tomorrow.io API key
const API_KEY = "your_api_key_here";

// Delay function to add delay between requests
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getWeatherData = async (latitude, longitude, retryCount = 0) => {
  const fetch = await import("node-fetch").then((mod) => mod.default);
  const url = `https://api.tomorrow.io/v4/weather/forecast?location=${latitude},${longitude}&apikey=${API_KEY}`;
  const response = await fetch(url);

  if (response.status === 429 && retryCount < 3) {
    // Too many requests, wait and retry
    console.warn(
      `Rate limit exceeded. Retrying request... Attempt ${retryCount + 1}`
    );
    await delay(2000); // Delay 2 seconds before retrying
    return getWeatherData(latitude, longitude, retryCount + 1);
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
const processLocations = async (location) => {
  try {
    const data = await getWeatherData(location.latitude, location.longitude);
    console.log(data);
    let totalProbability = 1;
    const dailyTimelines = data.timelines?.daily;
    if (dailyTimelines && dailyTimelines.length > 0) {
      dailyTimelines.forEach((timeline) => {
        const dailyProbability =
          timeline.values.precipitationProbabilityAvg / 100;
        totalProbability *= dailyProbability;
      });
    }
    return { name: location.name, probability: totalProbability };
  } catch (error) {
    console.error(`Error fetching data for ${location.name}: ${error}`);
    return { name: location.name, probability: null, error: error.message };
  }
};

router.get("/", async (req, res) => {
  try {
    const locations = require("../treks.json");
    const locationProbabilities = await processLocations(locations);
    
    // **Correction:** Create a new array to store sorted probabilities
    const sortedProbabilities = locationProbabilities.sort(
      (a, b) => a.probability - b.probability
    );

    res.json(sortedProbabilities);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
