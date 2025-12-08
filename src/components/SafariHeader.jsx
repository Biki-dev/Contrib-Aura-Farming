import React from "react";

export default function SafariHeader({ url = "https://github.com/your-username", title = "" }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-[#f5f5f7] border-b border-gray-200">
      {/* Traffic lights */}
      <div className="flex gap-1.5">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>

      {/* Center URL bar */}
      <div className="flex-1 flex justify-center">
        <div className="flex items-center gap-2 px-3 py-1 bg-white/90 border border-gray-200 rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.02)] text-xs text-gray-600 max-w-md w-full">
          <span className="w-3 h-3 rounded-full border border-gray-300 bg-gray-100" />
          <span className="truncate">{url}</span>
        </div>
      </div>

      {/* Right side (optional title / text) */}
      <div className="hidden sm:flex text-[11px] text-gray-500 whitespace-nowrap">
        {title || "Safari"}
      </div>
    </div>
  );
}
