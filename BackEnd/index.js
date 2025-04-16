require("dotenv").config();

const express= require("express");
const cors= require("cors");
const path = require("path");
const connectDB= require("./Config/db");
const authRoutes= require("./Routes/authRoutes");
const incomeRoutes= require("./Routes/incomeRoutes")
const expenseRoutes= require("./Routes/expenseRoutes")
const dashboardRoutes= require("./Routes/dashboardRoutes")
const predictionRoutes = require("./Routes/predictionRoutes")
const accountsRoutes = require("./Routes/accountsRoutes")

const app= express();

//middleware for CORS
app.use(cors({
    origin: process.env.CLIENT_URL||"*", 
    methods: ["GET","POST", "PUT", "DELETE"],
    allowedHeaders: "Content-Type, Authorization"
}));

app.use(express.json());

connectDB();
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/income',incomeRoutes);
app.use('/api/v1/expense',expenseRoutes);
app.use('/api/v1/dashboard',dashboardRoutes);
app.use('/api/v1/predictions', predictionRoutes);
app.use('/api/v1/accounts', accountsRoutes);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT= process.env.PORT|| 5000;
app.listen(PORT, ()=> {console.log(`Sever running on ${PORT}`)})
