import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, AlertCircle } from "lucide-react";
import axios from "axios";

const SkinCancerDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setDetectionResult(null);
      setError("");
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select an image file.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDetectionResult(response.data);
      setError("");
    } catch (error) {
      console.error("Upload Error:", error);
      setError("Error analyzing the image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" mx-auto px-8 py-12 flex justify-center items-center h-screen bg-white text-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
          Skin Cancer Detection System
        </h1>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-8 text-center hover:border-violet-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer space-y-4 flex flex-col items-center"
              >
                <Upload size={48} className="text-gray-400" />
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-700">
                    Upload Skin Image
                  </p>
                  <p className="text-sm text-gray-500">
                    Click or drag and drop your image here
                  </p>
                </div>
              </label>
            </div>

            <button
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
              className={`w-full py-4 px-8 rounded-full font-semibold text-white transition-all duration-200 
                ${
                  !selectedFile || isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-violet-600 to-cyan-500 hover:shadow-lg"
                }`}
            >
              {isLoading ? "Analyzing..." : "Analyze Skin Cell"}
            </button>
          </div>

          {/* Preview & Results Section */}
          <div className="space-y-6">
            {imagePreview && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-semibold text-gray-800">
                  Selected Image
                </h2>
                <div className="rounded-3xl overflow-hidden bg-white shadow-lg">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </motion.div>
            )}

            {detectionResult?.top_result?.type && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 shadow-lg space-y-4"
              >
                <h2 className="text-2xl font-semibold text-gray-800">
                  Detection Result
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-semibold text-violet-600">
                      {detectionResult.top_result.type}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Confidence:</span>
                    <span className="font-semibold text-violet-600">
                      {detectionResult.top_result.confidence !== undefined
                        ? `${detectionResult.top_result.confidence.toFixed(2)}%`
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkinCancerDetection;