const express = require("express");
const { 
    addIncome, 
    getAllIncome, 
    deleteIncome, 
    downloadIncomeExcel,
    uploadIncomeExcel
} = require("../Controller/incomeController");

const { protect } = require("../Middelware/authmiddelware");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);
router.post("/upload",protect, uploadIncomeExcel)

module.exports = router;
