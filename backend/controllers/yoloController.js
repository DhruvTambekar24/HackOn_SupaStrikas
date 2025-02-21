const Result = require("../models/Result");

// ✅ Save YOLO Detection Result
const saveResult = async (req, res) => {
  try {
    if (!req.file) {
      console.error("❌ Image file missing in request.");
      return res.status(400).json({ error: "Image file is required" });
    }

    if (!req.body.top_result) {
      console.error("❌ top_result missing in request.");
      return res.status(400).json({ error: "Detection result is missing." });
    }

    let parsedTopResult;
    try {
      parsedTopResult = JSON.parse(req.body.top_result);
    } catch (error) {
      console.error("❌ Error parsing top_result:", error);
      return res.status(400).json({ error: "Invalid top_result format." });
    }

    if (!parsedTopResult.type || parsedTopResult.confidence == null) {
      console.error("❌ top_result missing required fields.");
      return res.status(400).json({ error: "top_result must have 'type' and 'confidence'." });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const newResult = new Result({
      original_image: imagePath,
      top_result: {
        type: parsedTopResult.type,
        confidence: parseFloat(parsedTopResult.confidence),
      },
    });

    await newResult.save();
    console.log("✅ Result saved:", newResult);
    res.status(201).json({ message: "Result saved successfully", newResult });
  } catch (error) {
    console.error("❌ Error saving result:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};



// ✅ Fetch YOLO Detection Results
const getResults = async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 });
    res.status(200).json(results);
  } catch (error) {
    console.error("❌ Error fetching results:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { saveResult, getResults };
