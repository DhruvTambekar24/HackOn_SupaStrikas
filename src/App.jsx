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
