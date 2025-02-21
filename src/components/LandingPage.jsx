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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <header className="w-full py-4 px-8 flex justify-between items-center border-b border-gray-800">
      <h2 className="text-3xl font-extrabold tracking-tighter bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
            DiagnoseAi
          </h2>

        <div className="flex space-x-4">
          <SignedOut>
            <SignInButton>
              <button className="px-6 py-2 rounded-full bg-violet-600 hover:bg-violet-700 transition">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>

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
                    <button className="px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-lg hover:shadow-lg transition-shadow duration-200">
                      Get Started
                    </button>
                  </Link>
                  <Link to="/profile">
                    <button className="px-8 py-4 rounded-full bg-gray-800 text-white font-semibold text-lg hover:bg-gray-700 transition-colors duration-200">
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
                { title: "Accuracy Rate", value: "99.9%" },
                { title: "Diseases Covered", value: "5000+" },
                { title: "Medical Partners", value: "200+" },
                { title: "Patient Success", value: "50k+" },
              ].map((stat) => (
                <motion.div
                  key={stat.title}
                  className="p-8 rounded-3xl bg-gray-800 shadow-lg"
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
