const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

// Health-check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "SmartCart backend is running",
  });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`SmartCart backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();