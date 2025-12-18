const TravelExperience = require("../models/TravelExperience");
exports.addExperience = async (req, res) => {
  try {
    const experience = await TravelExperience.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(experience);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.searchExperiences = async (req, res) => {
  try {
    const { city } = req.query;

    let query = {};
    if (city) {
      query.city = city;
    }

    const trips = await TravelExperience
      .find(query)
      .sort({ createdAt: -1 }) // newest first
      .limit(10);              // only 10 trips

    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getExperienceById = async (req, res) => {
  try {
    const experience = await TravelExperience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
