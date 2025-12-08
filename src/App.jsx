import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import GitHubProfileCard from "./components/GitHubProfileCard";
import SafariHeader from "./components/SafariHeader";
import { Palette, Github, Linkedin } from "lucide-react";

// Theme definitions
const THEMES = {
  classic: {
    name: "Classic",
    bg: "bg-white",
    cardBg: "bg-gray-50",
    text: "text-gray-900",
    textSecondary: "text-gray-600",
    textTertiary: "text-gray-500",
    border: "border-gray-200",
    header: "bg-[#f5f5f7]",
    accent: "text-blue-600",
    shadow: "shadow-sm"
  },
  midnight: {
    name: "Midnight",
    bg: "bg-slate-900",
    cardBg: "bg-slate-800",
    text: "text-white",
    textSecondary: "text-slate-300",
    textTertiary: "text-slate-400",
    border: "border-slate-700",
    header: "bg-slate-800",
    accent: "text-cyan-400",
    shadow: "shadow-xl shadow-cyan-500/10"
  },
  sunset: {
    name: "Sunset",
    bg: "bg-gradient-to-br from-orange-50 to-pink-50",
    cardBg: "bg-white/80 backdrop-blur",
    text: "text-gray-900",
    textSecondary: "text-orange-800",
    textTertiary: "text-orange-600",
    border: "border-orange-200",
    header: "bg-gradient-to-r from-orange-100 to-pink-100",
    accent: "text-orange-600",
    shadow: "shadow-lg shadow-orange-200/50"
  },
  violet: {
    name: "Violet Dreams",
    bg: "bg-gradient-to-br from-purple-100 via-violet-50 to-fuchsia-100",
    cardBg: "bg-white/90 backdrop-blur",
    text: "text-gray-900",
    textSecondary: "text-purple-700",
    textTertiary: "text-purple-500",
    border: "border-purple-200",
    header: "bg-gradient-to-r from-purple-100 to-fuchsia-100",
    accent: "text-purple-600",
    shadow: "shadow-lg shadow-purple-300/50"
  },
  ocean: {
    name: "Ocean Breeze",
    bg: "bg-gradient-to-br from-blue-50 to-cyan-50",
    cardBg: "bg-white/80 backdrop-blur",
    text: "text-gray-900",
    textSecondary: "text-blue-700",
    textTertiary: "text-blue-500",
    border: "border-blue-200",
    header: "bg-gradient-to-r from-blue-100 to-cyan-100",
    accent: "text-blue-600",
    shadow: "shadow-lg shadow-blue-200/50"
  },
  forest: {
    name: "Forest",
    bg: "bg-gradient-to-br from-green-50 to-emerald-50",
    cardBg: "bg-white/90 backdrop-blur",
    text: "text-gray-900",
    textSecondary: "text-green-800",
    textTertiary: "text-green-600",
    border: "border-green-200",
    header: "bg-gradient-to-r from-green-100 to-emerald-100",
    accent: "text-green-600",
    shadow: "shadow-lg shadow-green-200/50"
  },
  dark: {
    name: "Dark Mode",
    bg: "bg-gray-950",
    cardBg: "bg-gray-900",
    text: "text-gray-100",
    textSecondary: "text-gray-300",
    textTertiary: "text-gray-400",
    border: "border-gray-800",
    header: "bg-gray-900",
    accent: "text-indigo-400",
    shadow: "shadow-2xl shadow-indigo-500/10"
  },
  neon: {
    name: "Neon Glow",
    bg: "bg-black",
    cardBg: "bg-gray-900",
    text: "text-green-400",
    textSecondary: "text-cyan-400",
    textTertiary: "text-pink-400",
    border: "border-green-500",
    header: "bg-gray-900 border-b-2 border-green-500",
    accent: "text-pink-500",
    shadow: "shadow-2xl shadow-green-500/30"
  }
};

