import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export default function LandingPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col bg-gradient-to-br from-gray-800 via-gray-800 to-gray-950 text-white">


      {/* Hero Section */}
      <main className="flex-grow flex items-center px-8 py-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h1 className="text-6xl font-bold leading-tight bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                  AI-Powered Diagnostic Platform
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                  Revolutionizing healthcare with advanced machine learning
                  algorithms that provide accurate diagnoses and accelerate
                  early detection of rare diseases.
                </p>
              </motion.div>

              <motion.div
                className="flex space-x-4"
                {...fadeInUp}
                transition={{ delay: 0.4 }}
              >
                <SignedIn>
                  <Link to="/home">
                    <button className="px-8 py-4 rounded-lg border-2 hover:border-b-4 hover:scale-110 bg-gray-100/20 hover:bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-xl hover:shadow-lg transition-all duration-500">
                      Get Started
                    </button>
                  </Link>
                  <Link to="/profile">
                    <button className="px-8 py-4 bg-gray-100/20 rounded-lg border-2 hover:border-b-4 hover:scale-110 text-white font-semibold text-lg hover:bg-gray-700 transition-all duration-200">
                      Profile
                    </button>
                  </Link>
                </SignedIn>
                <SignedOut>
                  <SignInButton>
                    <button className="px-8 py-4 rounded-full bg-violet-600 text-white font-semibold text-lg hover:bg-violet-700 transition-colors duration-200">
                      Sign In to Start
                    </button>
                  </SignInButton>
                </SignedOut>
              </motion.div>
            </div>

            {/* Right Column - Stats */}
            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { title: "Accuracy Rate", value: "98.4%" },
                { title: "Diseases Covered", value: "5+" },
                { title: "Medical Partners", value: "200+" },
                { title: "Patient Success", value: "50k+" },
              ].map((stat) => (
                <motion.div
                  key={stat.title}
                  className="p-8 rounded-3xl bg-gray-800 shadow-sm drop-shadow-xl shadow-white"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                    {stat.value}
                  </h3>
                  <p className="text-gray-400 text-lg">{stat.title}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>
      <div className="features flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-gray-300 mb-5">Our Features</h1>
      <motion.div
              className="grid grid-cols-2 gap-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { title: "Skin Diagnosis ai", value: "Skin Diagnosis" },
                { title: "Tumor Detection ai", value: "Tumor Detection" },
                { title: "Report Summarizer ai", value: "Report Summarizer" },
                { title: "Parkinson's Detector ai", value: "Parkinson's Detector" },
                { title: "RareDx ai", value: "RareDx" },
              ].map((stat) => (
                <motion.div
                  key={stat.title}
                  className="p-8 rounded-3xl bg-gray-800 shadow-sm drop-shadow-xl shadow-white"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                    {stat.value}
                  </h3>
                  <p className="text-gray-400 text-lg">{stat.title}</p>
                </motion.div>
              ))}
            </motion.div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-gray-500">&copy; 2024 AI Diagnostic Tool. All rights reserved.</p>
          <div className="flex space-x-6">
            <button className="px-6 py-2 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 transition">
              Privacy
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 transition">
              Terms
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 transition">
              Support
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
