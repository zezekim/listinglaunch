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
      <div className="flex justify-center">
        <div className="w-[220px] h-[390px] bg-stone-900 rounded-[36px] flex items-center justify-center border border-stone-700">
          <div className="text-stone-500 text-xs">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 items-start">
      {/* Phone frame */}
      <div className="flex-shrink-0">
        {/* Phone outer shell */}
        <div
          className="relative bg-stone-900 rounded-[44px] p-2 shadow-2xl"
          style={{
            width: "240px",
            border: "2px solid #3a3a3a",
            boxShadow: "0 0 0 1px #222, 0 30px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Dynamic island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />

          {/* Screen */}
          <div className="rounded-[38px] overflow-hidden bg-black" style={{ aspectRatio: "9/19.5" }}>
            <Player
              component={VideoComp}
              inputProps={{
                slides,
                photos: property.photos,
                address: property.address,
                price: property.price,
              }}
              durationInFrames={900}
              compositionWidth={1080}
              compositionHeight={1920}
              fps={30}
              style={{ width: "100%", height: "100%" }}
              controls={false}
              loop
              autoPlay
              clickToPlay={false}
            />
          </div>

          {/* Home indicator */}
          <div className="flex justify-center mt-1.5">
            <div className="w-20 h-1 bg-stone-600 rounded-full" />
          </div>
        </div>

        {/* Play controls below phone */}
        <div className="mt-3 flex justify-center">
          <Player
            component={VideoComp}
            inputProps={{
              slides,
              photos: property.photos,
              address: property.address,
              price: property.price,
            }}
            durationInFrames={900}
            compositionWidth={1080}
            compositionHeight={1920}
            fps={30}
            style={{ display: "none" }}
            controls
            loop
            autoPlay
          />
        </div>

        {/* Simple controls row */}
        <div className="mt-2 flex justify-center gap-4">
          <span className="text-xs text-stone-500">30s · Reel-ready</span>
        </div>
      </div>

      {/* Right: slide breakdown */}
      <div className="flex-1 space-y-3 pt-2">
        <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
          Video Slides
        </p>
        <div className="space-y-2">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="flex gap-3 items-start bg-stone-900 rounded-lg px-3 py-2.5 border border-stone-800"
            >
              <span className="text-amber-600 font-mono font-bold text-sm w-5 flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-stone-300 text-sm leading-relaxed">{slide}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-stone-900/50 border border-stone-800 rounded-lg">
          <p className="text-xs text-stone-500 leading-relaxed">
            <span className="text-stone-400 font-semibold">Photos:</span>{" "}
            {property.photos.length > 0
              ? `${property.photos.length} photo${property.photos.length > 1 ? "s" : ""} cycling with Ken Burns effect`
              : "Upload photos in the form for a photo slideshow background"}
          </p>
          <p className="text-xs text-stone-500 mt-1">
            <span className="text-stone-400 font-semibold">Audio:</span> Ambient piano (royalty-free)
          </p>
        </div>
      </div>
    </div>
  );
}
