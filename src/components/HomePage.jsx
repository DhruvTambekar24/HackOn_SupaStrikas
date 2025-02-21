import React from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-8">
        Welcome to AI Diagnostic Tool
      </h1>

      <div className="space-y-6">
        {/* Show buttons only if the user is signed in */}
        <SignedIn>
          <div className="flex space-x-6">
            <Link to="/skin">
              <button className="px-6 py-3 bg-violet-600 rounded-full text-lg font-semibold hover:bg-violet-700 transition">
                Skin Diagnosis
              </button>
            </Link>
            <Link to="/tumour">
              <button className="px-6 py-3 bg-cyan-600 rounded-full text-lg font-semibold hover:bg-cyan-700 transition">
                Tumour Detection
              </button>
            </Link>
            <Link to="/report">
              <button className="px-6 py-3 bg-cyan-600 rounded-full text-lg font-semibold hover:bg-cyan-700 transition">
                Report Summarizer
              </button>
            </Link>
            <Link to="/parkinson">
              <button className="px-6 py-3 bg-cyan-600 rounded-full text-lg font-semibold hover:bg-cyan-700 transition">
                Parkinson's Predictor
              </button>
            </Link>
          </div>
        </SignedIn>

        {/* Show sign-in button if user is not logged in */}
        <SignedOut>
          <SignInButton>
            <button className="px-6 py-3 bg-gray-800 rounded-full text-lg font-semibold hover:bg-gray-700 transition">
              Sign In to Access
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
};

export default HomePage;
