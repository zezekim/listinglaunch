"use client";
import { Composition } from "remotion";
import { PropertyVideo } from "./PropertyVideo";

export function RemotionRoot() {
  return (
    <Composition
      id="PropertyVideo"
      component={PropertyVideo as any}
      durationInFrames={900}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        slides: [
          "Now Available in South Austin",
          "4 Bed · 3 Bath · $1,175,000",
          "Pool. Views. Your next chapter.",
          "Contact Paul Smith · 512.228.8074",
        ],
        photos: [],
        address: "3412 Palomino Lane, Austin TX 78704",
        price: "$1,175,000",
      }}
    />
  );
}
