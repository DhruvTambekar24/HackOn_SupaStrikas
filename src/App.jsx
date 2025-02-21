import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import LandingPage from "./components/LandingPage";
import SkinCancerDetection from "./components/SkinCancer";
import Home from "./components/HomePage";
import NotFound from "./components/NotFound";
import BrainTumour from "./components/BrainTumour";
import Records from "./components/Reports";
import ParkinsonPredictor from "./components/Parkinson";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
                  {/* <nav className="w-full py-6 px-8 bg-gradient-to-br from-rose-200 via-white to-white text-black ">
                  <nav className="w-full py-6 px-8 bg-rose-100 text-black ">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h2 className="text-3xl font-extrabold tracking-tighter bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
            DiagnoseAi
          </h2>
          <div className="flex space-x-6">
            <button className="px-6 py-2 rounded-full bg-gray-900 text-gray-100 hover:bg-gray-800 transition">Features</button>
            <button className="px-6 py-2 rounded-full bg-gray-900 text-gray-100 hover:bg-gray-800 transition">About</button>
            <button className="px-6 py-2 rounded-full bg-gray-900 text-gray-100 hover:bg-gray-800 transition">Contact</button>
          </div>
        </div>
      </nav> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <>
              <SignedIn>
                <Home />
              </SignedIn>
              <SignedOut>
                <LandingPage />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/tumour"
          element={
            <>
              <SignedIn>
                <BrainTumour />
              </SignedIn>
              <SignedOut>
                <LandingPage />
              </SignedOut>
            </>
          }
        />

        {/* Protected Route for Skin Detection */}
        <Route
          path="/report"
          element={
            <>
              <SignedIn>
                <Records />
              </SignedIn>
              <SignedOut>
                <LandingPage />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/skin"
          element={
            <>
              <SignedIn>
                <SkinCancerDetection />
              </SignedIn>
              <SignedOut>
                <LandingPage />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/parkinson"
          element={
            <>
              <SignedIn>
                <ParkinsonPredictor/>
              </SignedIn>
              <SignedOut>
                <LandingPage />
              </SignedOut>
            </>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
