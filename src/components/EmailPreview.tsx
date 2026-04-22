"use client";

interface Props {
  html: string;
}

export function EmailPreview({ html }: Props) {
  function copyHtml() {
    navigator.clipboard.writeText(html);
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button
          onClick={copyHtml}
          className="text-xs px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded border border-stone-600 transition"
        >
          Copy HTML
        </button>
      </div>
      <div className="border border-stone-700 rounded-lg overflow-hidden bg-white">
        <iframe
          srcDoc={html}
          className="w-full h-[520px]"
          title="Email Preview"
          sandbox="allow-same-origin"
        />
      </div>
    </div>
  );
}
