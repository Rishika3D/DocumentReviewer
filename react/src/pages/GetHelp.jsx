import React, { useState } from 'react';
import NavSum from '../components/NavSum';

const GetHelp = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: connect this with your backend
    console.log({ subject, message, email });
    setSubmitted(true);

    // reset
    setSubject('');
    setMessage('');
    setEmail('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <NavSum />
      </div>

      <main className="flex-1 px-8 py-12 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Get Help</h1>
        <p className="text-gray-600 mb-6">We're here to assist you. Fill out the form and we'll get back to you soon.</p>

        {submitted ? (
          <div className="bg-green-100 border border-green-300 text-green-800 p-4 rounded">
            ✅ Your message has been submitted successfully. We'll reach out shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block font-medium mb-1">Your Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block font-medium mb-1">Subject</label>
              <input
                id="subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What's the issue?"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-medium mb-1">Message</label>
              <textarea
                id="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe the issue in detail..."
                className="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none"
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Submit
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default GetHelp;
