"use client";

import PixelSnow from "@/components/PixelSnow";

/**
 * Pixel Snow Background
 *
 * Full-screen animated snow effect using React Bits official component.
 * Uses Three.js WebGL shaders for realistic 3D snow with depth and perspective.
 *
 * Sits behind all desktop elements with pointer-events: none.
 */
export default function PixelSnowBackground() {
  return (
    <>
      {/* Pure black background - React Bits style */}
      <div
        className="fixed inset-0"
        style={{
          background: "#000000",
          zIndex: -10,
        }}
      />

      {/* Official React Bits Pixel Snow - in front of background, behind desktop */}
      <div
        className="fixed inset-0 z-0"
        style={{
          pointerEvents: "none",
        }}
      >
        <PixelSnow
          color="#ffffff"
          flakeSize={0.001}
          minFlakeSize={0.15}
          pixelResolution={150}
          speed={0.4}
          depthFade={10}
          farPlane={25}
          brightness={1.2}
          gamma={0.5}
          density={0.25}
          variant="square"
          direction={135}
        />
      </div>
    </>
  );
}
