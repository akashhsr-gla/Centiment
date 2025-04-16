const express = require("express");
const router = express.Router();
const { calculateAccounts } = require("../Controller/accountsController");
const { protect } = require("../Middelware/authmiddelware");

// Get accounts summary
router.get("/summary", protect, calculateAccounts);

module.exports = router; 