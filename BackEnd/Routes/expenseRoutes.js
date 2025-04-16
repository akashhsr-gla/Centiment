const express = require("express");
const { 
    addExpense, 
    getAllExpense, 
    deleteExpense, 
    downloadExpenseExcel,
    uploadExpenseExcel 
} = require("../Controller/expenseController");

const { protect } = require("../Middelware/authmiddelware");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadexcel", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);
router.post("/upload", protect, uploadExpenseExcel);

module.exports = router;
