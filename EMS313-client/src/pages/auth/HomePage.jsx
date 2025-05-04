"use client";

import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom"; // Assuming you might want the button to navigate later
import Navbar from "../../components/Navbar";

const HomePage = () => {
  return (
    <>
      {/* Navbar if needed */}
      <Navbar />

      {/* Main Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between p-4 lg:px-20 min-h-screen bg-white text-black gap-10 lg:gap-0">
        
        {/* Left Content */}
        <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-6 w-full lg:w-1/2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center lg:text-left">
            Welcome to <span className="text-primary">EMS</span> 313!
          </h1>

          <p className="text-sm md:text-base text-center lg:text-left leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia ipsam illo
            reprehenderit dolore quod, labore a deleniti fugit quos repudiandae temporibus,
            laudantium dolor id quam laboriosam deserunt, maxime in quia.
          </p>

          <button className="flex items-center gap-2 bg-primary hover:bg-black transition text-white font-medium text-sm py-2 px-8 rounded-full">
            Get Started
            <FaExternalLinkAlt />
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center items-center w-full lg:w-1/2">
          <img
            src="/hero.png"
            alt="Hero Illustration"
            className="w-full max-w-md lg:max-w-full object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
