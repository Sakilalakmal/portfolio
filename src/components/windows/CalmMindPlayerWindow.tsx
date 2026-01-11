"use client";

/**
 * CalmMindPlayerWindow - iPod-style music player window
 * Features: playlist, play/pause, next/prev, seeking, time display
 */

import { useState, useEffect } from "react";
import Image from "next/image";
import DesktopWindow from "./DesktopWindow";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { calmMindPlaylist } from "@/lib/playlist";

// Format time in mm:ss
function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function CalmMindPlayerWindow() {
  const {
    isPlaying,
    currentTime,
    duration,
    currentTrack,
    toggle,
    next,
    prev,
    seek,
  } = useAudioPlayer({ playlist: calmMindPlaylist });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    seek(percentage * duration);
  };

  return (
    <DesktopWindow
      id="calm-mind-player"
      title="Calm Your Messy Mind"
      width={360}
      height={520}
    >
      <div className="h-full flex items-center justify-center p-4">
        {/* iPod Device Container */}
        <div
          className="relative w-full max-w-[320px] rounded-3xl p-6 shadow-2xl"
          style={{
            background: "linear-gradient(145deg, #B855E8 0%, #8B3FC7 100%)",
            boxShadow:
              "0 20px 60px rgba(161, 94, 225, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          {/* Top Info Box */}
          <div
            className="bg-white/90 rounded-2xl p-3 mb-4 flex items-center gap-3 shadow-md"
            style={{
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Music Photo */}
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-purple-100">
              <Image
                src="/music-photo.png"
                alt="Music"
                fill
                className="object-cover"
              />
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-gray-900 truncate">
                {currentTrack?.title || "No Track"}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {currentTrack?.artist || "Unknown Artist"}
              </div>
            </div>
          </div>

          {/* Screen Area */}
          <div
            className="rounded-2xl p-6 mb-4 shadow-inner"
            style={{
              background: "linear-gradient(135deg, #7C3AAE 0%, #5E2B8A 100%)",
              minHeight: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="text-center">
              <div className="text-white text-lg font-bold mb-2 px-2 line-clamp-2">
                {currentTrack?.title || "No Track Playing"}
              </div>
              {/* Decorative Lines */}
              <div className="flex justify-center gap-1 mt-4">
                {[12, 18, 24, 20, 16, 22, 14, 10].map((height, i) => (
                  <div
                    key={i}
                    className="w-1 bg-white/30 rounded-full transition-all duration-300"
                    style={{
                      height: isPlaying ? `${height}px` : "8px",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Progress Bar Section */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-white/80 mb-2 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Progress Bar */}
            <div
              className="h-2 bg-white/20 rounded-full cursor-pointer relative overflow-hidden"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-white rounded-full transition-all duration-100 shadow-lg"
                style={{
                  width: `${progress}%`,
                  boxShadow: "0 0 10px rgba(255,255,255,0.5)",
                }}
              />
            </div>
          </div>

          {/* iPod Wheel */}
          <div className="relative w-full aspect-square max-w-[240px] mx-auto">
            {/* Outer Circle */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(145deg, #9B4DD3 0%, #7A3AAD 100%)",
                boxShadow:
                  "inset 0 2px 10px rgba(0,0,0,0.3), 0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              {/* Labels */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-xs font-bold">
                MENU
              </div>

              {/* Left - Previous */}
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:scale-110 active:scale-95 transition-transform"
                aria-label="Previous track"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>

              {/* Right - Next */}
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:scale-110 active:scale-95 transition-transform"
                aria-label="Next track"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 18h2V6h-2zm-11-6l8.5-6v12z" />
                </svg>
              </button>

              {/* Bottom - Play/Pause */}
              <button
                onClick={toggle}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white hover:scale-110 active:scale-95 transition-transform"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Center Button */}
              <button
                onClick={toggle}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full hover:scale-105 active:scale-95 transition-transform"
                style={{
                  background:
                    "linear-gradient(145deg, #8B4DC7 0%, #6B3AA0 100%)",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
                aria-label="Play/Pause"
              >
                <div className="text-white/40 text-xs font-bold">
                  {isPlaying ? "⏸" : "▶"}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DesktopWindow>
  );
}
