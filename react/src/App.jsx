// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Rewrite from './pages/Rewrite';
import Summarise from './pages/Summarise';
import GetHelp from './pages/GetHelp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rewrite" element={<Rewrite />} />
        <Route path="/summarise" element={<Summarise />} />
        <Route path="/help" element={<GetHelp />} />
      </Routes>
    </Router>
  );
}

export default App;
