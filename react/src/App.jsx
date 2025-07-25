import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar' 

function App() {


  return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
  
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Welcome to DocuReview</h1>
        </div>
      </div>
    );
  
}

export default App
