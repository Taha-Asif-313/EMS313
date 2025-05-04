"use client";
import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { RiMenu4Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 1024) {
      setIsMenuOpen(true);
    }
  }, []);

  return (
    <nav className="absolute top-0 left-0 w-full z-30 p-4 max-lg:p-5 lg:px-20 flex items-center justify-between bg-transparent">
      
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.svg" alt="logo" className="w-8 h-8" />
        <span className="text-xl font-bold">
          EMS
          <span className="text-primary">313</span>
        </span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden lg:flex items-center gap-6">
        <Link to="/" className="text-sm hover:text-primary transition">Home</Link>
        <Link to="/docs" className="text-sm hover:text-primary transition">Pricing</Link>
        <Link to="/about" className="text-sm hover:text-primary transition">About</Link>
        <Link to="/templates" className="text-sm hover:text-primary transition">Guide</Link>
        <button
          onClick={() => navigate("/signup")}
          className="flex items-center gap-2 bg-primary hover:bg-black text-white px-4 py-2 text-sm rounded-md transition"
        >
          Get Started <FaExternalLinkAlt className="text-xs" />
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden z-40">
        {isMenuOpen ? (
          <IoClose
            className="text-3xl cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          />
        ) : (
          <RiMenu4Line
            className="text-3xl cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          />
        )}
      </div>

      {/* Drawer Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white text-black shadow-lg transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-30 p-6 flex flex-col gap-8 lg:hidden`}>
        
        {/* Logo inside Drawer */}
        <Link 
          to="/" 
          className="flex items-center gap-2 mb-6" 
          onClick={() => setIsMenuOpen(false)}
        >
          <img src="/logo.svg" alt="logo" className="w-8 h-8" />
          <span className="text-xl font-bold text-black">
            EMS
            <span className="text-primary">313</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <Link to="/" className="text-sm hover:text-primary transition" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/docs" className="text-sm hover:text-primary transition" onClick={() => setIsMenuOpen(false)}>Docs</Link>
        <Link to="/about" className="text-sm hover:text-primary transition" onClick={() => setIsMenuOpen(false)}>About</Link>
        <Link to="/templates" className="text-sm hover:text-primary transition" onClick={() => setIsMenuOpen(false)}>Templates</Link>
        
        {/* Button */}
        <button
          onClick={() => {
            setIsMenuOpen(false);
            navigate("/signup");
          }}
          className="flex items-center gap-2 bg-primary hover:bg-black text-white px-4 py-2 text-sm rounded-md transition mt-6"
        >
          Get Started <FaExternalLinkAlt className="text-xs" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
