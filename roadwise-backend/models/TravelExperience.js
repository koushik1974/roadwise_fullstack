const mongoose = require("mongoose");

/* Node schema for drag & drop places */
const nodeSchema = new mongoose.Schema({
  type: {
    type: String, // hotel, beach, temple, etc.
    required: true,
  },

  // 🆕 Place name (e.g. Taj Hotel, Baga Beach)
  name: {
    type: String,
    default: "",
  },

  // 🆕 Google Maps link
  mapUrl: {
    type: String,
    default: "",
  },

  food: {
    type: String, // veg / non-veg (optional)
  },

  x: {
    type: Number,
    required: true,
  },

  y: {
    type: Number,
    required: true,
  },
});

const travelExperienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    days: {
      type: Number,
      required: true,
    },

    travelMode: {
      type: String,
      required: true,
    },

    // 🆕 Places visited on the way
    stopovers: {
      type: [String],
      default: [],
    },

    // Drag & drop nodes
    nodes: {
      type: [nodeSchema],
      default: [],
    },

    connections: {
      type: [[Number]],
      default: [],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "TravelExperience",
  travelExperienceSchema
);
