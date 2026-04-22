"use client";
import { useState } from "react";
import { PropertyForm } from "@/components/PropertyForm";
import { OutputPanel } from "@/components/OutputPanel";
import { PropertyInput, GeneratedPackage } from "@/lib/types";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<GeneratedPackage | null>(null);
  const [lastProperty, setLastProperty] = useState<PropertyInput | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate(data: PropertyInput) {
    setLoading(true);
    setError(null);
    setLastProperty(data);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const result: GeneratedPackage = await res.json();
      setOutput(result);
    } catch (e: any) {
      setError(e.message || "Generation failed. Check your API key.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Header */}
      <header className="border-b border-stone-800 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white">
            ListingLaunch
          </h1>
          <p className="text-xs text-stone-500 tracking-wider uppercase">
            Twelve Rivers Realty · AI Listing Package Generator
          </p>
        </div>
        <div className="text-xs text-stone-600 text-right">
          <p>Paul Smith · 512.228.8074</p>
          <p>TwelveRiversRealty.com</p>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex h-[calc(100vh-65px)]">
        {/* Left: Form */}
        <div className="w-[400px] min-w-[400px] border-r border-stone-800 overflow-y-auto p-6">
          <PropertyForm onSubmit={handleGenerate} loading={loading} />

          {error && (
            <div className="mt-4 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Right: Output */}
        <div className="flex-1 overflow-hidden p-6">
          {output && lastProperty ? (
            <OutputPanel data={output} property={lastProperty} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              {loading ? (
                <>
                  <div className="w-12 h-12 border-2 border-amber-700 border-t-transparent rounded-full animate-spin" />
                  <div className="space-y-1">
                    <p className="text-stone-300 font-medium">
                      Claude is writing your listing package...
                    </p>
                    <p className="text-stone-500 text-sm">
                      Email · Social · PDF · Video script
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-stone-900 rounded-2xl flex items-center justify-center border border-stone-700 text-3xl">
                    🏡
                  </div>
                  <div className="space-y-1">
                    <p className="text-stone-300 font-medium">
                      Enter a property to get started
                    </p>
                    <p className="text-stone-600 text-sm max-w-xs">
                      Fill in the details on the left and hit Generate to
                      produce a full listing launch package in Paul&apos;s voice.
                    </p>
                  </div>
                  <div className="pt-4 grid grid-cols-2 gap-3 text-xs text-stone-600 max-w-xs">
                    {["✉️ HTML Email", "📲 Social Captions", "🖨️ PDF Flyer", "🎬 Reels Video"].map(
                      (item) => (
                        <div
                          key={item}
                          className="border border-stone-800 rounded-lg px-3 py-2 text-center"
                        >
                          {item}
                        </div>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
