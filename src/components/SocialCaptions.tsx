"use client";
import { useState } from "react";
import { GeneratedPackage } from "@/lib/types";

interface Props {
  data: Pick<GeneratedPackage, "instagram" | "linkedin" | "facebook">;
  photos: string[];
}

const PHONE_W = 340;

function PhoneFrame({ children, bg = "#fff" }: { children: React.ReactNode; bg?: string }) {
  return (
    <div
      className="relative flex-shrink-0 bg-stone-900 rounded-[52px] shadow-2xl"
      style={{
        width: PHONE_W,
        padding: "8px",
        border: "2px solid #3a3a3a",
        boxShadow: "0 0 0 1px #1a1a1a, 0 32px 64px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Dynamic island */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />

      {/* Screen */}
      <div
        className="rounded-[44px] overflow-hidden flex flex-col"
        style={{ backgroundColor: bg, height: 600 }}
      >
        {/* Status bar */}
        <div
          className="flex items-center justify-between px-5 pt-10 pb-2 flex-shrink-0"
          style={{ backgroundColor: bg }}
        >
          <span className="text-xs font-bold text-gray-800">9:41</span>
          <div className="flex items-center gap-1">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor" className="text-gray-800">
              <rect x="0" y="5" width="2.5" height="5" rx="0.5"/>
              <rect x="3.5" y="3" width="2.5" height="7" rx="0.5"/>
              <rect x="7" y="1" width="2.5" height="9" rx="0.5"/>
              <rect x="10.5" y="0" width="2.5" height="10" rx="0.5"/>
            </svg>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor" className="text-gray-800">
              <rect x="0" y="1.5" width="13" height="7" rx="1.5" stroke="currentColor" strokeWidth="1" fill="none"/>
              <rect x="13.5" y="3.5" width="1.5" height="3" rx="0.75"/>
              <rect x="1.5" y="3" width="9" height="4" rx="0.75"/>
            </svg>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>

      {/* Home indicator */}
      <div className="flex justify-center mt-2">
        <div className="w-24 h-1 bg-stone-600 rounded-full" />
      </div>
    </div>
  );
}

/* ── Instagram ── */
function IGScreen({ caption, photo }: { caption: string; photo?: string }) {
  const lines = caption.split("\n");
  const hashtags = lines.filter((l) => l.trim().startsWith("#")).join(" ");
  const body = lines.filter((l) => !l.trim().startsWith("#")).join(" ").trim();

  return (
    <div className="bg-white font-sans">
      {/* App header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <svg width="20" height="14" fill="none" viewBox="0 0 20 14">
          <rect y="0" width="20" height="2" rx="1" fill="#111"/>
          <rect y="6" width="14" height="2" rx="1" fill="#111"/>
          <rect y="12" width="20" height="2" rx="1" fill="#111"/>
        </svg>
        <span style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700 }}>Instagram</span>
        <div className="flex gap-3 text-xl">❤️ 💬</div>
      </div>

      {/* Stories */}
      <div className="flex gap-3 px-4 py-3 border-b border-gray-100 overflow-x-auto">
        {[
          { initials: "PS", ring: true },
          { initials: "KB", ring: false },
          { initials: "LY", ring: false },
          { initials: "TX", ring: false },
          { initials: "AU", ring: false },
        ].map(({ initials, ring }, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0">
            <div
              className={`rounded-full p-0.5 ${ring ? "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" : "bg-gray-200"}`}
              style={{ width: 52, height: 52 }}
            >
              <div className="w-full h-full rounded-full bg-white p-0.5">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-500 to-stone-600 flex items-center justify-center text-white font-bold text-xs">
                  {initials}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post */}
      <div className="bg-white">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex-shrink-0" style={{ width: 36, height: 36 }}>
            <div className="w-full h-full rounded-full bg-white p-0.5">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-500 to-stone-600 flex items-center justify-center text-white font-bold text-xs">PS</div>
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm leading-tight">twelveriversrealty</p>
            <p className="text-gray-400 text-xs">Austin, Texas</p>
          </div>
          <span className="text-gray-400 text-lg">···</span>
        </div>

        {photo ? (
          <img src={photo} className="w-full object-cover" style={{ aspectRatio: "1/1" }} />
        ) : (
          <div className="w-full bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center" style={{ aspectRatio: "1/1" }}>
            <span className="text-stone-400 text-sm">Listing Photo</span>
          </div>
        )}

        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex gap-4 text-2xl">🤍 💬 ✈️</div>
          <span className="text-2xl">🔖</span>
        </div>

        <div className="px-4 pb-4">
          <p className="font-semibold text-sm text-gray-900">847 likes</p>
          <p className="text-sm mt-1 leading-relaxed text-gray-900">
            <span className="font-semibold">twelveriversrealty </span>
            {body.slice(0, 180)}{body.length > 180 ? "…" : ""}
          </p>
          {hashtags && <p className="text-blue-500 text-sm mt-1">{hashtags.slice(0, 80)}</p>}
          <p className="text-gray-400 text-xs mt-1">2 HOURS AGO</p>
        </div>
      </div>
    </div>
  );
}

/* ── LinkedIn ── */
function LNScreen({ text, photo }: { text: string; photo?: string }) {
  return (
    <div className="bg-gray-100 font-sans">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center text-white font-black text-sm flex-shrink-0">in</div>
        <div className="flex-1 bg-gray-100 rounded-full px-3 py-1.5 text-sm text-gray-400">Search</div>
        <div className="flex gap-3 text-lg">💬 🔔</div>
      </div>

      {/* Nav tabs */}
      <div className="flex bg-white border-b border-gray-200 text-center text-xs">
        {["Home", "Network", "Post", "Jobs", "More"].map((t, i) => (
          <div key={t} className={`flex-1 py-3 ${i === 0 ? "border-b-2 border-black font-bold" : "text-gray-400"}`}>{t}</div>
        ))}
      </div>

      {/* Post card */}
      <div className="bg-white mx-2 my-2 rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-start gap-3 p-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-stone-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">PS</div>
          <div className="flex-1">
            <p className="font-semibold text-sm leading-tight">Paul Smith</p>
            <p className="text-gray-500 text-xs">Partner at Twelve Rivers Realty · 1st</p>
            <p className="text-gray-400 text-xs">2h · 🌐</p>
          </div>
          <div className="text-blue-700 font-semibold border border-blue-700 rounded-full px-3 py-1 text-xs flex-shrink-0">+ Follow</div>
        </div>

        <p className="px-3 pb-3 text-sm text-gray-800 leading-relaxed">
          {text.slice(0, 240)}{text.length > 240 ? "…" : ""}
        </p>

        {photo && <img src={photo} className="w-full object-cover" style={{ height: 120 }} />}

        <div className="px-3 py-2 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
            <span>👍❤️🎉</span><span>214 · 18 comments</span>
          </div>
          <div className="flex justify-around text-xs text-gray-500 font-medium pt-2 border-t border-gray-100">
            <span>👍 Like</span><span>💬 Comment</span><span>🔁 Repost</span><span>✉️ Send</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Facebook ── */
function FBScreen({ text, photo }: { text: string; photo?: string }) {
  return (
    <div className="bg-gray-100 font-sans">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center gap-3">
        <span className="text-blue-600 font-black text-2xl leading-none">f</span>
        <div className="flex-1 bg-gray-100 rounded-full px-3 py-1.5 text-sm text-gray-400">Search Facebook</div>
        <div className="flex gap-2 text-lg">💬 🔔</div>
      </div>

      {/* Nav */}
      <div className="flex bg-white border-b border-gray-200 text-center text-lg">
        {["🏠", "👥", "▶️", "🏪", "🔔"].map((icon, i) => (
          <div key={icon} className={`flex-1 py-2.5 ${i === 0 ? "border-b-2 border-blue-600" : "text-gray-400"}`}>{icon}</div>
        ))}
      </div>

      {/* Post card */}
      <div className="bg-white mx-2 my-2 rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-2.5 p-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-stone-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">PS</div>
          <div>
            <p className="font-semibold text-sm leading-tight">Paul Smith</p>
            <p className="text-gray-400 text-xs">Just now · 🌐</p>
          </div>
          <span className="ml-auto text-gray-400 text-xl">···</span>
        </div>

        <p className="px-3 pb-3 text-sm text-gray-800 leading-relaxed">
          {text.slice(0, 220)}{text.length > 220 ? "…" : ""}
        </p>

        {photo && <img src={photo} className="w-full object-cover" style={{ height: 140 }} />}

        <div className="px-3 py-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>👍❤️😍 312</span><span>28 comments · 14 shares</span>
          </div>
          <div className="flex justify-around text-sm text-gray-500 font-medium pt-2 border-t border-gray-100">
            <span>👍 Like</span><span>💬 Comment</span><span>↗️ Share</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export function SocialCaptions({ data, photos }: Props) {
  const [active, setActive] = useState<"instagram" | "linkedin" | "facebook">("instagram");
  const photo = photos[0];

  const tabs = [
    { key: "instagram" as const, label: "Instagram", emoji: "📸" },
    { key: "linkedin" as const, label: "LinkedIn", emoji: "💼" },
    { key: "facebook" as const, label: "Facebook", emoji: "👥" },
  ];

  const postUrls: Record<string, string> = {
    instagram: "https://www.instagram.com",
    linkedin: "https://www.linkedin.com/feed/",
    facebook: "https://www.facebook.com",
  };

  const buttonColors: Record<string, string> = {
    instagram: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90",
    linkedin: "bg-blue-700 hover:bg-blue-600",
    facebook: "bg-blue-600 hover:bg-blue-500",
  };

  function postTo() {
    navigator.clipboard.writeText(data[active]);
    window.open(postUrls[active], "_blank");
  }

  const screenBg: Record<string, string> = {
    instagram: "#fff",
    linkedin: "#f3f2ef",
    facebook: "#f0f2f5",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Platform tabs */}
      <div className="flex gap-2">
        {tabs.map(({ key, label, emoji }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              active === key
                ? "bg-stone-700 text-white"
                : "bg-stone-900 text-stone-400 hover:text-stone-200"
            }`}
          >
            {emoji} {label}
          </button>
        ))}
      </div>

      {/* Phone */}
      <PhoneFrame bg={screenBg[active]}>
        {active === "instagram" && <IGScreen caption={data.instagram} photo={photo} />}
        {active === "linkedin" && <LNScreen text={data.linkedin} photo={photo} />}
        {active === "facebook" && <FBScreen text={data.facebook} photo={photo} />}
      </PhoneFrame>

      {/* Post button */}
      <button
        onClick={postTo}
        className={`py-3 text-sm font-bold text-white rounded-xl transition ${buttonColors[active]}`}
        style={{ width: PHONE_W }}
      >
        Post on {tabs.find((t) => t.key === active)?.label} — Caption Copied
      </button>
    </div>
  );
}
