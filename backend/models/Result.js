const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    original_image: { type: String, required: true }, // Image path stored
    top_result: {
      category: { type: String, required: true }, // Renamed from 'type' to 'category'
      confidence: { type: Number, required: true },
    },
  },
  { timestamps: true } // Auto timestamps (createdAt, updatedAt)
);

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
