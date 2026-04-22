"use client";
import { GeneratedPackage } from "@/lib/types";

interface Props {
  data: Pick<GeneratedPackage, "instagram" | "linkedin" | "facebook">;
  photos: string[];
}

function postTo(platform: string, text: string) {
  navigator.clipboard.writeText(text);
  const urls: Record<string, string> = {
    instagram: "https://www.instagram.com",
    linkedin: "https://www.linkedin.com/feed/",
    facebook: "https://www.facebook.com",
  };
  window.open(urls[platform], "_blank");
}

function Avatar() {
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-600 to-stone-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
      PS
    </div>
  );
}

function InstagramCard({ caption, photo }: { caption: string; photo?: string }) {
  const lines = caption.split("\n");
  const hashtags = lines.filter((l) => l.trim().startsWith("#")).join(" ");
  const body = lines.filter((l) => !l.trim().startsWith("#")).join("\n").trim();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg text-black text-sm font-sans">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-gray-100">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5">
          <div className="w-full h-full rounded-full bg-white p-0.5">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-500 to-stone-600 flex items-center justify-center text-white text-[9px] font-bold">
              PS
            </div>
          </div>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-xs leading-tight">twelveriversrealty</p>
          <p className="text-gray-400 text-[10px]">Austin, Texas</p>
        </div>
        <span className="text-gray-400 text-lg">···</span>
      </div>

      {/* Photo */}
      {photo ? (
        <img src={photo} className="w-full aspect-square object-cover" />
      ) : (
        <div className="w-full aspect-square bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
          <span className="text-stone-400 text-xs">Listing Photo</span>
        </div>
      )}

      {/* Action bar */}
      <div className="px-3 pt-2 pb-1 flex items-center justify-between">
        <div className="flex gap-3 text-xl">
          <span>🤍</span>
          <span>💬</span>
          <span>✈️</span>
        </div>
        <span className="text-xl">🔖</span>
      </div>

      {/* Likes */}
      <div className="px-3 pb-1">
        <p className="font-semibold text-xs">847 likes</p>
      </div>

      {/* Caption */}
      <div className="px-3 pb-3">
        <p className="text-xs leading-relaxed">
          <span className="font-semibold">twelveriversrealty </span>
          {body}
        </p>
        {hashtags && (
          <p className="text-blue-500 text-xs mt-1">{hashtags}</p>
        )}
        <p className="text-gray-400 text-[10px] mt-1">2 HOURS AGO</p>
      </div>
    </div>
  );
}

function LinkedInCard({ text, photo }: { text: string; photo?: string }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg text-black text-sm font-sans">
      {/* Header */}
      <div className="flex items-start gap-2.5 p-3 border-b border-gray-100">
        <Avatar />
        <div className="flex-1">
          <p className="font-semibold text-sm leading-tight">Paul Smith</p>
          <p className="text-gray-500 text-xs leading-tight">Partner at Twelve Rivers Realty · 1st</p>
          <p className="text-gray-400 text-xs">2h · <span>🌐</span></p>
        </div>
        <button className="text-blue-600 text-xs font-semibold border border-blue-600 rounded-full px-3 py-1">+ Follow</button>
      </div>

      {/* Post text */}
      <div className="px-3 py-2">
        <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-wrap">{text}</p>
      </div>

      {/* Photo */}
      {photo && (
        <img src={photo} className="w-full h-48 object-cover" />
      )}

      {/* Reactions bar */}
      <div className="px-3 py-2 border-t border-gray-100">
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <span>👍❤️🎉</span>
          <span>214 · 18 comments</span>
        </div>
        <div className="flex justify-around text-xs text-gray-500 font-medium pt-1 border-t border-gray-100">
          <span>👍 Like</span>
          <span>💬 Comment</span>
          <span>🔁 Repost</span>
          <span>✉️ Send</span>
        </div>
      </div>
    </div>
  );
}

function FacebookCard({ text, photo }: { text: string; photo?: string }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg text-black text-sm font-sans">
      {/* Header */}
      <div className="flex items-start gap-2.5 p-3">
        <Avatar />
        <div className="flex-1">
          <p className="font-semibold text-sm leading-tight">Paul Smith</p>
          <p className="text-gray-400 text-xs">Just now · <span>🌐</span></p>
        </div>
        <span className="text-gray-400 text-lg">···</span>
      </div>

      {/* Post text */}
      <div className="px-3 pb-2">
        <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-wrap">{text}</p>
      </div>

      {/* Photo */}
      {photo && (
        <img src={photo} className="w-full h-52 object-cover" />
      )}

      {/* Reactions */}
      <div className="px-3 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>👍❤️😍 312</span>
          <span>28 comments · 14 shares</span>
        </div>
        <div className="flex justify-around text-xs text-gray-500 font-medium pt-1 border-t border-gray-100">
          <span>👍 Like</span>
          <span>💬 Comment</span>
          <span>↗️ Share</span>
        </div>
      </div>
    </div>
  );
}

export function SocialCaptions({ data, photos }: Props) {
  const photo = photos[0];

  const platforms = [
    {
      key: "instagram" as const,
      label: "Post to Instagram",
      color: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
      card: <InstagramCard caption={data.instagram} photo={photo} />,
    },
    {
      key: "linkedin" as const,
      label: "Post to LinkedIn",
      color: "bg-blue-700 hover:bg-blue-600",
      card: <LinkedInCard text={data.linkedin} photo={photo} />,
    },
    {
      key: "facebook" as const,
      label: "Post to Facebook",
      color: "bg-blue-600 hover:bg-blue-500",
      card: <FacebookCard text={data.facebook} photo={photo} />,
    },
  ];

  return (
    <div className="space-y-5">
      {platforms.map(({ key, label, color, card }) => (
        <div key={key} className="space-y-2">
          {/* Scaled-down platform card preview */}
          <div style={{ zoom: 0.78 }}>
            {card}
          </div>
          <button
            onClick={() => postTo(key, data[key])}
            className={`w-full py-2.5 text-sm font-semibold text-white rounded-lg transition ${color}`}
          >
            {label} — Caption Copied to Clipboard
          </button>
        </div>
      ))}
    </div>
  );
}
