import React from "react";
import { THEMES } from "../constants/themes";

export default function MergedPRsGrid({ repos, theme }) {
  const t = THEMES[theme] || THEMES.classic;

  if (!repos || repos.length === 0) {
    return (
      <div className={`text-center py-10 ${t.textTertiary}`}>
        No repositories with merged PRs found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {repos.map((r) => (
        <div 
          key={r.full_name} 
          className={`p-4 ${t.border} border rounded-lg ${t.cardBg} ${t.shadow}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <a
                href={r.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-medium text-lg ${t.accent} hover:underline`}
              >
                {r.full_name}
              </a>
              <div className={`text-sm ${t.textSecondary} line-clamp-2`}>
                {r.description || 'No description'}
              </div>
            </div>
            <div className="text-sm text-center ml-4">
              <div className="font-bold text-lg text-yellow-500">{r.stars}</div>
              <div className="text-xs text-yellow-500">★ stars</div>
            </div>
          </div>

          <div className="mt-3">
            <div className={`text-sm font-semibold mb-1 ${t.text}`}>
              Merged PRs ({r.prs.length})
            </div>
            <ul className={`list-disc list-inside text-sm ${t.textSecondary}`}>
              {r.prs.slice(0, 5).map((pr) => (
                <li key={pr.url} className="truncate">
                  <a 
                    className={`${t.accent} hover:underline`} 
                    href={pr.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {pr.title}
                  </a>
                </li>
              ))}
              {r.prs.length > 5 && (
                <li className={`text-xs ${t.textTertiary}`}>
                  and {r.prs.length - 5} more…
                </li>
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}