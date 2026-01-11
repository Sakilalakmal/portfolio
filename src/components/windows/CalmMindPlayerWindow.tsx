"use client";

/**
 * CalmMindPlayerWindow - Modern music player with glassmorphism
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
      width={300}
      height={380}
    >
      <div className="h-full w-full p-3 overflow-hidden">
        {/* Modern Player Container */}
        <div
          className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          }}
        >
          {/* Animated Background Gradient */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 60% 40%, #A15EE1 0%, transparent 70%)",
              animation: "pulse 4s ease-in-out infinite",
            }}
          />

          {/* Content Container */}
          <div className="relative h-full flex flex-col p-4">
            {/* Album Art Section - Compact */}
            <div className="flex-shrink-0 mb-3">
              <div
                className="relative w-full aspect-square rounded-xl overflow-hidden shadow-xl group"
                style={{
                  maxWidth: "180px",
                  margin: "0 auto",
                }}
              >
                {/* Album Art */}
                <div className="relative w-full h-full bg-gradient-to-br from-purple-900/20 to-purple-600/20">
                  <Image
                    src="/music-photo.png"
                    alt="Album Art"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Floating Play Button Overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={toggle}
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110"
                      style={{
                        boxShadow: "0 8px 32px rgba(161, 94, 225, 0.3)",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Track Info - Compact */}
            <div className="flex-shrink-0 text-center mb-3">
              <h3 className="text-white text-sm font-semibold mb-0.5 truncate">
                {currentTrack?.title || "No Track"}
              </h3>
              <p className="text-gray-400 text-xs truncate">
                {currentTrack?.artist || "Unknown Artist"}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="flex-shrink-0 mb-3">
              {/* Time Labels */}
              <div className="flex justify-between text-[10px] text-gray-400 mb-1.5 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Progress Track */}
              <div
                className="relative h-1 bg-white/10 rounded-full cursor-pointer overflow-hidden group"
                onClick={handleProgressClick}
              >
                {/* Progress Fill */}
                <div
                  className="absolute h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-100"
                  style={{
                    width: `${progress}%`,
                    boxShadow: "0 0 10px rgba(161, 94, 225, 0.5)",
                  }}
                />
                {/* Hover Indicator */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              </div>

              {/* Waveform Visualization - Compact */}
              <div className="flex justify-center gap-0.5 mt-2 h-6">
                {[10, 14, 18, 16, 12, 16, 10, 8].map((height, i) => (
                  <div
                    key={i}
                    className="w-0.5 bg-gradient-to-t from-purple-500/40 to-purple-400/20 rounded-full transition-all duration-300"
                    style={{
                      height: isPlaying ? `${height}px` : "6px",
                      transitionDelay: `${i * 50}ms`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Controls - 3D Buttons */}
            <div className="flex-shrink-0 flex items-center justify-center gap-4 mt-auto">
              {/* Previous Button - 3D Style */}
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(145deg, #2a2a3e, #1f1f2e)",
                  boxShadow:
                    "0 4px 10px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1)",
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.boxShadow =
                    "inset 0 3px 6px rgba(0, 0, 0, 0.5)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1)";
                }}
                aria-label="Previous track"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>

              {/* Play/Pause Button - 3D Style */}
              <button
                onClick={toggle}
                className="w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                style={{
                  background:
                    "linear-gradient(145deg, #B855E8, #9B4DD3, #7A3AAD)",
                  boxShadow:
                    "0 8px 20px rgba(161, 94, 225, 0.5), 0 4px 10px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.2)",
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.boxShadow =
                    "inset 0 5px 10px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(161, 94, 225, 0.3)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(161, 94, 225, 0.5), 0 4px 10px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(161, 94, 225, 0.5), 0 4px 10px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.2)";
                }}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                    style={{ marginLeft: "2px" }}
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Next Button - 3D Style */}
              <button
                onClick={next}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(145deg, #2a2a3e, #1f1f2e)",
                  boxShadow:
                    "0 4px 10px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1)",
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.boxShadow =
                    "inset 0 3px 6px rgba(0, 0, 0, 0.5)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1)";
                }}
                aria-label="Next track"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M16 18h2V6h-2zm-11-6l8.5-6v12z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </DesktopWindow>
  );
}
