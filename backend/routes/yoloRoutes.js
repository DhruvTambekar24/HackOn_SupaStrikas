const express = require("express");
const multer = require("multer");
const path = require("path");
const { saveResult, getResults } = require("../controllers/yoloController"); // ✅ Import properly

const router = express.Router();

// ✅ Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// ✅ Define Routes Correctly
router.post("/save", upload.single("image"), saveResult); // ✅ Ensure `saveResult` is properly imported
router.get("/results", getResults);

module.exports = router;
