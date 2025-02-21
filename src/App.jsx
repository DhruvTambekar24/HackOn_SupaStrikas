import { useState } from 'react'
import LandingPage from "./components/LandingPage"
import './App.css'
import SkinCancerDetection from './components/SkinCancer'

function App() {


  return (
    <div className='m-0 p-0 w-screen h-screen'>
            <nav className="w-full py-6 px-8 bg-white text-black">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
            AI Diagnostic Tool
          </h2>
          <div className="flex space-x-6">
            <button className="px-6 py-2 rounded-full bg-gray-900 text-gray-100 hover:bg-gray-800 transition">Features</button>
            <button className="px-6 py-2 rounded-full bg-gray-900 text-gray-100 hover:bg-gray-800 transition">About</button>
            <button className="px-6 py-2 rounded-full bg-gray-900 text-gray-100 hover:bg-gray-800 transition">Contact</button>
          </div>
        </div>
      </nav>
      {/* <LandingPage/> */}
    <SkinCancerDetection/>
    </div>
  )
}

export default App
