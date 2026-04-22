"use client";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Audio,
} from "remotion";

interface PropertyVideoProps {
  slides: string[];
  photos: string[];
  address: string;
  price: string;
}

function PhotoBg({
  photo,
  panDir,
}: {
  photo: string;
  panDir: "left" | "right";
}) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const panX = interpolate(
    frame,
    [0, durationInFrames],
    panDir === "left" ? [0, -60] : [0, 60],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <img
        src={photo}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translateX(${panX}px)`,
          transformOrigin: "center center",
        }}
      />
    </AbsoluteFill>
  );
}

function TextSlide({ text }: { text: string }) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, 18, durationInFrames - 18, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const y = interpolate(frame, [0, 22], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 70px",
      }}
    >
      <p
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "72px",
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          textShadow: "0 4px 30px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.6)",
          lineHeight: 1.25,
          letterSpacing: "-1px",
        }}
      >
        {text}
      </p>
    </AbsoluteFill>
  );
}

export function PropertyVideo({
  slides,
  photos,
  address,
  price,
}: PropertyVideoProps) {
  const { durationInFrames } = useVideoConfig();
  const slideCount = slides.length || 1;
  const slideDuration = Math.floor(durationInFrames / slideCount);

  // Cycle photos as backgrounds — each photo gets equal screen time
  const photoCount = photos.length;
  const photoDuration = photoCount > 0 ? Math.floor(durationInFrames / photoCount) : durationInFrames;

  return (
    <AbsoluteFill style={{ backgroundColor: "#111" }}>
      {/* Cycling photo backgrounds with Ken Burns */}
      {photoCount > 0 ? (
        photos.map((photo, i) => (
          <Sequence key={i} from={i * photoDuration} durationInFrames={photoDuration}>
            <PhotoBg photo={photo} panDir={i % 2 === 0 ? "left" : "right"} />
          </Sequence>
        ))
      ) : (
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(160deg, #1a3a4a 0%, #0d1f2d 40%, #1a2518 100%)",
          }}
        />
      )}

      {/* Gradient overlay — stronger at bottom for branding */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.82) 100%)",
        }}
      />

      {/* Text slides */}
      {slides.map((text, i) => (
        <Sequence key={i} from={i * slideDuration} durationInFrames={slideDuration}>
          <TextSlide text={text} />
        </Sequence>
      ))}

      {/* Branding bar */}
      <AbsoluteFill
        style={{
          top: "auto",
          bottom: 0,
          height: "160px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "2px",
            backgroundColor: "#a07040",
          }}
        />
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "28px",
            color: "#d4b896",
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          Twelve Rivers Realty
        </span>
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "22px",
            color: "#8a7a6a",
            letterSpacing: "2px",
          }}
        >
          Paul Smith · 512.228.8074
        </span>
      </AbsoluteFill>

      {/* Background music */}
      <Audio src="/music.mp3" volume={0.3} />
    </AbsoluteFill>
  );
}
