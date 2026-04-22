"use client";
import { useEffect, useState } from "react";
import { GeneratedPackage } from "@/lib/types";
import { PropertyInput } from "@/lib/types";

interface Props {
  data: Pick<GeneratedPackage, "videoScript">;
  property: PropertyInput;
}

const PLATFORM_URLS: Record<string, string> = {
  instagram: "https://www.instagram.com",
  linkedin: "https://www.linkedin.com/feed/",
  facebook: "https://www.facebook.com",
};

export function ReelsVideo({ data, property }: Props) {
  const [Player, setPlayer] = useState<React.ComponentType<any> | null>(null);
  const [VideoComp, setVideoComp] = useState<React.ComponentType<any> | null>(null);
  const [recording, setRecording] = useState(false);
  const [countdown, setCountdown] = useState(0);

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

  function postVideo(platform: string) {
    navigator.clipboard.writeText(slides.join("\n\n"));
    window.open(PLATFORM_URLS[platform], "_blank");
  }

  async function downloadVideo() {
    try {
      const stream = await (navigator.mediaDevices as any).getDisplayMedia({
        video: { frameRate: 30 },
        audio: true,
      });

      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : "video/webm";
      const recorder = new MediaRecorder(stream, { mimeType });
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((t: MediaStreamTrack) => t.stop());
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `listing-reel-${property.address.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        setRecording(false);
        setCountdown(0);
      };

      setRecording(true);
      recorder.start();

      // Auto-stop at 31 seconds with countdown
      let secs = 31;
      setCountdown(secs);
      const tick = setInterval(() => {
        secs -= 1;
        setCountdown(secs);
        if (secs <= 0) {
          clearInterval(tick);
          if (recorder.state === "recording") recorder.stop();
        }
      }, 1000);
    } catch {
      setRecording(false);
    }
  }

  if (!Player || !VideoComp) {
    return (
      <div className="flex justify-center">
        <div
          className="bg-stone-900 rounded-[44px] flex items-center justify-center border border-stone-800"
          style={{ width: 300, height: 540 }}
        >
          <div className="text-stone-500 text-xs">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 items-start">
      {/* Phone frame */}
      <div className="flex-shrink-0">
        <div
          className="relative bg-stone-900 rounded-[48px] p-2 shadow-2xl"
          style={{
            width: 300,
            border: "2px solid #3a3a3a",
            boxShadow:
              "0 0 0 1px #222, 0 30px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Dynamic island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10" />

          {/* Screen */}
          <div
            className="rounded-[42px] overflow-hidden bg-black"
            style={{ aspectRatio: "9/19.5" }}
          >
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
          <div className="flex justify-center mt-2">
            <div className="w-24 h-1 bg-stone-600 rounded-full" />
          </div>
        </div>

        <p className="text-center text-xs text-stone-600 mt-2">
          30s · 9:16 · Reel-ready
        </p>
      </div>

      {/* Right: slides + action buttons */}
      <div className="flex-1 space-y-4 pt-1">
        {/* Video Slides */}
        <div>
          <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold mb-2">
            Video Slides
          </p>
          <div className="space-y-1.5">
            {slides.map((slide, i) => (
              <div
                key={i}
                className="flex gap-3 items-start bg-stone-900 rounded-lg px-3 py-2 border border-stone-800"
              >
                <span className="text-amber-600 font-mono font-bold text-xs w-4 flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-stone-300 text-xs leading-relaxed">
                  {slide}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Post buttons */}
        <div>
          <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold mb-2">
            Post Video
          </p>
          <div className="space-y-2">
            <button
              onClick={() => postVideo("instagram")}
              className="w-full py-2.5 text-sm font-semibold text-white rounded-lg transition bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90"
            >
              Post on Instagram
            </button>
            <button
              onClick={() => postVideo("facebook")}
              className="w-full py-2.5 text-sm font-semibold text-white rounded-lg transition bg-blue-600 hover:bg-blue-500"
            >
              Post on Facebook
            </button>
            <button
              onClick={() => postVideo("linkedin")}
              className="w-full py-2.5 text-sm font-semibold text-white rounded-lg transition bg-blue-800 hover:bg-blue-700"
            >
              Post on LinkedIn
            </button>
          </div>
          <p className="text-[10px] text-stone-600 mt-1.5 text-center">
            Caption copied to clipboard when you click
          </p>
        </div>

        {/* Download */}
        <div>
          <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold mb-2">
            Download
          </p>
          {recording ? (
            <div className="w-full py-3 bg-red-900/40 border border-red-700 rounded-lg text-center">
              <p className="text-red-300 text-xs font-semibold">
                Recording... {countdown}s remaining
              </p>
              <p className="text-red-500/70 text-[10px] mt-0.5">
                Select the phone preview in the screen-share dialog
              </p>
            </div>
          ) : (
            <button
              onClick={downloadVideo}
              className="w-full py-2.5 text-sm font-semibold text-white rounded-lg transition bg-stone-700 hover:bg-stone-600 border border-stone-600"
            >
              Download Video
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
