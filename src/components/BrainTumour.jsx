import React, { useState } from "react";
import axios from "axios";

export default function TumorDetection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file)); // Set preview for display
    setResult(null); // Reset previous results
    setError(null); // Clear previous errors
  };

  const handleAnalyze = async () => {
    if (!image) {
      alert("Please upload an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      setLoading(true);
      setError(null); // Reset previous errors

      const response = await axios.post("http://localhost:5001/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Server Response:", response.data);

      // Validate response structure
      if (!response.data || !response.data.detections || response.data.detections.length === 0) {
        throw new Error("Unexpected server response. Please try again.");
      }

      const top_result = response.data.detections[0]; // Get first detection

      setResult({
        image: response.data.image, // Use analyzed image URL
        type: top_result.class || "Unknown", // Use 'class' instead of 'type'
        confidence: top_result.confidence ? top_result.confidence.toFixed(2) : "N/A",
      });
    } catch (err) {
      console.error("Error detecting tumor:", err);
      setError("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-56 mt-24 m flex flex-col rounded-2xl  items-center justify-center bg-gradient-to-br from-gray-800 via-gray-800 to-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Brain Tumor Detection</h1>

      {/* File Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded bg-gray-800"
      />

      {/* Image Preview */}
      {preview && !result && (
        <div className="mb-4">
          <img
            src={preview}
            alt="Selected"
            className="w-64 h-64 object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition mt-4"
        disabled={!image || loading}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {/* Error Message */}
      {error && <p className="mt-4 text-red-400">{error}</p>}

      {/* Display Result */}
      {result && (
        <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <img
            src={result.image} // Show the analyzed image
            alt="Analyzed"
            className="w-64 h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-lg">
            <span className="font-bold text-violet-400">Detected Type:</span> {result.type}
          </p>
          <p className="text-lg">
            <span className="font-bold text-cyan-400">Confidence:</span> {result.confidence}%
          </p>
        </div>
      )}
    </div>
  );
}
