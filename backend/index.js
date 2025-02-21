const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const yoloRoutes = require("./routes/yoloRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON

// Routes
app.use("/api/yolo", yoloRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
