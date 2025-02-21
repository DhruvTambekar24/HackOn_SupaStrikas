import React, { useState } from "react";
import axios from "axios";

const SkinCancerDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

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

      setOriginalImage(response.data.original_image);
      setDetectionResult(response.data.top_result);
      setError("");
    } catch (error) {
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

      {originalImage && (
        <div className="image-container">
          <h2>Original Image</h2>
          <img src={`http://localhost:5000/static/${originalImage}`} alt="Original" />
        </div>
      )}

      {detectionResult ? (
        <div className="detection-results">
          <h2>Top Detection</h2>
          <p>
            <strong>Type:</strong> {detectionResult.type} <br />
            <strong>Confidence:</strong> {detectionResult.confidence.toFixed(2)}%
          </p>
        </div>
      ) : (
        <div className="no-detection">
          <p>No specific skin lesions detected above the confidence threshold.</p>
        </div>
      )}
    </div>
  );
};

export default SkinCancerDetection;
