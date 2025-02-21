const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  original_image: { type: String, required: true },
  top_result: {
    type: { type: String, required: true },
    confidence: { type: Number, required: true },
  },
  createdAt: { type: Date, default: Date.now }, // Automatically add timestamps
},{timestamps:true});

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
