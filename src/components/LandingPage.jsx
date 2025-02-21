import React from 'react';
import { motion } from "framer-motion";
import {Link} from 'react-router-dom'

export default function LandingPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 via-white to-rose-50">
      {/* Navigation */}


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
                <h1 className="text-6xl font-bold leading-tight bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  AI-Powered Diagnostic Platform
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  Revolutionizing healthcare with advanced machine learning algorithms that provide accurate diagnoses and accelerate early detection of rare diseases.
                </p>
              </motion.div>

              <motion.div
                className="flex space-x-4"
                {...fadeInUp}
                transition={{ delay: 0.4 }}
              >
                <Link to="/skin" >
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-lg hover:shadow-lg transition-shadow duration-200">
                  Get Started
                </button>
                </Link>
                <button className="px-8 py-4 rounded-full bg-gray-900 text-white font-semibold text-lg hover:bg-gray-800 transition-colors duration-200">
                  Learn More
                </button>
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
                { title: "Accuracy Rate", value: "99.9%" },
                { title: "Diseases Covered", value: "5000+" },
                { title: "Medical Partners", value: "200+" },
                { title: "Patient Success", value: "50k+" }
              ].map((stat) => (
                <motion.div
                  key={stat.title}
                  className="p-8 rounded-3xl bg-white shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent mb-3">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 text-lg">{stat.title}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-gray-600">&copy; 2024 AI Diagnostic Tool. All rights reserved.</p>
          <div className="flex space-x-6">
            <button className="px-6 py-2 rounded-full bg-gray-900 text-gray-100 hover:bg-gray-800 transition">Privacy</button>
            <button className="px-6 py-2 rounded-full bg-gray-900 text-gray-100 hover:bg-gray-800 transition">Terms</button>
            <button className="px-6 py-2 rounded-full bg-gray-900 text-gray-100 hover:bg-gray-800 transition">Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
}