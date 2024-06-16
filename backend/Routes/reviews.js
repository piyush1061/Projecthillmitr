const express = require("express");
const router = express.Router();
const Review = require("../models/ReviewModel");

// Route to fetch all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Route to post a new review
router.post("/", async (req, res) => {
  const { location, review, problemFaced, adviceForOthers } = req.body;
  try {
    const newReview = new Review({
      location,
      review,
      problemFaced,
      adviceForOthers,
    });

    const savedReview = await newReview.save();
    res.json(savedReview);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
