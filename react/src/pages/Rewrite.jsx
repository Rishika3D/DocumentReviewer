import React, { useState } from 'react';
import NavSum from '../components/NavSum';
import axios from 'axios';

const Rewrite = () => {
  const [tone, setTone] = useState('');
  const [style, setStyle] = useState('');
  const [audience, setAudience] = useState('');
  const [prompt, setPrompt] = useState('');

  const toneOptions = [
    "Formal", "Informal", "Professional", "Friendly", "Humorous",
    "Encouraging", "Empathetic", "Assertive", "Neutral", "Persuasive", "Critical"
  ];

  const styleOptions = [
    "Bullet Points", "Narrative", "Essay", "Dialogue", "Storytelling",
    "Technical Writing", "Journalistic", "Poetic", "Academic", "Creative"
  ];

  const audienceOptions = [
    "General Public", "Kids", "College Students", "Professionals", "Executives",
    "Researchers", "Beginners", "Advanced Learners", "Investors", "Clients"
  ];

  const handleRewrite = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/rewrite", {
        prompt,
        tone,
        style,
        audience,
      });

      console.log("Rewritten Text:", response.data.rewrittenText);

    } catch (err) {
      console.error("Rewrite failed", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <NavSum />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Rewrite Document</h1>
          <p className="text-gray-600 mb-8">
            Modify the selected document based on different criteria.
          </p>

          <div className="space-y-6">

            <div>
              <label htmlFor="tone" className="block mb-1 font-medium">Tone</label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3"
              >
                <option value="">Select Tone</option>
                {toneOptions.map((i, idx) => (
                  <option value={i} key={idx}>{i}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="style" className="block mb-1 font-medium">Style</label>
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3"
              >
                <option value="">Select Style</option>
                {styleOptions.map((i, idx) => (
                  <option value={i} key={idx}>{i}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="audience" className="block mb-1 font-medium">Target Audience</label>
              <select
                id="audience"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3"
              >
                <option value="">Select Audience</option>
                {audienceOptions.map((i, idx) => (
                  <option value={i} key={idx}>{i}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="prompt" className="block mb-1 font-medium">Prompt</label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter the content you want to rewrite..."
                className="w-full border border-gray-300 rounded-lg p-3 h-40 resize-none"
              />
            </div>

            <button
              onClick={handleRewrite}
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
              disabled={!tone || !style || !audience || !prompt}
            >
              Rewrite
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewrite;
