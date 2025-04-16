const express = require("express");
const { protect } = require("../Middelware/authmiddelware");
const { getDashboardData, deleteAllTransactions } = require("../Controller/dashboardController");
const router = express.Router();

router.get("/", protect, getDashboardData);
router.delete("/delete-all", protect, deleteAllTransactions);

module.exports = router;

