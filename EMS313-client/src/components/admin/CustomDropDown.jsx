import React, { useState, useRef, useEffect } from "react";

const CustomDropdown = ({ label, name, options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div
        className="border rounded p-2 cursor-pointer bg-white"
        onClick={() => setOpen(!open)}
      >
        {value || `Select ${label}`}
      </div>

      {open && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border rounded shadow-md z-10 max-h-40 overflow-y-auto">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                onChange({ target: { name, value: opt } });
                setOpen(false);
              }}
              className={`p-2 hover:bg-gray-100 cursor-pointer ${
                opt === value ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
