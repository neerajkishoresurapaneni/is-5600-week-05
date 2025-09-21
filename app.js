const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const productRoutes = require("./products");
const orderRoutes = require("./api"); // assuming orders are inside api.js

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Root route (so you don’t see "Cannot GET /")
app.get("/", (req, res) => {
  res.send("✅ API is running! Use /products or /orders");
});

// Routes
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/lab05", {
    // Note: useNewUrlParser & useUnifiedTopology are no longer needed in v6+
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
