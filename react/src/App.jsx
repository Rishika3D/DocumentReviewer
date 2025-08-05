import "../App.css";
import Navbar from "../components/Navbar";
import LeftBar from "../components/LeftBar";
import Rewrite from "./pages/Rewrite";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="h-screen w-screen flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <Navbar />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <LeftBar />

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto px-5 py-4 bg-gray-50">
            <Routes>
              {/* Home Route */}
              <Route
                path="/"
                element={
                  <>
                    <h1 className="text-4xl font-semibold mb-4">Documents</h1>
                    <p className="text-gray-600">Welcome to your document dashboard.</p>
                  </>
                }
              />

              {/* Rewrite Route */}
              <Route path="/rewrite" element={<Rewrite />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
