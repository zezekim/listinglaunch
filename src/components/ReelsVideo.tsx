"use client";
import { useEffect, useState } from "react";
import { GeneratedPackage } from "@/lib/types";
import { PropertyInput } from "@/lib/types";

interface Props {
  data: Pick<GeneratedPackage, "videoScript">;
  property: PropertyInput;
}

export function ReelsVideo({ data, property }: Props) {
  const [Player, setPlayer] = useState<React.ComponentType<any> | null>(null);
  const [VideoComp, setVideoComp] = useState<React.ComponentType<any> | null>(null);

  const slides = data.videoScript
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);

  useEffect(() => {
    // Dynamically import to avoid SSR issues
    Promise.all([
      import("@remotion/player"),
      import("@/remotion/PropertyVideo"),
    ]).then(([playerMod, videoMod]) => {
      setPlayer(() => playerMod.Player);
      setVideoComp(() => videoMod.PropertyVideo);
    });
  }, []);

  if (!Player || !VideoComp) {
    return (
      <div className="aspect-square bg-stone-900 rounded-xl flex items-center justify-center">
        <div className="text-stone-500 text-sm">Loading video player...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl overflow-hidden border border-stone-700">
        <Player
          component={VideoComp}
          inputProps={{
            slides,
            photos: property.photos,
            address: property.address,
            price: property.price,
          }}
          durationInFrames={150}
          compositionWidth={1080}
          compositionHeight={1080}
          fps={30}
          style={{ width: "100%", aspectRatio: "1/1" }}
          controls
          loop
          autoPlay
        />
      </div>

      {/* Script preview */}
      <div className="bg-stone-900 rounded-lg p-4 border border-stone-700">
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-2 font-semibold">
          Video Slides
        </p>
        <div className="space-y-1">
          {slides.map((slide, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <span className="text-amber-600 font-mono font-bold w-5">
                {i + 1}
              </span>
              <span className="text-stone-300">{slide}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
