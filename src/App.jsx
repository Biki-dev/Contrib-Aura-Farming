import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import GitHubProfileCard from "./components/GitHubProfileCard";
import SafariHeader from "./components/SafariHeader";


export default function GitHubContribScreenshot() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [mergedCount, setMergedCount] = useState(0);

  const containerRef = useRef(null);

  // Fetch merged PRs with simple pagination option (safe default: fetch up to 500 results)
  async function fetchMergedPRs(user) {
    const headers = token ? { Authorization: `token ${token}` } : {};
    const perPage = 100;
    let page = 1;
    let allItems = [];
    // Loop until fewer than perPage results or we've reached a safety cap
    const safetyCap = 5; // 5 * 100 = 500 maximum items by default
    while (page <= safetyCap) {
      const q = `type:pr+author:${encodeURIComponent(user)}+is:merged`;
      const url = `https://api.github.com/search/issues?q=${q}&per_page=${perPage}&page=${page}`;
      const res = await fetch(url, { headers });
      if (!res.ok) {
        // Better error messages for common cases
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
      if (items.length < perPage) break; // no more pages
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
    // repository_url is like https://api.github.com/repos/{owner}/{repo}
    // defensive parsing:
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
      // fetch merged PRs (possibly paginated)
      const prItems = await fetchMergedPRs(username.trim());

      // set mergedCount
      setMergedCount(prItems.length);

      // fetch profile
      try {
        const prof = await fetchProfile(username.trim());
        setProfile(prof);
      } catch (profErr) {
        // non-fatal: still continue with repos
        console.warn("profile fetch failed:", profErr);
      }

      // aggregate PRs by repo
      const repoMap = new Map();
      prItems.forEach((item) => {
        const { owner, repo } = parseRepoFullName(item.repository_url);
        const key = `${owner}/${repo}`;
        if (!repoMap.has(key)) repoMap.set(key, { owner, repo, prs: [] });
        repoMap.get(key).prs.push({ title: item.title, url: item.html_url, number: item.number });
      });

      // fetch repo details in parallel (description, stars)
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
          // if repo fetch fails, still include minimal info
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
      // sort by stars desc (numbers only)
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
    // Use CORS and scale for higher-res
    const canvas = await html2canvas(containerRef.current, { scale: 2, useCORS: true, logging: false });
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${username || "contribs"}-github-contribs.png`;
    a.click();
  }

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-3">GitHub Contributions — Screenshot Generator</h1>
      <p className="mb-4 text-sm opacity-80">
        Enter your GitHub username. The tool finds merged PRs you authored and groups them by repo. It then fetches star counts and descriptions so you can take a single screenshot for LinkedIn.
      </p>

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

      <div className="mb-4 text-xs text-gray-600">
        Tips: If you hit rate limits, add a GitHub Personal Access Token (no special scopes required for public data). This tool paginates up to 500 merged PRs by default.
      </div>

      {error && <div className="mb-4 text-red-600">Error: {error}</div>}
{/*
      <div className="mb-4 flex gap-2">
        <button className="px-3 py-2 border rounded" onClick={downloadScreenshot} disabled={repos.length === 0}>
          Download screenshot
        </button>
        <a className="px-3 py-2 border rounded" href="#" onClick={(e) => { e.preventDefault(); window.print(); }}>
          Print / Save as PDF
        </a>
      </div>
      */}

     {/* Screenshot target area */}
<div ref={containerRef} className="bg-transparent">
  <div className="rounded-xl shadow border border-gray-200 overflow-hidden bg-white">
    <SafariHeader
      url={username ? `https://github.com/${username}` : "https://github.com/your-username"}
      title="Contrib Aura Farming"
    />

    <div className="p-6">
      <GitHubProfileCard profile={profile} mergedCount={mergedCount} />

      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-semibold">
            {username ? `${username}'s merged contributions` : "Your merged contributions"}
          </h2>
          
        </div>
        <div className="text-sm opacity-60">
          Generated {new Date().toLocaleString()}
        </div>
      </div>

        {repos.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No repos to show. Load merged PRs to populate this area.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map((r) => (
              <div key={r.full_name} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <a href={r.html_url} target="_blank" rel="noopener noreferrer" className="font-medium text-lg">{r.full_name}</a>
                    <div className="text-sm opacity-80">{r.description || 'No description'}</div>
                  </div>
                  <div className="text-sm text-center ml-4">
                    <div className="font-bold text-lg">{r.stars}</div>
                    <div className="text-xs opacity-70">★ stars</div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-sm font-semibold mb-1">Merged PRs</div>
                  <ul className="list-disc list-inside text-sm">
                    {r.prs.slice(0, 5).map((pr) => (
                      <li key={pr.url}><a className="underline" href={pr.url} target="_blank" rel="noopener noreferrer">{pr.title}</a></li>
                    ))}
                    {r.prs.length > 5 && <li className="text-xs opacity-70">and {r.prs.length - 5} more…</li>}
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
