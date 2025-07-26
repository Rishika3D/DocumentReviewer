import React, { useRef } from "react";
import { FaHome, FaCog } from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";

const LeftBar = () => {
  const fileInputRef = useRef(null);

  const handleNewDocumentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      // connect with your logic here
    }
  };

  return (
    <div className="bg-[#F3F4F6] h-screen w-[250px] flex flex-col justify-between px-2 pt-4">
      {/* Top Section */}
      <div className="flex flex-col gap-2">
        <button className="flex items-center gap-3 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 transition">
          <FaHome className="text-lg" />
          Home
        </button>

        <div className="relative group">
          <button className="flex items-center gap-3 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 transition w-full">
            <FaBoltLightning className="text-lg" />
            AI Tools
          </button>

          <div className="absolute left-full top-0 ml-2 hidden group-hover:flex flex-col bg-white border rounded-xl shadow-md w-40 p-2 z-50">
            <button className="text-left px-4 py-2 hover:bg-gray-100 rounded-md transition">Rewrite</button>
            <button className="text-left px-4 py-2 hover:bg-gray-100 rounded-md transition">Grammar Check</button>
            <button className="text-left px-4 py-2 hover:bg-gray-100 rounded-md transition">Summarize</button>
          </div>
        </div>

        <button className="flex items-center gap-3 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 transition">
          <CiStar className="text-lg" />
          Starred
        </button>

        <button className="flex items-center gap-3 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 transition">
          <FaCog className="text-lg" />
          Settings
        </button>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-2 px-2">
        <button className="text-gray-700 w-full py-2 px-4 rounded-xl hover:bg-gray-300 transition">
          Get Help
        </button>

        <button
          onClick={handleNewDocumentClick}
          className="bg-black text-white flex items-center gap-2 w-full py-3 px-4 rounded-2xl transition hover:bg-gray-900 mb-28"
        >
          <IoMdAdd className="text-xl" />
          New Document
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx"
        />
      </div>
    </div>
  );
};

export default LeftBar;
