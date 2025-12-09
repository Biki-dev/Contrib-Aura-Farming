import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import GitHubProfileCard from "./components/GitHubProfileCard";
import SafariHeader from "./components/SafariHeader";
import MergedPRsGrid from "./components/MergedPRsGrid";
import TopMergedReposSummary from "./components/TopMergedReposSummary";
import ContributionHeatmap from "./components/ContributionHeatmap";
import LayoutTogglePanel from "./components/LayoutTogglePanel";
import ThemeSelector from "./components/ThemeSelector";
import { THEMES } from "./constants/themes";
import { Github, Linkedin } from "lucide-react";

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
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Component toggles
  const [components, setComponents] = useState({
    profile: true,
    heatmap: false,
    mergedGrid: true,
    topRepos: false,
  });

  const containerRef = useRef(null);
  const t = THEMES[theme];

  // Fetch merged PRs with pagination
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
    
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet?.insertRule('body > div:last-child img { display: inline-block; }');
    
    const canvas = await html2canvas(containerRef.current, { 
      scale: 2, 
      useCORS: true, 
      logging: false 
    });
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${username || "contribs"}-github-contribs-${theme}.png`;
    a.click();
  }

  const handleToggle = (key) => {
    setComponents((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const applyPreset = (preset) => {
    const presets = {
      profileHeatmap: { profile: true, heatmap: true, mergedGrid: false, topRepos: false },
      profileTopRepos: { profile: true, heatmap: false, mergedGrid: false, topRepos: true },
      profileMergedGrid: { profile: true, heatmap: false, mergedGrid: true, topRepos: false },
      heatmapOnly: { profile: false, heatmap: true, mergedGrid: false, topRepos: false },
      all: { profile: true, heatmap: true, mergedGrid: true, topRepos: true },
    };
    setComponents(presets[preset] || presets.profileMergedGrid);
  };

  const topRepos = repos.slice(0, 5);

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
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button 
          className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition" 
          onClick={load} 
          disabled={loading}
        >
          {loading ? "Loading…" : "Load"}
        </button>
      </div>

      <LayoutTogglePanel 
        components={components}
        onToggle={handleToggle}
        onPreset={applyPreset}
      />

      <div className="flex gap-3 mb-4">
        <ThemeSelector
          theme={theme}
          showMenu={showThemeMenu}
          onToggleMenu={() => setShowThemeMenu(!showThemeMenu)}
          onSelectTheme={(key) => {
            setTheme(key);
            setShowThemeMenu(false);
          }}
        />
        
        <button
          className="px-4 py-2 border rounded bg-white hover:bg-gray-50 transition disabled:opacity-50"
          onClick={downloadScreenshot}
          disabled={!profile && repos.length === 0}
        >
          Download Screenshot
        </button>
      </div>

      <div className="mb-4 text-xs text-gray-600">
        Tips: If you hit rate limits, add a GitHub Personal Access Token (no special scopes required for public data). 
        Token is never stored or logged. Use toggles above to customize your screenshot layout.
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
            {components.profile && (
              <GitHubProfileCard 
                profile={profile} 
                mergedCount={mergedCount} 
                theme={theme} 
              />
            )}

            {components.heatmap && (
              <ContributionHeatmap
                username={username}
                token={token}
                year={selectedYear}
                onYearChange={setSelectedYear}
                theme={theme}
              />
            )}

            {components.topRepos && repos.length > 0 && (
              <TopMergedReposSummary
                repos={topRepos}
                theme={theme}
              />
            )}

            {components.mergedGrid && (
              <>
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
                  <MergedPRsGrid repos={repos} theme={theme} />
                )}
              </>
            )}

            {!components.profile && !components.heatmap && !components.mergedGrid && !components.topRepos && (
              <div className={`text-center py-20 ${t.textTertiary}`}>
                Select at least one component to display
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
