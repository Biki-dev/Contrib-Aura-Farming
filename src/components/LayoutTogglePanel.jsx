import React, { useState } from "react";
import { Layout, ChevronDown } from "lucide-react";

export default function LayoutTogglePanel({ components, onToggle, onPreset }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleLabels = {
    profile: "GitHub Profile",
    heatmap: "Contribution Heatmap",
    mergedGrid: "Merged PRs Grid",
    topRepos: "Top Repos Summary",
  };

  const presets = [
    { key: "profileHeatmap", label: "Profile + Heatmap" },
    { key: "profileTopRepos", label: "Profile + Top Repos" },
    { key: "profileMergedGrid", label: "Profile + PR Grid" },
    { key: "heatmapOnly", label: "Heatmap Only" },
    { key: "all", label: "All Components" },
  ];

  return (
    <div className="mb-4 border rounded-lg bg-white shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-2">
          <Layout className="w-5 h-5 text-gray-700" />
          <span className="font-medium text-gray-900">Layout & Features</span>
          <span className="text-sm text-gray-500">
            ({Object.values(components).filter(Boolean).length} selected)
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t">
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Quick Presets
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {presets.map((preset) => (
                <button
                  key={preset.key}
                  onClick={() => onPreset(preset.key)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Components
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(toggleLabels).map(([key, label]) => (
                <label
                  key={key}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={components[key]}
                    onChange={() => onToggle(key)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}