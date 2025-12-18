const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");


const {
  addExperience,
  searchExperiences,
  getExperienceById,
} = require("../controllers/travelController");

// search
router.get("/search", searchExperiences);

// get single experience (context page)
router.get("/:id", getExperienceById);

// add experience (protected)
router.post("/add", auth, addExperience);

module.exports = router;
