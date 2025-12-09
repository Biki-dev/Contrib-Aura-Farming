import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function YearSelect({ year, years, onYearChange, theme, t }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isDark = theme === "dark" || theme === "midnight";

  return (
    <div ref={ref} className="relative inline-block text-left">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`
          flex items-center justify-between gap-2 px-3 py-1.5 rounded-md text-sm min-w-[90px]
          border ${t.border} ${t.shadow}
          ${isDark ? "bg-neutral-900 text-neutral-100" : "bg-white text-gray-900"}
        `}
      >
        <span className="tabular-nums">{year}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : ""
          } ${isDark ? "text-neutral-400" : "text-gray-500"}`}
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          className={`
            absolute z-50 mt-1 w-full rounded-md border ${t.border}
            ${isDark ? "bg-neutral-900 text-neutral-100" : "bg-white text-gray-900"}
            shadow-lg overflow-hidden
          `}
        >
          {years.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => {
                onYearChange(y);
                setOpen(false);
              }}
              className={`
                block w-full text-left px-3 py-1.5 text-sm tabular-nums
                ${y === year
                  ? isDark
                    ? "bg-neutral-800 font-medium"
                    : "bg-gray-100 font-medium"
                  : isDark
                    ? "hover:bg-neutral-800"
                    : "hover:bg-gray-100"}
              `}
            >
              {y}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
