import React from "react";
import { Github, Users, Mail } from "lucide-react";

export default function GitHubProfileCard({ profile, mergedCount }) {
  if (!profile) return null;

  const joinedYear = profile.created_at ? new Date(profile.created_at).getFullYear() : null;
  const years = joinedYear ? Math.max(1, new Date().getFullYear() - joinedYear) : "—";

  return (
    <div className="flex items-start justify-between bg-white rounded-lg p-4 mb-2">
      <div className="flex items-start gap-4">
        {/* Set crossOrigin to help html2canvas avoid tainting */}
        <img
          src={profile.avatar_url}
          alt={profile.login}
          className="w-20 h-20 rounded-full object-cover shadow-sm"
          crossOrigin="anonymous"
        />

        <div className="text-left">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-extrabold leading-tight">{profile.name || profile.login}</h3>
            <div className="text-sm text-gray-500">@{profile.login}</div>
          </div>

          <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1"><Users className="w-4 h-4 text-gray-500" /> <span>{profile.followers} followers</span></div>
            <div className="text-gray-400">•</div>
            <div className="text-gray-600">{profile.following} following</div>
          </div>

          {profile.bio && <div className="mt-2 text-sm text-gray-700 pr-2">{profile.bio}</div>}

          <div className="mt-2 text-sm text-gray-600 flex items-center gap-3">
            {profile.email && (
              <div className="flex items-center gap-1"><Mail className="w-4 h-4 text-gray-500" /> <span>{profile.email}</span></div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center text-right">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-100">
          <Github className="w-6 h-6" />
        </div>

        <div className="mt-2 text-center">
          <div className="text-lg font-bold">{mergedCount ?? "—"} <span className="text-sm font-normal">Merged</span></div>
          {/*<div className="text-xs text-gray-500">{years} Years</div> 
        </div> */}
        </div>
      </div>
    </div>
  );
}
