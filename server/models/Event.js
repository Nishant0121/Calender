const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ["exercise", "eating", "work", "relax", "family", "social"],
    required: true,
  },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

module.exports = mongoose.model("Event", EventSchema);
