const User = require("../models/User"); // Model
const mongoose = require("mongoose"); // Module

const centralAuth = (baseRoute) => {
  return async function (req, res, next) {
    try {
      if (
        baseRoute === "/course" &&
        (req.method === "POST" ||
          req.method === "PUT" ||
          req.method === "DELETE")
      ) {
        const userToken = req.headers.usertoken;
        if (!userToken || !mongoose.Types.ObjectId.isValid(userToken)) {
          return res.status(403).json({ message: "Access denied" });
        }

        const user = await User.findById(userToken);
        if (!user) {
          return res.status(403).json({ message: "Access denied" });
        }

        if (user.role !== "admin") {
          return res.status(403).json({ message: "Access denied" });
        }

        next();
      } else {
        next();
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server Error" });
    }
  };
};

module.exports = centralAuth;
