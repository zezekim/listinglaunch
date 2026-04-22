"use client";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";

interface PropertyVideoProps {
  slides: string[];
  photos: string[];
  address: string;
  price: string;
}

function TextSlide({
  text,
  startFrame,
  durationInFrames,
}: {
  text: string;
  startFrame: number;
  durationInFrames: number;
}) {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;
  const opacity = interpolate(
    localFrame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const translateY = interpolate(localFrame, [0, 15], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
      }}
    >
      <p
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "52px",
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          textShadow: "0 2px 20px rgba(0,0,0,0.8)",
          lineHeight: 1.3,
          maxWidth: "900px",
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
  const { fps, durationInFrames } = useVideoConfig();
  const slideDuration = Math.floor(durationInFrames / slides.length);
  const photo = photos[0] || null;

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1a1a" }}>
      {/* Background photo or gradient */}
      {photo ? (
        <AbsoluteFill>
          <img
            src={photo}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.55,
            }}
          />
        </AbsoluteFill>
      ) : (
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(135deg, #1a3a4a 0%, #0d2233 50%, #1a2a1a 100%)",
          }}
        />
      )}

      {/* Dark overlay for readability */}
      <AbsoluteFill
        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      />

      {/* Branding bar */}
      <AbsoluteFill
        style={{
          bottom: 0,
          top: "auto",
          height: "80px",
          background: "rgba(10,30,20,0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTop: "2px solid #8B7355",
        }}
      >
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "22px",
            color: "#d4b896",
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          Twelve Rivers Realty · Paul Smith · 512.228.8074
        </span>
      </AbsoluteFill>

      {/* Text slides */}
      {slides.map((text, i) => (
        <Sequence
          key={i}
          from={i * slideDuration}
          durationInFrames={slideDuration}
        >
          <TextSlide
            text={text}
            startFrame={i * slideDuration}
            durationInFrames={slideDuration}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}
