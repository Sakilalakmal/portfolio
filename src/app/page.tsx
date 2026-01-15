"use client";

import { useState } from "react";
import Desktop from "@/components/Desktop";

const wallpapers = [
  { type: "video", src: "/live-wallpaper/port.mp4" },
  { type: "image", src: "/wallpapers/default.png" },
] as const;

export default function Home() {
  const [wallpaperIndex, setWallpaperIndex] = useState(1);
  
  const currentWallpaper = wallpapers[wallpaperIndex];
  
  const changeWallpaper = () => {
    setWallpaperIndex((prev) => (prev + 1) % wallpapers.length);
  };

  return (
    <>
      {/* Wallpaper Background */}
      {currentWallpaper.type === "video" ? (
        <video
          key={currentWallpaper.src}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            objectFit: "cover",
            zIndex: -1,
          }}
        >
          <source src={currentWallpaper.src} type="video/mp4" />
        </video>
      ) : (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundImage: `url(${currentWallpaper.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: -1,
          }}
        />
      )}

      <Desktop />

      {/* Change Wallpaper Button */}
      <button
        onClick={changeWallpaper}
        className="
          fixed bottom-20 right-6 z-50
          px-6 py-3
          text-[13px] font-bold
          shadow-[inset_-1px_-1px_0px_0px_#000000,inset_1px_1px_0px_0px_#ffffff,inset_-2px_-2px_0px_0px_#808080,inset_2px_2px_0px_0px_#dfdfdf]
          active:shadow-[inset_1px_1px_0px_0px_#000000,inset_-1px_-1px_0px_0px_#ffffff,inset_2px_2px_0px_0px_#808080,inset_-2px_-2px_0px_0px_#dfdfdf]
        "
        style={{
          backgroundColor: '#c0c0c0',
          color: '#000000',
          fontFamily: 'var(--font-msw98-regular), "MS Sans Serif", Tahoma, sans-serif',
          imageRendering: 'pixelated',
        }}
      >
        🖼️ Change Wallpaper
      </button>
    </>
  );
}
