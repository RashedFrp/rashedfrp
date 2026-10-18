"use client";

import { useState } from "react";
import { frpApps, FrpApp } from "@/data/frpApps";

export default function FrpTable() {
  const [search, setSearch] = useState<string>("");

  const filteredApps = frpApps.filter((app: FrpApp) =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-3xl mx-auto my-6">
      {/* Vercel Style Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3.5 py-2 text-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder:text-neutral-500"
        />
      </div>

      {/* Vercel Style Minimal Table */}
      <div className="border border-black/10 dark:border-white/10 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-xs font-medium text-neutral-500">
              <th className="p-3.5">NAME</th>
              <th className="p-3.5">TYPE</th>
              <th className="p-3.5 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10 dark:divide-white/10">
            {filteredApps.map((app) => (
              <tr
                key={app.id}
                className="hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors"
              >
                <td className="p-3.5 font-medium text-neutral-900 dark:text-neutral-100">
                  {app.name}
                </td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 border border-black/10 dark:border-white/15 rounded text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
                    {app.category}
                  </span>
                </td>
                <td className="p-3.5 text-right">
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 bg-black text-white dark:bg-white dark:text-black rounded text-xs font-medium hover:opacity-80 active:scale-95 transition-all"
                  >
                    <span>{app.type === "intent" ? "Open" : "Download"}</span>
                    <span className="text-[10px]">{app.type === "intent" ? "↗" : "↓"}</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
