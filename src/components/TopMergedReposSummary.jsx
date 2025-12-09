import React from "react";
import { Star, GitPullRequest } from "lucide-react";
import { THEMES } from "../constants/themes";

export default function TopMergedReposSummary({ repos, theme }) {
  const t = THEMES[theme] || THEMES.classic;

  if (!repos || repos.length === 0) {
    return null;
  }

  return (
    <div className={`mb-6 p-4 ${t.cardBg} ${t.border} border rounded-lg ${t.shadow}`}>
      <h3 className={`text-lg font-semibold mb-3 ${t.text}`}>
        Top Repositories by Stars
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {repos.map((repo) => (
          <a
            key={repo.full_name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 ${t.border} border rounded-lg hover:shadow-md transition ${theme === 'classic' ? 'bg-white' : 'bg-black/10'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className={`text-lg font-bold ${t.text}`}>
                {repo.stars}
              </span>
            </div>
            
            <div className={`text-sm font-medium ${t.text} truncate mb-1`}>
              {repo.full_name.split('/')[1]}
            </div>
            
            <div className={`text-xs ${t.textTertiary} truncate mb-2`}>
              {repo.full_name.split('/')[0]}
            </div>
            
            <div className={`flex items-center gap-1 text-xs ${t.textSecondary}`}>
              <GitPullRequest className="w-3 h-3" />
              <span>{repo.prs.length} PR{repo.prs.length !== 1 ? 's' : ''}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}