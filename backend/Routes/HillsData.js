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
    
    console.warn(
      `Rate limit exceeded. Retrying request... Attempt ${retryCount + 1}`
    );
    await delay(2000); 
    return getWeatherData(latitude, longitude, retryCount + 1);
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const processLocation = async (location) => {
  try {
    const data = await getWeatherData(location.latitude, location.longitude);
    let totalProbability = 1;
    const dailyTimelines = data.timelines?.daily;
    if (dailyTimelines && dailyTimelines.length > 0) {
      dailyTimelines.forEach((timeline) => {
        totalProbability *= timeline.values.precipitationProbabilityAvg/100 ;
      });
      
    }
    return { name: location.name, probability: totalProbability };
  } catch (error) {
    console.error(`Error fetching data for ${location.name}: ${error}`);
    return { name: location.name, probability: null, error: error.message };
  }
};

const processLocations = async (locations) => {
  const locationProbabilities = [];
  for (const location of locations) {
    await delay(1000);
    await processLocation(location)
      .then((data) => locationProbabilities.push(data))
      .catch((error) => console.error(error));
  }
  return locationProbabilities;
};

// For hills.json
router.get("/", async (req, res) => {
  try {
    const hills = require("../hills.json");
    const hillProbabilities = await processLocations(hills);

   
    const sortedProbabilities = hillProbabilities.sort(
      (a, b) => a.probability - b.probability
    );

    res.json(sortedProbabilities);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
