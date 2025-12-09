import React from "react";
import { Palette } from "lucide-react";
import { THEMES } from "../constants/themes";

export default function ThemeSelector({ theme, showMenu, onToggleMenu, onSelectTheme }) {
  return (
    <div className="relative">
      <button
        onClick={onToggleMenu}
        className="flex items-center gap-2 px-4 py-2 border rounded bg-white hover:bg-gray-50 transition"
      >
        <Palette className="w-4 h-4" />
        <span>Theme: {THEMES[theme].name}</span>
      </button>
      
      {showMenu && (
        <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-2 z-10 w-48">
          {Object.entries(THEMES).map(([key, themeObj]) => (
            <button
              key={key}
              onClick={() => onSelectTheme(key)}
              className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition ${
                theme === key ? 'bg-blue-50 text-blue-600 font-medium' : ''
              }`}
            >
              {themeObj.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}