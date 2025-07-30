import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Summarise from './pages/Summarise';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route goes to Home */}
        <Route path="/" element={<Home />} />

        {/* Tools */}
        <Route path="/summarise" element={<Summarise />} />
        
        {/* Future pages like grammar, rewrite, etc. */}
        {/* <Route path="/rewrite" element={<Rewrite />} /> */}
        {/* <Route path="/grammar" element={<Grammar />} /> */}

        {/* Catch-all fallback (optional but nice) */}
        <Route path="*" element={<h2 className="text-center mt-10 text-gray-600">404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
