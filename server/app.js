require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// Import Routes
const requestRoutes = require("./routes/requestRoutes");
const donorRoutes = require("./routes/donorRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home Route
app.get("/", (req, res) => {
    res.send("Blood Donation Server is Running 🚀");
});

// API Routes

app.use("/api/donors", donorRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);

// 404 Route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});