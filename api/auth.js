const express = require("express"); // module
const router = express.Router(); // module

const User = require("../models/User"); // DB Model

const bcrypt = require("bcrypt"); // module

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Passwords didn't match" });
    }

    res.json({ message: "Logged in successfully", userToken: user._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
