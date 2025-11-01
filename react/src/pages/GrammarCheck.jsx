"use client";
import React, { useState } from "react";
import Navbar from "../components/NavSum";

const GrammarCheck = () => {
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // ChatGPT-style typewriter
  const typeWriter = (text) => {
    setOutput("");
    let i = 0;
    const interval = setInterval(() => {
      setOutput((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 20);
  };

  const handleGrammarCheck = async () => {
    if (!inputText.trim()) return alert("Bruh, put some text first 😭");

    try {
      setLoading(true);
      setOutput("Fixing your grammar... hold tight 🚀");

      const res = await fetch("http://localhost:5000/grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await res.json();
      const correctedText = data.corrected || "No correction generated.";

      typeWriter(correctedText);
    } catch (err) {
      console.error(err);
      setOutput("⚠️ Error: backend is acting goofy. Fix it ASAP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-3 text-gray-900">
          Grammar Corrector
        </h1>
        <p className="text-gray-600 mb-6">
          Paste text and let AI professionally fix grammar & tone.
        </p>

        {/* Input */}
        <textarea
          rows="8"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full border p-4 rounded-md mb-4 focus:ring-2 focus:ring-black"
          placeholder="Write or paste your paragraph here..."
        />

        <button
          onClick={handleGrammarCheck}
          disabled={loading}
          className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition mb-5"
        >
          ✅ Fix Grammar
        </button>

        {/* Output */}
        <div className="border bg-white p-4 rounded-md min-h-[150px] whitespace-pre-wrap">
          {output || "AI corrected text will appear here 👇"}
          {loading && <span className="animate-pulse ml-2">▌</span>}
        </div>
      </div>
    </div>
  );
};

export default GrammarCheck;
