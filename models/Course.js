const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  topics: {
    type: [String],
    required: true,
  },
  schedule: {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    classDays: {
      type: [String],
      required: true,
    },
    classTime: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("Course", CourseSchema);
