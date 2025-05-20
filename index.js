const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");

// Routes
const fixtureRoutes = require("./routes/fixtureRoutes");
const resultRoutes = require("./routes/resultRoutes");
const goalRoutes = require("./routes/goalroutes");

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

app.get("/", (req, res) => {
  res.send("Admin backend is running");
});

// Use routes
app.use("/", fixtureRoutes);
app.use("/", resultRoutes);
app.use("/", goalRoutes);
app.listen(5001, () => {
  console.log("Admin backend running on http://localhost:5001");
});
