const express = require("express"); // module
const router = express.Router(); // module
const Course = require("../models/Course"); // DB Model

// GET /api/course
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/course/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/course
router.post("/", async (req, res) => {
  const { name, description, price, duration, level, topics, schedule } =
    req.body;

  if (
    !name ||
    !description ||
    !price ||
    !duration ||
    !level ||
    !topics ||
    !schedule
  ) {
    return res.status(400).json({ message: "Missing required information" });
  }

  const course = new Course({
    name,
    description,
    price,
    duration,
    level,
    topics,
    schedule,
  });

  try {
    await course.save();
    res.status(201).send({
      message: "The course has been added successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/course/:id
router.put("/:id", async (req, res) => {
  const { name, description, price, duration, level, topics, schedule } =
    req.body;
  const { id: _id } = req.params;

  if (
    !_id ||
    !name ||
    !description ||
    !price ||
    !duration ||
    !level ||
    !topics ||
    !schedule
  ) {
    return res.status(400).json({ message: "Missing required information" });
  }

  try {
    const course = await Course.findById(_id);

    await course.updateOne({
      name,
      description,
      price,
      duration,
      level,
      topics,
      schedule,
    });

    await course.save();

    res.status(201).send({
      message: "The course has been updated successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/course/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Course.findByIdAndDelete(id);
    res.status(200).send({
      message: "The course has been deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
