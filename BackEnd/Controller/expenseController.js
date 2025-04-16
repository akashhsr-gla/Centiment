const User = require('../Models/User');
const Expense = require('../Models/Expense');
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// Configure multer storage for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            cb(null, true);
        } else {
            cb(new Error("Only .xlsx files are allowed!"), false);
        }
    },
}).single("file");

exports.addExpense = async (req, resp) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return resp.status(400).json({ message: "All fields are required" });
        }

        // Validate amount is a positive number
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return resp.status(400).json({ message: "Amount must be a positive number" });
        }

        // Validate date format
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return resp.status(400).json({ message: "Invalid date format" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount: parsedAmount,
            date: parsedDate,
        });

        await newExpense.save();
        return resp.status(201).json(newExpense);

    } catch (err) {
        console.error("Error adding expense:", err);
        return resp.status(500).json({ message: "Server Error" });
    }
};

exports.getAllExpense = async (req, resp) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        resp.json(expense);
    } catch (err) {
        console.error("Error fetching expenses:", err);
        resp.status(500).json({ message: "Server error" });
    }
};

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        const data = expense.map((item) => ({
            Category: item.category,
            Date: item.date,
            Amount: item.amount,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");

        const tempDir = path.join(__dirname, '..', 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        const filePath = path.join(tempDir, `expense_details_${Date.now()}.xlsx`);
        xlsx.writeFile(wb, filePath);

        res.download(filePath, "expense_details.xlsx", (err) => {
            if (err) {
                console.error("Download error:", err);
                res.status(500).json({ message: "Error sending file" });
            }
            // Clean up the file after download
            fs.unlink(filePath, (err) => {
                if (err) console.error("Error deleting temp file:", err);
            });
        });
    } catch (err) {
        console.error("Error generating expense Excel:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteExpense = async (req, resp) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.findOne({ _id: req.params.id, userId });
        if (!expense) {
            return resp.status(404).json({ message: "Expense record not found" });
        }
        await Expense.findByIdAndDelete(req.params.id);
        resp.json({ message: "Deleted Successfully" });
    } catch (err) {
        console.error("Error deleting expense:", err);
        resp.status(500).json({ message: "Server error" });
    }
};

exports.uploadExpenseExcel = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        try {
            const filePath = req.file.path;
            const workbook = xlsx.readFile(filePath, {
                cellDates: true, // This will parse dates automatically
                dateNF: 'dd/mm/yyyy' // This matches your Excel date format
            });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            
            // Convert to JSON with proper header handling
            const data = xlsx.utils.sheet_to_json(worksheet, {
                raw: false,
                defval: '',
                header: ['Icon', 'Category', 'Amount', 'Date'] // Specify exact headers from Excel
            });

            if (!data || data.length === 0) {
                fs.unlinkSync(filePath);
                return res.status(400).json({ message: "Excel file is empty" });
            }

            // Remove header row if it exists
            if (data[0] && (data[0].Category === 'Category' || data[0].Icon === 'Icon')) {
                data.shift();
            }

            // Process and validate each row
            const expenseRecords = data.map((row, index) => {
                // Handle amount (remove any currency symbols and convert to number)
                const amountStr = String(row.Amount).replace(/[^0-9.-]/g, '');
                const amount = parseFloat(amountStr);
                
                if (isNaN(amount) || amount <= 0) {
                    throw new Error(`Invalid amount value in row ${index + 2}: ${row.Amount}`);
                }

                // Handle date
                let date;
                if (row.Date instanceof Date) {
                    date = row.Date;
                } else {
                    // Try parsing the date if it's a string
                    const dateParts = String(row.Date).split('/');
                    if (dateParts.length === 3) {
                        // Assuming date format is DD/MM/YYYY
                        date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                    } else {
                        date = new Date(row.Date);
                    }
                }

                if (isNaN(date.getTime())) {
                    throw new Error(`Invalid date format in row ${index + 2}: ${row.Date}`);
                }

                if (!row.Category) {
                    throw new Error(`Missing category in row ${index + 2}`);
                }

                return {
                    userId: req.user.id,
                    category: row.Category.trim(),
                    date: date,
                    amount: amount,
                    icon: row.Icon || "",
                };
            });

            // Insert all records in a transaction
            await Expense.insertMany(expenseRecords);
            
            // Cleanup
            fs.unlinkSync(filePath);
            
            return res.status(200).json({ 
                message: "Expense data uploaded successfully",
                recordsProcessed: expenseRecords.length
            });
        } catch (error) {
            console.error("Error processing Excel file:", error);
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(500).json({ 
                message: error.message || "Server error while processing the file" 
            });
        }
    });
};
