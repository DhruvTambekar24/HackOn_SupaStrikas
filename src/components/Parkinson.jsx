import React, { useState } from "react";
import axios from "axios";

export default function ParkinsonPredictor() {
  const [formData, setFormData] = useState({
    "MDVP:Fo(Hz)": "120.289",
    "MDVP:Fhi(Hz)": "128.143",
    "MDVP:Flo(Hz)": "100.209",
    "MDVP:Jitter(%)": "0.00492",
    "MDVP:Jitter(Abs)": "0.00004",
    "MDVP:RAP": "0.00269",
    "MDVP:PPQ": "0.00238",
    "Jitter:DDP": "0.00808",
    "MDVP:Shimmer": "0.01412",
    "MDVP:Shimmer(dB)": "0.125",
    "Shimmer:APQ3": "0.00703",
    "Shimmer:APQ5": "0.0082",
    "MDVP:APQ": "0.01194",
    "Shimmer:DDA": "0.0211",
    "NHR": "0.0161",
    "HNR": "23.949",
    "RPDE": "0.46716",
    "DFA": "0.724045",
    "spread1": "-6.135296",
    "spread2": "0.20363",
    "D2": "2.539724",
    "PPE": "0.169923",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const response = await axios.post("http://127.0.0.1:5003/predict", formData);
      setPrediction(response.data.prediction);
    } catch (err) {
      setError("Error making prediction. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl  mx-auto  flex flex-col items-center justify-center bg-transparent text-white p-6">
      <div className="w-full bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-700">
        {/* Title Section */}
        <h1 className="text-4xl font-bold text-blue-400 text-center mb-4">
          Parkinson's Disease Prediction
        </h1>

        {/* About Parkinson’s Disease */}
        <div className="bg-gray-700 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-blue-300">What is Parkinson’s Disease?</h2>
          <p className="text-gray-300 mt-2">
            Parkinson’s disease is a progressive neurological disorder that affects movement. It occurs due to
            the loss of dopamine-producing neurons in the brain, leading to symptoms like tremors, slow movement,
            muscle stiffness, and balance issues.
          </p>
        </div>

        {/* Prediction Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {key}:
              </label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition"
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

        {/* Prediction Result */}
        {prediction !== null && (
          <div className="mt-6 bg-gray-700 rounded-lg p-4 text-center">
            <h3 className="text-xl font-semibold text-blue-400">
              Prediction Result:
            </h3>
            <p className={`text-lg mt-2 font-bold ${prediction === 1 ? "text-red-500" : "text-blue-500"}`}>
              {prediction === 1 ? "Parkinson's Detected 😞" : "No Parkinson's Detected 🎉"}
            </p>
            <p className="text-gray-300 text-sm mt-2">
              This result is based on machine learning analysis of your voice patterns.
              If Parkinson’s is detected, please consult a medical professional for further evaluation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
