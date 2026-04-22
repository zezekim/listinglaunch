"use client";
import { Composition } from "remotion";
import { PropertyVideo } from "./PropertyVideo";

export function RemotionRoot() {
  return (
    <Composition
      id="PropertyVideo"
      component={PropertyVideo as any}
      durationInFrames={150}
      fps={30}
      width={1080}
      height={1080}
      defaultProps={{
        slides: [
          "Now Available in Austin",
          "4 Bed · 3 Bath · $975K",
          "Your next chapter starts here.",
          "Contact Paul Smith · 512.228.8074",
        ],
        photos: [],
        address: "123 Main St, Austin TX",
        price: "$975,000",
      }}
    />
  );
}
