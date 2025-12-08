import React from "react";

export default function SafariHeader({ url = "https://github.com/your-username", title = "", theme = "classic" }) {
  const THEMES = {
    classic: {
      header: "bg-[#f5f5f7]",
      border: "border-gray-200",
      textSecondary: "text-gray-600",
      textTertiary: "text-gray-500",
      cardBg: "bg-gray-100"
    },
    midnight: {
      header: "bg-slate-800",
      border: "border-slate-700",
      textSecondary: "text-slate-300",
      textTertiary: "text-slate-400",
      cardBg: "bg-slate-800"
    },
    sunset: {
      header: "bg-gradient-to-r from-orange-100 to-pink-100",
      border: "border-orange-200",
      textSecondary: "text-orange-800",
      textTertiary: "text-orange-600",
      cardBg: "bg-white/80"
    },
    violet: {
      header: "bg-gradient-to-r from-purple-100 to-fuchsia-100",
      border: "border-purple-200",
      textSecondary: "text-purple-700",
      textTertiary: "text-purple-500",
      cardBg: "bg-white/90"
    },
    ocean: {
      header: "bg-gradient-to-r from-blue-100 to-cyan-100",
      border: "border-blue-200",
      textSecondary: "text-blue-700",
      textTertiary: "text-blue-500",
      cardBg: "bg-white/80"
    },
    forest: {
      header: "bg-gradient-to-r from-green-100 to-emerald-100",
      border: "border-green-200",
      textSecondary: "text-green-800",
      textTertiary: "text-green-600",
      cardBg: "bg-white/90"
    },
    dark: {
      header: "bg-gray-900",
      border: "border-gray-800",
      textSecondary: "text-gray-300",
      textTertiary: "text-gray-400",
      cardBg: "bg-gray-900"
    },
    neon: {
      header: "bg-gray-900 border-b-2 border-green-500",
      border: "border-green-500",
      textSecondary: "text-cyan-400",
      textTertiary: "text-pink-400",
      cardBg: "bg-gray-900"
    }
  };

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