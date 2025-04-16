const express = require("express");
const { protect } = require("../Middelware/authmiddelware");
const { getPredictions } = require("../Controller/predictionController");
const router = express.Router();

// GET predictions
router.get("/", protect, getPredictions);

module.exports = router; 