import { useState } from 'react'
import LandingPage from "./components/LandingPage"
import './App.css'
import SkinCancerDetection from './components/SkinCancer'
import LandingPage from './components/LandingPage'
import { Routes, Route } from 'react-router-dom'
function App() {


  return (
    <div className='m-0 p-0'>
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/skin" element={<SkinCancerDetection />} />
</Routes>
    </div>
  )
}

export default App
