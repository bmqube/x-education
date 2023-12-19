const mongoose = require("mongoose"); // Module
const User = require("./models/User"); // DB Model
const bcrypt = require("bcrypt"); // Module
const saltRounds = 10;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    // Create default admin user if doesnt exist
    let count = await User.countDocuments();
    if (count === 0) {
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD,
        saltRounds
      );

      const admin = new User({
        username: process.env.ADMIN_USERNAME,
        password: hashedPassword,
        role: "admin",
      });
      await admin.save();
    }

    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
