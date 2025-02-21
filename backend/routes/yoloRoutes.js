const express = require("express");
const multer = require("multer");
const path = require("path");
const { saveResult, getResults } = require("../controllers/yoloController");

const router = express.Router();

// ✅ Configure Multer for Image Uploads
const storage = multer.diskStorage({
  destination: "uploads/", // Save images in 'uploads' folder
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// ✅ Routes
router.post("/save", upload.single("image"), saveResult); // Save Image & Data
router.get("/results", getResults); // Fetch Results

// ✅ Serve Uploaded Images
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

module.exports = router;
