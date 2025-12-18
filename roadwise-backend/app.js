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
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
