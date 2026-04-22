"use client";
import { useState } from "react";

interface Props {
  html: string;
}

export function EmailPreview({ html }: Props) {
  const [copied, setCopied] = useState(false);

  function copyHtml() {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4">
      {/* Live preview */}
      <div className="border border-stone-700 rounded-lg overflow-hidden bg-white">
        <iframe
          srcDoc={html}
          className="w-full h-[420px]"
          title="Email Preview"
          sandbox="allow-same-origin"
        />
      </div>

      {/* HTML code block */}
      <div className="border border-amber-700/50 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-amber-900/30 border-b border-amber-700/40">
          <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
            HTML Source — paste directly into your email client
          </span>
          <button
            onClick={copyHtml}
            className="text-xs px-3 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded transition font-semibold"
          >
            {copied ? "Copied!" : "Copy HTML"}
          </button>
        </div>
        <pre className="p-4 bg-stone-900 text-stone-300 text-xs font-mono leading-relaxed overflow-x-auto max-h-[280px] overflow-y-auto whitespace-pre-wrap break-all">
          {html}
        </pre>
      </div>
    </div>
  );
}
