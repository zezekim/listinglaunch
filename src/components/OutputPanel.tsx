"use client";
import { useState } from "react";
import { GeneratedPackage } from "@/lib/types";
import { PropertyInput } from "@/lib/types";
import { EmailPreview } from "./EmailPreview";
import { SocialCaptions } from "./SocialCaptions";
import { PDFFlyer } from "./PDFFlyer";
import { ReelsVideo } from "./ReelsVideo";

interface Props {
  data: GeneratedPackage;
  property: PropertyInput;
}

const tabs = [
  { id: "email", label: "Email", icon: "✉️" },
  { id: "social", label: "Social", icon: "📲" },
  { id: "pdf", label: "PDF Flyer", icon: "🖨️" },
  { id: "video", label: "Reels Video", icon: "🎬" },
];

export function OutputPanel({ data, property }: Props) {
  const [active, setActive] = useState("email");

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-stone-700 mb-5 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition whitespace-nowrap ${
              active === tab.id
                ? "bg-stone-800 text-white border border-b-stone-800 border-stone-700 -mb-px"
                : "text-stone-500 hover:text-stone-300"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {active === "email" && <EmailPreview html={data.email} />}
        {active === "social" && (
          <SocialCaptions
            data={{
              instagram: data.instagram,
              linkedin: data.linkedin,
              facebook: data.facebook,
            }}
          />
        )}
        {active === "pdf" && (
          <PDFFlyer
            data={{
              pdfHeadline: data.pdfHeadline,
              pdfDescription: data.pdfDescription,
              pdfSpecs: data.pdfSpecs,
            }}
            property={property}
          />
        )}
        {active === "video" && (
          <ReelsVideo data={{ videoScript: data.videoScript }} property={property} />
        )}
      </div>
    </div>
  );
}
