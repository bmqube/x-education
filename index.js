const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());
const connectDB = require("./db");
connectDB();

app.use("/api/course", require("./api/course"));
app.use("/api/auth", require("./api/auth"));

app.get("*", function (req, res) {
  res.status(404).sendFile(__dirname + "/public/404.html");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
