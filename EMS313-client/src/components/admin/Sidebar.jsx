"use client";

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";

const navLinks = [
  { label: "Dashboard", path: "/admin" },
  { label: "Manage Employees", path: "/admin/manage-employees" },
  { label: "Manage Tasks", path: "/admin/manage-employees-tasks" },
  {
    label: "Settings",
    dropdown: [
      { label: "Profile", path: "/admin/admin-profile" },
      { label: "Account", path: "/settings/account" },
    ],
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
    }
  }, []);

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <>
      {/* Mobile Topbar */}
      <div className="fixed top-0 left-0 w-full flex items-center justify-between bg-black text-white p-4 lg:hidden z-30 shadow-md">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
          <span className="text-xl font-bold">
            EMS<span className="text-primary">313</span>
          </span>
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2"
        >
          {isSidebarOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-[#0f0f0f] text-white p-6 flex flex-col gap-2 transition-transform duration-300 ease-in-out rounded-r-xl shadow-2xl z-40
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:shadow-none`}
      >
        {/* Logo inside Sidebar */}
        <Link
          to="/"
          className="flex items-center gap-2 mb-6"
          onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}
        >
          <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
          <span className="text-2xl font-bold">
            EMS<span className="text-primary">313</span>
          </span>
        </Link>

        {/* Navigation */}
        <ul className="flex flex-col gap-2 text-sm">
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.dropdown ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className="w-full flex items-center justify-between hover:bg-green-400/10 hover:text-primary p-2 rounded-md transition"
                  >
                    <span>{link.label}</span>
                    {openDropdown === link.label ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                  {openDropdown === link.label && (
                    <ul className="mt-2 ml-4 flex flex-col gap-2">
                      {link.dropdown.map((subLink) => (
                        <li key={subLink.label}>
                          <Link
                            to={subLink.path}
                            className={`block p-2 rounded-md hover:bg-green-400/10 hover:text-primary transition ${
                              location.pathname === subLink.path
                                ? "bg-white/10"
                                : ""
                            }`}
                            onClick={() =>
                              window.innerWidth < 1024 &&
                              setIsSidebarOpen(false)
                            }
                          >
                            {subLink.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={link.path}
                  className={`block p-2 rounded-md hover:bg-green-400/10 hover:text-primary transition ${
                    location.pathname === link.path ? "bg-white/10" : ""
                  }`}
                  onClick={() =>
                    window.innerWidth < 1024 && setIsSidebarOpen(false)
                  }
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
