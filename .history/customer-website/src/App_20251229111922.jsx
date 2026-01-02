import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css' // Tailwind directives included

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      
      {/* Logos */}
      <div className="flex space-x-8 mb-8">
        <a href="https://vite.dev" target="_blank" className="hover:filter hover:drop-shadow-[0_0_20px_#646cffaa]">
          <img src={viteLogo} className="h-24" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="hover:filter hover:drop-shadow-[0_0_20px_#61dafbaa]">
          <img src={reactLogo} className="h-24 animate-spin-slow" alt="React logo" />
        </a>
      </div>

      {/* Counter */}
      <div className="text-center p-8 bg-green-800 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4 ">Vite + React + Tailwind</h1>
        <button 
          onClick={() => setCount(count + 1)} 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          count is {count}
        </button>
      </div>

      {/* Info text */}
      <p className="mt-6 text-gray-400">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
