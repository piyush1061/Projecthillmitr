const express = require("express");
const router = express.Router();
const Guide = require("../models/Guide");

// Route to get all guides
router.get("/", async (req, res) => {
  try {
    const guides = await Guide.find();
    res.json(guides);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
router.post("/", async (req, res) => {
  const { name, location, mobile, contact, info } = req.body;
  if (!name || !location || !mobile || !contact || !info) {
    return res.status(400).send("All fields are required.");
  }
  try {
    const newGuide = new Guide({ name, location, mobile, contact, info });
    await newGuide.save();
    res.status(201).send("Guide information submitted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