export default function GitHubContribScreenshot() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [mergedCount, setMergedCount] = useState(0);
  const [theme, setTheme] = useState("classic");
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const containerRef = useRef(null);
  const t = THEMES[theme];

  // Fetch merged PRs with simple pagination option (safe default: fetch up to 500 results)
  async function fetchMergedPRs(user) {
    const headers = token ? { Authorization: `token ${token}` } : {};
    const perPage = 100;
    let page = 1;
    let allItems = [];
    const safetyCap = 5;
    while (page <= safetyCap) {
      const q = `type:pr+author:${encodeURIComponent(user)}+is:merged`;
      const url = `https://api.github.com/search/issues?q=${q}&per_page=${perPage}&page=${page}`;
      const res = await fetch(url, { headers });
      if (!res.ok) {
        if (res.status === 403) {
          throw new Error("GitHub API rate limit reached. Try adding a personal access token.");
        } else if (res.status === 422) {
          throw new Error("Invalid search query — check the username.");
        } else {
          throw new Error(`GitHub search failed: ${res.status} ${res.statusText}`);
        }
      }
      const data = await res.json();
      const items = data.items || [];
      allItems = allItems.concat(items);
      if (items.length < perPage) break;
      page += 1;
    }
    return allItems;
  }

  async function fetchRepoDetails(owner, repo) {
    const url = `https://api.github.com/repos/${owner}/${repo}`;
    const headers = token ? { Authorization: `token ${token}` } : {};
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`Repo fetch failed: ${res.status} ${res.statusText}`);
    return res.json();
  }

  function parseRepoFullName(repository_url) {
    try {
      const parts = repository_url.split("/");
      const owner = parts[parts.length - 2];
      const repo = parts[parts.length - 1];
      return { owner, repo };
    } catch {
      return { owner: "unknown", repo: "unknown" };
    }
  }

  async function fetchProfile(user) {
    const headers = token ? { Authorization: `token ${token}` } : {};
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(user)}`, { headers });
    if (!res.ok) {
      if (res.status === 404) throw new Error("GitHub user not found.");
      if (res.status === 403) throw new Error("GitHub API rate limit reached. Try adding a token.");
      throw new Error(`Profile fetch failed: ${res.status} ${res.statusText}`);
    }
    return res.json();
  }

  async function load() {
    setError(null);
    setRepos([]);
    setProfile(null);
    setMergedCount(0);

    if (!username) return setError("Enter a GitHub username first.");
    setLoading(true);

    try {
      const prItems = await fetchMergedPRs(username.trim());
      setMergedCount(prItems.length);

      try {
        const prof = await fetchProfile(username.trim());
        setProfile(prof);
      } catch (profErr) {
        console.warn("profile fetch failed:", profErr);
      }

      const repoMap = new Map();
      prItems.forEach((item) => {
        const { owner, repo } = parseRepoFullName(item.repository_url);
        const key = `${owner}/${repo}`;
        if (!repoMap.has(key)) repoMap.set(key, { owner, repo, prs: [] });
        repoMap.get(key).prs.push({ title: item.title, url: item.html_url, number: item.number });
      });

      const repoPromises = Array.from(repoMap.values()).map(async (r) => {
        try {
          const details = await fetchRepoDetails(r.owner, r.repo);
          return {
            full_name: `${r.owner}/${r.repo}`,
            html_url: details.html_url,
            description: details.description,
            stars: Number(details.stargazers_count) || 0,
            prs: r.prs,
          };
        } catch (e) {
          return {
            full_name: `${r.owner}/${r.repo}`,
            html_url: `https://github.com/${r.owner}/${r.repo}`,
            description: "(unable to fetch description)",
            stars: 0,
            prs: r.prs,
          };
        }
      });

      const repoResults = await Promise.all(repoPromises);
      repoResults.sort((a, b) => (b.stars || 0) - (a.stars || 0));
      setRepos(repoResults);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  async function downloadScreenshot() {
    if (!containerRef.current) return;
    const canvas = await html2canvas(containerRef.current, { scale: 2, useCORS: true, logging: false });
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${username || "contribs"}-github-contribs-${theme}.png`;
    a.click();
  }

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans">
      <div className="flex items-center justify-between mb-6">
  <div>
    <h1 className="text-2xl font-bold mb-3">
      GitHub Contributions — Screenshot Generator
    </h1>
    <p className="mb-4 text-sm opacity-80">
      Enter your GitHub username. The tool finds merged PRs you authored and groups them by repo. Choose a theme to match your mood!
    </p>
  </div>

  {/* Icon Group */}
  <div className="flex items-center gap-2 sm:gap-3">
    <a
      href="https://github.com/Biki-dev"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-gray-100 transition"
      title="Visit GitHub"
    >
      <Github className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" />
    </a>

    <a
      href="https://www.linkedin.com/in/biki-dev/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-gray-100 transition"
      title="Visit LinkedIn"
    >
      <Linkedin className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" />
    </a>
  </div>
</div>


      <div className="flex gap-2 mb-4">
        <input
          className="border rounded px-3 py-2 flex-1"
          placeholder="GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border rounded px-3 py-2 w-72"
          placeholder="(optional) Personal Access Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button className="bg-slate-800 text-white px-4 py-2 rounded" onClick={load} disabled={loading}>
          {loading ? "Loading…" : "Load"}
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative">
          <button
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className="flex items-center gap-2 px-4 py-2 border rounded bg-white hover:bg-gray-50 transition"
          >
            <Palette className="w-4 h-4" />
            <span>Theme: {THEMES[theme].name}</span>
          </button>
          {showThemeMenu && (
            <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-2 z-10 w-48">
              {Object.entries(THEMES).map(([key, themeObj]) => (
                <button
                  key={key}
                  onClick={() => {
                    setTheme(key);
                    setShowThemeMenu(false);
                  }}
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
        
        <button
          className="px-4 py-2 border rounded bg-white hover:bg-gray-50 transition disabled:opacity-50"
          onClick={downloadScreenshot}
          disabled={repos.length === 0}
        >
          Download Screenshot
        </button>
      </div>

      <div className="mb-4 text-xs text-gray-600">
        Tips: If you hit rate limits, add a GitHub Personal Access Token (no special scopes required for public data). This tool paginates up to 500 merged PRs by default.
      </div>

      {error && <div className="mb-4 text-red-600">Error: {error}</div>}

      <div ref={containerRef} className={`${t.bg} transition-colors duration-300 rounded-xl`}>
        <div className={`rounded-xl ${t.shadow} ${t.border} border overflow-hidden`}>
          <SafariHeader
            url={username ? `https://github.com/${username}` : "https://github.com/your-username"}
            title="Contrib Aura Farming"
            theme={theme}
          />

          <div className="p-6">
            <GitHubProfileCard profile={profile} mergedCount={mergedCount} theme={theme} />

            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className={`text-xl font-semibold ${t.text}`}>
                  {username ? `${username}'s merged contributions` : "Your merged contributions"}
                </h2>
              </div>
              <div className={`text-sm ${t.textTertiary}`}>
                Generated {new Date().toLocaleString()}
              </div>
            </div>

            {repos.length === 0 ? (
              <div className={`text-center py-20 ${t.textTertiary}`}>
                No repos to show. Load merged PRs to populate this area.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {repos.map((r) => (
                  <div key={r.full_name} className={`p-4 ${t.border} border rounded-lg ${t.cardBg} ${t.shadow}`}>
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
                        <div className={`text-sm ${t.textSecondary}`}>{r.description || 'No description'}</div>
                      </div>
                      <div className="text-sm text-center ml-4">
                        <div className={`font-bold text-lg text-yellow-500`}>{r.stars}</div>
                        <div className={`text-xs text-yellow-500`}>★ stars</div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className={`text-sm font-semibold mb-1 ${t.text}`}>Merged PRs</div>
                      <ul className={`list-disc list-inside text-sm ${t.textSecondary}`}>
                        {r.prs.slice(0, 5).map((pr) => (
                          <li key={pr.url}>
                            <a className={`${t.accent} hover:underline`} href={pr.url} target="_blank" rel="noopener noreferrer">
                              {pr.title}
                            </a>
                          </li>
                        ))}
                        {r.prs.length > 5 && (
                          <li className={`text-xs ${t.textTertiary}`}>and {r.prs.length - 5} more…</li>
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-600">
        Pro tip: For LinkedIn, export at 1200×630 or higher for best preview. Use the Download button to get a PNG you can crop if required.
      </div>
    </div>
  );
}