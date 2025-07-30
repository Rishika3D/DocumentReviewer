import React, { useState } from 'react';
import Navbar from '../components/NavSum';


const Summarise = () => {
  const [summary, setSummary] = useState('');
  const [length, setLength] = useState('');

  const handleSummarize = () => {
    // Placeholder for API call
    console.log('Requested summary of length:', length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">Summarize Text</h1>
        <p className="text-gray-600 mb-8">Generate a concise summary of the selected document.</p>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Summary Length</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter summary length"
          />
        </div>

        <button
          onClick={handleSummarize}
          className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-2 rounded-md mb-6 transition"
        >
          Generate Summary
        </button>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Summary</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={10}
            className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Summary will appear here"
          />
        </div>
      </div>
    </div>
  );
};

export default Summarise;
