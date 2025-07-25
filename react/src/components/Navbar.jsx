import React, { useState, useEffect, useRef } from "react";
import Menu from "./Menu"; // 👈 your dropdown component
import avatarImg from "../assets/avatar.png"; // 👈 replace with dynamic Google avatar URL when ready
import { FiSearch } from 'react-icons/fi'

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(true); // toggle this for testing
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
      {/* Logo / Brand */}
      <div className="text-xl font-bold text-gray-800">DocuReview</div>

      {/* Search Bar */}
      
      <div className="relative w-1/2">
      <input
        type="text"
        placeholder="Search documents..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
    </div>


      {/* Right Section */}
      <div className="relative" ref={menuRef}>
        {isLogged ? (
          <>
            <img
              src={avatarImg} // replace with dynamic Google profile pic if needed
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
    </nav>
  );
};

export default Navbar;
