"use client";
import { GeneratedPackage } from "@/lib/types";

interface Props {
  data: Pick<GeneratedPackage, "instagram" | "linkedin" | "facebook">;
  photos: string[];
}

const PHONE_W = 210;

function PhoneFrame({ children, bg = "#fff" }: { children: React.ReactNode; bg?: string }) {
  return (
    <div
      className="relative flex-shrink-0 bg-stone-900 rounded-[38px] shadow-2xl"
      style={{
        width: PHONE_W,
        padding: "6px",
        border: "2px solid #3a3a3a",
        boxShadow: "0 0 0 1px #1a1a1a, 0 24px 48px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Dynamic island */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-20" />

      {/* Screen */}
      <div
        className="rounded-[32px] overflow-hidden flex flex-col"
        style={{ backgroundColor: bg, height: 420 }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-4 pt-7 pb-1 flex-shrink-0"
          style={{ backgroundColor: bg }}>
          <span className="text-[8px] font-bold text-gray-800">9:41</span>
          <div className="flex items-center gap-0.5">
            <svg width="10" height="7" viewBox="0 0 10 7" fill="currentColor" className="text-gray-800">
              <rect x="0" y="4" width="2" height="3" rx="0.5"/><rect x="2.5" y="2.5" width="2" height="4.5" rx="0.5"/>
              <rect x="5" y="1" width="2" height="6" rx="0.5"/><rect x="7.5" y="0" width="2" height="7" rx="0.5"/>
            </svg>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor" className="text-gray-800 ml-0.5">
              <rect x="0" y="1" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="0.8" fill="none"/>
              <rect x="10.5" y="2.5" width="1" height="3" rx="0.5"/>
              <rect x="1" y="2" width="7" height="4" rx="0.5"/>
            </svg>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ fontSize: 9 }}>
          {children}
        </div>
      </div>

      {/* Home indicator */}
      <div className="flex justify-center mt-1.5">
        <div className="w-16 h-[3px] bg-stone-600 rounded-full" />
      </div>
    </div>
  );
}

/* ── Instagram ── */
function IGPhone({ caption, photo }: { caption: string; photo?: string }) {
  const lines = caption.split("\n");
  const hashtags = lines.filter((l) => l.trim().startsWith("#")).join(" ");
  const body = lines.filter((l) => !l.trim().startsWith("#")).join(" ").trim();

  return (
    <PhoneFrame bg="#fafafa">
      {/* IG App Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-gray-200">
        <svg width="14" height="10" fill="none" viewBox="0 0 14 10">
          <rect y="0" width="14" height="1.5" rx="0.75" fill="#111"/>
          <rect y="4" width="10" height="1.5" rx="0.75" fill="#111"/>
          <rect y="8" width="14" height="1.5" rx="0.75" fill="#111"/>
        </svg>
        <span style={{ fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 700 }}>Instagram</span>
        <div className="flex gap-1.5 text-sm">❤️</div>
      </div>

      {/* Stories */}
      <div className="flex gap-2 px-2 py-2 bg-white border-b border-gray-100 overflow-x-auto">
        {["PS", "K·B", "LY", "TX", "AU"].map((initials, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5 flex-shrink-0">
            <div className={`rounded-full p-0.5 ${i === 0 ? "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" : "bg-gray-200"}`} style={{ width: 28, height: 28 }}>
              <div className="w-full h-full rounded-full bg-white p-0.5">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-500 to-stone-600 flex items-center justify-center text-white font-bold" style={{ fontSize: 5 }}>
                  {initials}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post */}
      <div className="bg-white">
        {/* Post header */}
        <div className="flex items-center gap-1.5 px-2 py-1.5">
          <div className="rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex-shrink-0" style={{ width: 22, height: 22 }}>
            <div className="w-full h-full rounded-full bg-white p-0.5">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-500 to-stone-600 flex items-center justify-center text-white font-bold" style={{ fontSize: 4 }}>PS</div>
            </div>
          </div>
          <div className="flex-1">
            <p className="font-bold leading-tight" style={{ fontSize: 8 }}>twelveriversrealty</p>
            <p className="text-gray-400 leading-tight" style={{ fontSize: 7 }}>Austin, Texas</p>
          </div>
          <span className="text-gray-400" style={{ fontSize: 11 }}>···</span>
        </div>

        {/* Photo */}
        {photo ? (
          <img src={photo} className="w-full object-cover" style={{ aspectRatio: "1/1" }} />
        ) : (
          <div className="w-full bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center" style={{ aspectRatio: "1/1" }}>
            <span className="text-stone-400" style={{ fontSize: 8 }}>Listing Photo</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between px-2 py-1.5">
          <div className="flex gap-2" style={{ fontSize: 12 }}>🤍 💬 ✈️</div>
          <span style={{ fontSize: 12 }}>🔖</span>
        </div>

        <div className="px-2 pb-2">
          <p className="font-bold" style={{ fontSize: 8 }}>847 likes</p>
          <p className="text-gray-800 mt-0.5 leading-relaxed" style={{ fontSize: 8 }}>
            <span className="font-bold">twelveriversrealty </span>
            {body.slice(0, 140)}{body.length > 140 ? "…" : ""}
          </p>
          {hashtags && <p className="text-blue-500 mt-0.5" style={{ fontSize: 8 }}>{hashtags.slice(0, 60)}</p>}
          <p className="text-gray-400 mt-0.5" style={{ fontSize: 7 }}>2 HOURS AGO</p>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ── LinkedIn ── */
function LNPhone({ text, photo }: { text: string; photo?: string }) {
  return (
    <PhoneFrame bg="#f3f2ef">
      {/* LN Header */}
      <div className="bg-white px-3 py-2 border-b border-gray-200 flex items-center gap-2">
        <div className="w-5 h-5 bg-blue-700 rounded flex items-center justify-center text-white font-bold flex-shrink-0" style={{ fontSize: 7 }}>in</div>
        <div className="flex-1 bg-gray-100 rounded-full px-2 py-0.5" style={{ fontSize: 8, color: "#666" }}>Search</div>
        <div className="flex gap-1.5" style={{ fontSize: 10 }}>💬 🔔</div>
      </div>

      {/* Feed tabs */}
      <div className="flex bg-white border-b border-gray-200 text-center" style={{ fontSize: 8 }}>
        {["Home","My Network","Post","Jobs","More"].map((t, i) => (
          <div key={t} className={`flex-1 py-1.5 ${i === 0 ? "border-b-2 border-black font-bold" : "text-gray-400"}`}>{t}</div>
        ))}
      </div>

      {/* Post card */}
      <div className="bg-white m-1.5 rounded-lg border border-gray-200 overflow-hidden">
        {/* Post author */}
        <div className="flex items-start gap-1.5 p-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-stone-600 flex items-center justify-center text-white font-bold flex-shrink-0" style={{ fontSize: 5 }}>PS</div>
          <div className="flex-1">
            <p className="font-bold leading-tight" style={{ fontSize: 8 }}>Paul Smith</p>
            <p className="text-gray-500 leading-tight" style={{ fontSize: 7 }}>Partner at Twelve Rivers Realty · 1st</p>
            <p className="text-gray-400 leading-tight" style={{ fontSize: 7 }}>2h · 🌐</p>
          </div>
          <div className="text-blue-700 font-bold border border-blue-700 rounded-full px-1.5 py-0.5 flex-shrink-0" style={{ fontSize: 7 }}>+ Follow</div>
        </div>

        <p className="px-2 pb-1.5 text-gray-800 leading-relaxed" style={{ fontSize: 8 }}>
          {text.slice(0, 200)}{text.length > 200 ? "…" : ""}
        </p>

        {photo && <img src={photo} className="w-full object-cover" style={{ height: 80 }} />}

        {/* Reactions */}
        <div className="px-2 py-1 border-t border-gray-100">
          <div className="flex items-center gap-1 text-gray-500 mb-1" style={{ fontSize: 7 }}>
            <span>👍❤️🎉</span><span>214 · 18 comments</span>
          </div>
          <div className="flex justify-around text-gray-500 font-medium pt-1 border-t border-gray-100" style={{ fontSize: 7 }}>
            <span>👍 Like</span><span>💬 Comment</span><span>🔁 Repost</span><span>✉️ Send</span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ── Facebook ── */
function FBPhone({ text, photo }: { text: string; photo?: string }) {
  return (
    <PhoneFrame bg="#f0f2f5">
      {/* FB Header */}
      <div className="bg-white px-3 py-2 border-b border-gray-200 flex items-center gap-2">
        <span className="text-blue-600 font-black" style={{ fontSize: 14 }}>f</span>
        <div className="flex-1 bg-gray-100 rounded-full px-2 py-0.5 text-gray-400" style={{ fontSize: 8 }}>Search Facebook</div>
        <div className="flex gap-1" style={{ fontSize: 10 }}>💬 🔔</div>
      </div>

      {/* Feed tabs */}
      <div className="flex bg-white border-b border-gray-200 text-center" style={{ fontSize: 8 }}>
        {["🏠","👥","▶️","🏪","🔔"].map((icon, i) => (
          <div key={icon} className={`flex-1 py-1.5 ${i === 0 ? "border-b-2 border-blue-600" : "text-gray-400"}`}>{icon}</div>
        ))}
      </div>

      {/* Story strip */}
      <div className="bg-white my-1.5 mx-1.5 rounded-lg p-2 border border-gray-200">
        <div className="flex gap-1.5">
          <div className="w-12 h-14 bg-gradient-to-b from-stone-400 to-stone-600 rounded-lg flex items-end justify-center pb-1 flex-shrink-0">
            <span className="text-white font-bold" style={{ fontSize: 7 }}>+ Story</span>
          </div>
          {["K", "L", "J"].map((l) => (
            <div key={l} className="w-12 h-14 bg-gradient-to-br from-stone-300 to-stone-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold" style={{ fontSize: 9 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Post card */}
      <div className="bg-white mx-1.5 rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-1.5 p-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-stone-600 flex items-center justify-center text-white font-bold flex-shrink-0" style={{ fontSize: 5 }}>PS</div>
          <div>
            <p className="font-bold leading-tight" style={{ fontSize: 8 }}>Paul Smith</p>
            <p className="text-gray-400 leading-tight" style={{ fontSize: 7 }}>Just now · 🌐</p>
          </div>
          <span className="ml-auto text-gray-400" style={{ fontSize: 11 }}>···</span>
        </div>

        <p className="px-2 pb-1.5 text-gray-800 leading-relaxed" style={{ fontSize: 8 }}>
          {text.slice(0, 180)}{text.length > 180 ? "…" : ""}
        </p>

        {photo && <img src={photo} className="w-full object-cover" style={{ height: 90 }} />}

        {/* Reactions */}
        <div className="px-2 py-1.5 border-t border-gray-100">
          <div className="flex items-center justify-between text-gray-500 mb-1" style={{ fontSize: 7 }}>
            <span>👍❤️😍 312</span><span>28 comments</span>
          </div>
          <div className="flex justify-around text-gray-500 font-medium pt-1 border-t border-gray-100" style={{ fontSize: 7 }}>
            <span>👍 Like</span><span>💬 Comment</span><span>↗️ Share</span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ── Main export ── */
export function SocialCaptions({ data, photos }: Props) {
  const photo = photos[0];

  const platforms = [
    {
      key: "instagram" as const,
      label: "Post on Instagram",
      color: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90",
      phone: <IGPhone caption={data.instagram} photo={photo} />,
    },
    {
      key: "linkedin" as const,
      label: "Post on LinkedIn",
      color: "bg-blue-700 hover:bg-blue-600",
      phone: <LNPhone text={data.linkedin} photo={photo} />,
    },
    {
      key: "facebook" as const,
      label: "Post on Facebook",
      color: "bg-blue-600 hover:bg-blue-500",
      phone: <FBPhone text={data.facebook} photo={photo} />,
    },
  ];

  function postTo(platform: string, text: string) {
    navigator.clipboard.writeText(text);
    const urls: Record<string, string> = {
      instagram: "https://www.instagram.com",
      linkedin: "https://www.linkedin.com/feed/",
      facebook: "https://www.facebook.com",
    };
    window.open(urls[platform], "_blank");
  }

  return (
    <div className="flex gap-4 justify-center items-start">
      {platforms.map(({ key, label, color, phone }) => (
        <div key={key} className="flex flex-col items-center gap-2">
          {phone}
          <button
            onClick={() => postTo(key, data[key])}
            className={`w-full py-2 text-xs font-semibold text-white rounded-lg transition ${color}`}
            style={{ width: PHONE_W }}
          >
            {label}
          </button>
          <p className="text-[10px] text-stone-600">Caption copied to clipboard</p>
        </div>
      ))}
    </div>
  );
}
