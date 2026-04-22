"use client";
import { useState } from "react";
import { GeneratedPackage } from "@/lib/types";

const platforms = [
  {
    key: "instagram" as const,
    label: "Instagram",
    icon: "📸",
    color: "from-pink-600 to-purple-600",
  },
  {
    key: "linkedin" as const,
    label: "LinkedIn",
    icon: "💼",
    color: "from-blue-700 to-blue-500",
  },
  {
    key: "facebook" as const,
    label: "Facebook",
    icon: "👥",
    color: "from-blue-600 to-indigo-600",
  },
];

interface Props {
  data: Pick<GeneratedPackage, "instagram" | "linkedin" | "facebook">;
}

export function SocialCaptions({ data }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  function copy(key: string, text: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="space-y-4">
      {platforms.map(({ key, label, icon, color }) => (
        <div
          key={key}
          className="border border-stone-700 rounded-lg overflow-hidden"
        >
          <div
            className={`bg-gradient-to-r ${color} px-4 py-2.5 flex items-center justify-between`}
          >
            <span className="text-white font-semibold text-sm">
              {icon} {label}
            </span>
            <button
              onClick={() => copy(key, data[key])}
              className="text-xs px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded transition"
            >
              {copied === key ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="p-4 bg-stone-900">
            <p className="text-stone-200 text-sm whitespace-pre-wrap leading-relaxed">
              {data[key]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
