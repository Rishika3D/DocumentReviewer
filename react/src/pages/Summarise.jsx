import React, { useState } from 'react';
import Navbar from '../components/NavSum';

const Summarise = () => {
  const [summary, setSummary] = useState('');
  const [inputText, setInputText] = useState('');
  const [length, setLength] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const typeWriter = (text) => {
    setSummary(""); 
    let i = 0;
    const interval = setInterval(() => {
      setSummary((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 25);
  };

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      alert("Paste text to summarize 🚨");
      return;
    }

    setIsLoading(true);
    setSummary("...thinking 🤖");

    try {
      const res = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, length }),
      });

      const data = await res.json();
      const output = data.summary || "No summary generated";
      typeWriter(output);
    } catch (error) {
      setSummary("⚠️ Error fetching summary");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">Summarize Text</h1>
        <p className="text-gray-600 mb-8">Get a clean TL;DR in seconds ✨</p>

        {/* Input Text */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Enter Text</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
            placeholder="Paste the content you want summarized..."
          />
        </div>

        {/* Summary Length */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Summary Length (words)</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Example: 100"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSummarize}
          className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-2 rounded-md mb-6 transition flex items-center gap-2 disabled:opacity-70"
          disabled={isLoading}
        >
          {isLoading ? "Summarizing..." : "Generate Summary"}
        </button>

        {/* Summary Output */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Summary</label>
          <div className="w-full px-4 py-3 border rounded-md shadow-sm bg-white min-h-[180px] whitespace-pre-wrap">
            {summary || "Output will appear here 👇"}
            {isLoading && <span className="animate-pulse ml-2">▌</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summarise;
