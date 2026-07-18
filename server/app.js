require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const donorRoutes = require("./routes/donorRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/donors", donorRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Blood Donation Server is Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});