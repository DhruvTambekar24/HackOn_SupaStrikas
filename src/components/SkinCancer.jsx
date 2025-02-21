import React, { useState } from "react";
import axios from "axios";

const SkinCancerDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [error, setError] = useState("");

  // Handle File Selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Show image preview
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle Image Upload & Send to API
  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("API Response:", response.data); // Debugging

      setDetectionResult(response.data); // Store API response
      setError("");
    } catch (error) {
      console.error("Upload Error:", error);
      setError("Error analyzing the image. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Skin Cancer Detection System</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleUpload} className="file-upload">
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <button type="submit">Analyze Skin Cell</button>
      </form>

      {imagePreview && (
        <div className="image-container">
          <h2>Selected Image</h2>
          <img src={imagePreview} alt="Preview" />
        </div>
      )}

      {detectionResult?.top_result?.type ? (
        <div className="detection-results">
          <h2>Detection Result</h2>
          <p>
            <strong>Type:</strong> {detectionResult.top_result.type} <br />
            <strong>Confidence:</strong>{" "}
            {detectionResult.top_result.confidence !== undefined
              ? `${detectionResult.top_result.confidence.toFixed(2)}%`
              : "N/A"}
          </p>
          
        </div>
      ) : (
        <p>No detection results yet.</p>
      )}
    </div>
  );
};

export default SkinCancerDetection;
