import React, { useState, useEffect, useRef } from "react";
import Menu from "./Menu";
import avatarImg from "../assets/avatar.png";
import { FiSearch } from 'react-icons/fi';
import { Link } from "react-router-dom"; // Import Link for navigation

const NavSum = () => {
  const [isLogged, setIsLogged] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md relative z-50">
      {/* Brand + Links */}
      <div className="flex items-center gap-12">
        <div className="text-xl font-bold text-gray-900">
        <Link to="/" className="text-xl font-bold text-gray-900 hover:text-neutral-700">
  DocuReviewer
</Link>
                </div>
        <div className="flex gap-8 text-sm font-medium text-gray-700">
          <a href="#" className="hover:text-black">Dashboard</a>
          <a href="#" className="hover:text-black">Documents</a>
          <a href="#" className="hover:text-black">Tools</a>
          <a href="#" className="hover:text-black">Help</a>
        </div>
      </div>

      {/* Right Side - Search + Avatar */}
      <div className="flex items-center gap-6">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="relative" ref={menuRef}>
          {isLogged ? (
            <>
              <img
                src={avatarImg}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
                onClick={() => setMenuOpen((prev) => !prev)}
              />
              {menuOpen && <Menu onClose={() => setMenuOpen(false)} />}
            </>
          ) : (
            <div className="flex gap-4">
              <button className="text-black text-sm px-4 py-2 rounded-full hover:bg-gray-100 transition">
                Log In
              </button>
              <button className="bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-gray-800 transition">
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavSum;
