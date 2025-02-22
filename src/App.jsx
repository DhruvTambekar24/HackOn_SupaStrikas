import { Routes, Route, Navigate , Link } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SkinCancerDetection from "./components/SkinCancer";
import Home from "./components/HomePage";
import NotFound from "./components/NotFound";
import BrainTumour from "./components/BrainTumour";
import Records from "./components/Reports";
import ParkinsonPredictor from "./components/Parkinson";
import FileUpload from "./components/FileUpload"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import Profile from "./components/Profile";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="w-full py-4 px-8 flex justify-between items-center border-b border-gray-800 bg-gray-800">
              <Link to="/home"> 
      <h2 className="text-3xl font-extrabold tracking-tighter bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
            DiagnoseAi
          </h2>
          </Link>

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

<Route path="/" element={<LandingPage />} />
        <Route
          path="/rare-disease"
          element={
            <>
              <SignedIn>
                <FileUpload />
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
        <Route
          path="/profile"
          element={
            <>
              <SignedIn>
                <Profile/>
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
