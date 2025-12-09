import React from "react";
import { Github, Users, Mail } from "lucide-react";
import { THEMES } from "../constants/themes";

export default function GitHubProfileCard({ profile, mergedCount, theme }) {
  if (!profile) return null;

  const t = THEMES[theme] || THEMES.classic;

  return (
    <div className={`flex items-start justify-between ${t.bg} rounded-lg p-4 mb-6`}>
      <div className="flex items-start gap-4">
        <img
          src={profile.avatar_url}
          alt={profile.login}
          className="w-20 h-20 rounded-full object-cover shadow-sm"
          crossOrigin="anonymous"
        />

        <div className="text-left">
          <div className="flex items-center gap-3">
            <h3 className={`text-xl font-extrabold leading-tight ${t.text}`}>
              {profile.name || profile.login}
            </h3>
            <div className={`text-sm ${t.textTertiary}`}>@{profile.login}</div>
          </div>

          <div className={`mt-2 flex items-center gap-4 text-sm ${t.textSecondary}`}>
            <div className="flex items-center gap-1">
              <Users className={`w-4 h-4 ${t.textTertiary}`} />
              <span>{profile.followers} followers</span>
            </div>
            <div className={t.textTertiary}>•</div>
            <div>{profile.following} following</div>
          </div>

          {profile.bio && (
            <div className={`mt-2 text-sm ${t.textSecondary} pr-2 line-clamp-2`}>
              {profile.bio}
            </div>
          )}

          {profile.email && (
            <div className={`mt-2 text-sm ${t.textSecondary} flex items-center gap-3`}>
              <div className="flex items-center gap-1">
                <Mail className={`w-4 h-4 ${t.textTertiary}`} />
                <span>{profile.email}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center text-right">
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${t.cardBg}`}>
          <Github className={`w-6 h-6 ${t.accent}`} />
        </div>

        <div className="mt-2 text-center">
          <div className={`text-lg font-bold ${t.text}`}>
            {mergedCount ?? "—"} <span className={`text-sm font-normal ${t.textSecondary}`}>Merged</span>
          </div>
        </div>
      </div>
    </div>
  );
}