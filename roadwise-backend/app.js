const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
//after creating routes.js
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
//after creating travelRoutes.js
const travelRoutes = require("./routes/travelRoutes");
app.use("/api/travel", travelRoutes);


// test route
app.get("/", (req, res) => {
  res.send("RoadWise Backend Running");
});

// mongo connect
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:");
    console.error(err.message);
  });

