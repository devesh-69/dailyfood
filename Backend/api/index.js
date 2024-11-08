// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB:", error));

// Define routes
app.get("/", (req, res) => {
  res.send("Welcome to the Backend Server");
});

app.get("/api/menu", async (req, res) => {
  res.json({ message: "Here will be the menu items" });
});

app.post("/api/order", async (req, res) => {
  const orderData = req.body;
  res.json({ message: "Order received", order: orderData });
});

// Start the server locally if not in a Vercel environment
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export the app for Vercel serverless function
module.exports = app;