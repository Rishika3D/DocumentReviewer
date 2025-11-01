// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Rewrite from './pages/Rewrite';
import Summarise from './pages/Summarise';
import GetHelp from './pages/GetHelp';
import Edit from './pages/Edit'; 
import GrammarCheck from './pages/GrammarCheck';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rewrite" element={<Rewrite />} />
        <Route path="/summarise" element={<Summarise />} />
        <Route path="/help" element={<GetHelp />} />
        <Route path='/edit' element={<Edit />} />
        <Route path='/grammar' element={<GrammarCheck />} />
      </Routes>
    </Router>
  );
}

export default App;
