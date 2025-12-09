import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { THEMES } from "../constants/themes";
import YearSelect from "./YearSelect"; // adjust path if needed

export default function ContributionHeatmap({ username, token, year, onYearChange, theme }) {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalContributions, setTotalContributions] = useState(0);

  const t = THEMES[theme] || THEMES.classic;
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  useEffect(() => {
    if (username) {
      fetchContributions();
    }
  }, [username, year, token]);

  async function fetchContributions() {
    if (!username) return;
    
    setLoading(true);
    setError(null);

    try {
      // Using GitHub's contribution GraphQL API
      const query = `
        query($userName:String!, $from:DateTime!, $to:DateTime!) {
          user(login: $userName) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;

      const variables = {
        userName: username,
        from: `${year}-01-01T00:00:00Z`,
        to: `${year}-12-31T23:59:59Z`
      };

      const headers = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `bearer ${token}`;
      }

      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers,
        body: JSON.stringify({ query, variables })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contributions. Try adding a token for GraphQL access.');
      }

      const data = await response.json();
      
      if (data.errors) {
        throw new Error(data.errors[0]?.message || 'GraphQL error');
      }

      const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;
      
      if (!calendar) {
        throw new Error('No contribution data available');
      }

      const allDays = calendar.weeks.flatMap(week => week.contributionDays);
      setContributions(allDays);
      setTotalContributions(calendar.totalContributions);
    } catch (err) {
      setError(err.message);
      console.error('Contribution fetch error:', err);
    } finally {
      setLoading(false);
    }
  }

  const getContributionColor = (count) => {
    if (count === 0) return theme === 'dark' || theme === 'midnight' || theme === 'neon' ? 'bg-gray-800' : 'bg-gray-100';
    if (count < 3) return theme === 'neon' ? 'bg-green-900' : 'bg-green-200';
    if (count < 6) return theme === 'neon' ? 'bg-green-700' : 'bg-green-400';
    if (count < 10) return theme === 'neon' ? 'bg-green-500' : 'bg-green-600';
    return theme === 'neon' ? 'bg-green-400' : 'bg-green-800';
  };

  // Group contributions by week
  const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <div className={`mb-6 p-4 ${t.cardBg} ${t.border} border rounded-lg ${t.shadow}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className={`w-5 h-5 ${t.accent}`} />
          <h3 className={`text-lg font-semibold ${t.text}`}>
            Contribution Activity
          </h3>
        </div>
        
        <YearSelect
  year={year}
  years={years}
  onYearChange={onYearChange}
  theme={theme}
  t={t}
/>

      </div>

      {loading && (
        <div className={`text-center py-8 ${t.textTertiary}`}>
          Loading contribution data...
        </div>
      )}

      {error && (
        <div className="text-red-500 text-sm mb-3">
          {error}
        </div>
      )}

      {!loading && !error && contributions.length > 0 && (
        <>
          <div className={`text-sm ${t.textSecondary} mb-3`}>
            {totalContributions} contributions in {year}
          </div>

          <div className="overflow-x-auto">
            <div className="inline-flex gap-1">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {week.map((day, dayIdx) => (
                    <div
                      key={day.date}
                      className={`w-3 h-3 rounded-sm ${getContributionColor(day.contributionCount)}`}
                      title={`${day.date}: ${day.contributionCount} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <span className={`text-xs ${t.textTertiary}`}>Less</span>
            <div className="flex gap-1">
              <div className={`w-3 h-3 rounded-sm ${theme === 'dark' || theme === 'midnight' || theme === 'neon' ? 'bg-gray-800' : 'bg-gray-100'}`} />
              <div className={`w-3 h-3 rounded-sm ${theme === 'neon' ? 'bg-green-900' : 'bg-green-200'}`} />
              <div className={`w-3 h-3 rounded-sm ${theme === 'neon' ? 'bg-green-700' : 'bg-green-400'}`} />
              <div className={`w-3 h-3 rounded-sm ${theme === 'neon' ? 'bg-green-500' : 'bg-green-600'}`} />
              <div className={`w-3 h-3 rounded-sm ${theme === 'neon' ? 'bg-green-400' : 'bg-green-800'}`} />
            </div>
            <span className={`text-xs ${t.textTertiary}`}>More</span>
          </div>
        </>
      )}

      {!loading && !error && contributions.length === 0 && username && (
        <div className={`text-center py-8 ${t.textTertiary}`}>
          No contribution data available. Make sure you have a GitHub token with proper permissions.
        </div>
      )}
    </div>
  );
}