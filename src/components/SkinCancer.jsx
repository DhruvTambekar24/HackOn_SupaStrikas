import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, AlertCircle } from "lucide-react";
import axios from "axios";

const SkinCancerDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [pastResults, setPastResults] = useState([]);

  useEffect(() => {
    fetchPastResults();
  }, []);

  const fetchPastResults = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/yolo/results");
      setPastResults(response.data);
    } catch (error) {
      console.error("Error fetching past results:", error);
      setError("Failed to load past results.");
    }
  };

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

      console.log(response.data);
      setDetectionResult(response.data);
      setError("");

      // Save the detection result to the database
      await saveDetectionResult(selectedFile, response.data.top_result);
    fetchPastResults();// Refresh past results after saving
    } catch (error) {
      console.error("Upload Error:", error);
      setError("Error analyzing the image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveDetectionResult = async (imageFile, topResult) => {
    if (!imageFile || !topResult || !topResult.type || topResult.confidence == null) {
      setError("Invalid result format. Unable to save.");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", imageFile); // ✅ Attach the actual file
    formData.append("top_result", JSON.stringify(topResult)); // ✅ Send as a string
  
    setIsSaving(true);
    try {
      const response = await axios.post("http://localhost:8000/api/yolo/save", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("✅ Detection result saved:", response.data);
      fetchPastResults();
    } catch (error) {
      console.error("❌ Error saving result:", error.response?.data || error.message);
      setError("Failed to save the detection result.");
    } finally {
      setIsSaving(false);
    }
  };
  
  
  
  

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-rose-50 via-white to-rose-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent text-center mb-12">
            Skin Cancer Detection System
          </h1>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-3xl p-8 text-center hover:border-violet-500 transition-colors bg-white">
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
                  ${!selectedFile || isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-violet-600 to-cyan-500 hover:shadow-lg transform hover:-translate-y-1"
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
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-semibold text-violet-600">
                        {detectionResult.top_result.type}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
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

          {/* Past Results Section */}
          <div className="mt-16 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Past Results</h2>
            {pastResults.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastResults.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <img
                      src={result.original_image}
                      alt={`Result ${index + 1}`}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-semibold text-violet-600">
                          {result.top_result.type}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Confidence:</span>
                        <span className="font-semibold text-violet-600">
                          {result.top_result.confidence.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No past results found.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkinCancerDetection;
