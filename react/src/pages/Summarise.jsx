import React from 'react'
import Navbar from '../components/Navbar'

const Summarise = () => {
  return (
    <div>
        <Navbar/>
        <h1>Summarize Text</h1>
        <p>Generate a concise summary of the selected document</p>
        <h3>Summary Length</h3>
        <input type="number" placeholder='Sumaary Length' />
        <button>Generate Summary</button>
        <h3>Summary</h3>
        <textarea placeholder='Summary will appear here' rows={10} cols={50} />

    </div>
  )
}

export default Summarise