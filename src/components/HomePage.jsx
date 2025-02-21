import React from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-24 gap-2 bg-gradient-to-br  from-gray-800 via-gray-800 to-gray-950 text-transparent p-6">
      <h1 className="text-4xl h-12  font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text  mb-8">
        Welcome to <span className="text-4xl tracking-tighter font-extrabold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text">DiagnoseAI </span>
      </h1>
      <h2 className="text-xl mb-12 font-semibold text-gray-300">
        Select what you want to do ~
      </h2>

      <div className="space-y-6">
        {/* Show buttons only if the user is signed in */}
        <SignedIn>
          <div className="flex space-x-6">
            <Link to="/skin">
              <button className="px-6 py-6 transition-all duration-400 bg-gray-200/50 text-black hover:text-white border-2 hover:border-b-4 hover:scale-105 rounded-lg text-xl font-semibold hover:bg-violet-700 active:bg-violet-700 ">
                Skin Diagnosis
              </button>
            </Link>
            <Link to="/tumour">
            <button className="px-6 py-6 transition-all duration-400 bg-gray-200/50 text-black hover:text-white border-2 hover:border-b-4 hover:scale-105 rounded-lg text-xl font-semibold hover:bg-violet-700 active:bg-violet-700 ">
            Tumour Detection
              </button>
            </Link>
            <Link to="/report">
            <button className="px-6 py-6 transition-all duration-400 bg-gray-200/50 text-black hover:text-white border-2 hover:border-b-4 hover:scale-105 rounded-lg text-xl font-semibold hover:bg-violet-700 active:bg-violet-700 ">
            Report Summarizer
              </button>
            </Link>
            <Link to="/parkinson">
            <button className="px-6 py-6 text-xl transition-all duration-400 bg-gray-200/50 text-black hover:text-white border-2 hover:border-b-4 hover:scale-105 rounded-lg font-semibold hover:bg-violet-700 active:bg-violet-700 ">
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
