
import './App.css'
import SkinCancerDetection from './components/SkinCancer'
import LandingPage from './components/LandingPage'
import { Routes, Route } from 'react-router-dom'
function App() {


  return (
    <div className='m-0 p-0'>
            {/* <nav className="w-full py-6 px-8 bg-gradient-to-br from-rose-200 via-white to-white text-black "> */}
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
      </nav>
  
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/skin" element={<SkinCancerDetection />} />
</Routes>
    </div>
  )
}

export default App
