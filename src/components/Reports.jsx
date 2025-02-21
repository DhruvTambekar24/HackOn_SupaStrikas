import React, { useState } from "react";
import { getGeminiResponse } from "../lib/gemini";
import { Upload, Loader2, FileText } from "lucide-react";

export function Records() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    try {
      const prompt = `As a medical AI assistant, please analyze this medical record and provide a summary of key findings, recommendations, and any areas of concern. Format the response in a structured format.`;
      const response = await getGeminiResponse(prompt);
      setAnalysis(parseAnalysis(response));
    } catch (error) {
      console.error("Error:", error);
      setAnalysis("Error analyzing medical record. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to parse the response into structured sections
  const parseAnalysis = (response) => {
    const lines = response.split("\n").filter((line) => line.trim() !== "");
    let structuredData = [];
    let currentSection = null;

    lines.forEach((line) => {
      if (line.match(/^\*\*(.*?)\*\*$/)) {
        // If line is a title (bolded with **), create a new section
        if (currentSection) structuredData.push(currentSection);
        currentSection = { title: line.replace(/\*\*/g, ""), content: [] };
      } else if (currentSection) {
        currentSection.content.push(line);
      }
    });

    if (currentSection) structuredData.push(currentSection);

    return structuredData;
  };

  return (
    <div className="max-w-3xl mx-auto min-h-screen flex items-center justify-center  text-white p-6">
      <div className="w-full bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-700">
        <h2 className="text-3xl font-bold text-blue-400 mb-4">Medical Records Analysis</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Upload Medical Record
          </label>
          <div className="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg hover:border-blue-500 transition">
            <FileText className="h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-400 mt-2">
              <label className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-blue-400 hover:text-blue-300 transition">
                <span>Upload a file</span>
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PDF, DOC, DOCX, or TXT up to 10MB</p>
          </div>
        </div>

        {selectedFile && (
          <div className="mb-4 p-4 bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-300">Selected file: {selectedFile.name}</p>
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={!selectedFile || isLoading}
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            "Analyze Record"
          )}
        </button>

        {/* Analysis Results */}
        {analysis && (
          <div className="mt-6 bg-gray-700 rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-blue-400 mb-4">Analysis Results</h3>
            {analysis.map((section, index) => (
              <div key={index} className="mb-6">
                <h4 className="text-xl font-semibold text-gray-200">{section.title}</h4>
                <ul className="list-disc pl-5 text-gray-300 mt-2 space-y-2">
                  {section.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Records;
