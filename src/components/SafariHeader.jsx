import React from "react";
import { THEMES } from "../constants/themes";

export default function SafariHeader({ url = "https://github.com/your-username", title = "", theme = "classic" }) {
  const t = THEMES[theme] || THEMES.classic;

  return (
    <div className={`flex items-center gap-3 px-4 py-2 ${t.header} ${t.border} border-b`}>
      {/* Traffic lights */}
      <div className="flex gap-1.5">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>

      {/* Center URL bar */}
      <div className="flex-1 flex justify-center">
        <div className={`flex items-center gap-2 px-3 py-1 ${theme === 'classic' ? 'bg-white/90' : 'bg-black/20'} ${t.border} border rounded-full text-xs ${t.textSecondary} max-w-md w-full`}>
          <span className={`w-3 h-3 rounded-full ${t.border} border ${t.cardBg}`} />
          <span className="truncate">{url}</span>
        </div>
      </div>

      {/* Right side (optional title / text) */}
      <div className={`hidden sm:flex text-[11px] ${t.textTertiary} whitespace-nowrap`}>
        {title || "Safari"}
      </div>
    </div>
  );
}