import { useState } from 'react'
import LandingPage from "./components/LandingPage"
import './App.css'
import SkinCancerDetection from './components/SkinCancer'

function App() {


  return (
    <div className='m-0 p-0'>
      {/* <LandingPage/> */}
    <SkinCancerDetection/>
    </div>
  )
}

export default App
