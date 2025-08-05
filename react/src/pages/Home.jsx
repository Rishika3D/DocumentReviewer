import "../App.css";
import Navbar from '../components/Navbar';
import LeftBar from '../components/LeftBar';
import Rewrite from "./Rewrite"; 


function Home() {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar without extra div */}
        <LeftBar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-5 py-4 bg-gray-50">
          <h1 className="text-4xl font-semibold">Documents</h1>
          <button></button>
          
        </main>
      </div>
    </div>
  );
}

export default Home;
