const Result = require("../models/Result");

// ✅ Save Detection Result
const saveResult = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    if (!req.body.top_result) {
      return res.status(400).json({ error: "Detection result is missing." });
    }

    let parsedTopResult;
    try {
      parsedTopResult = JSON.parse(req.body.top_result);
    } catch (error) {
      return res.status(400).json({ error: "Invalid top_result format." });
    }

    if (!parsedTopResult.category || parsedTopResult.confidence == null) {
      return res.status(400).json({ error: "top_result must have 'category' and 'confidence'." });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const newResult = new Result({
      original_image: imagePath,
      top_result: {
        category: parsedTopResult.category, // ✅ Use 'category' instead of 'type'
        confidence: parseFloat(parsedTopResult.confidence),
      },
    });

    await newResult.save();
    res.status(201).json({ message: "Result saved successfully", newResult });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// ✅ Fetch Detection Results
const getResults = async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { saveResult, getResults };
