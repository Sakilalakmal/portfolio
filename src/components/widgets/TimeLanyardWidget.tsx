"use client";

import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { useNow } from "@/hooks/useNow";
import { formatDate, formatTime } from "@/lib/dateTime";
import { ErrorBoundary } from "../common/ErrorBoundary";

const TimeLanyardCanvas = dynamic(() => import("./TimeLanyardCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function TimeLanyardWidget() {
  const now = useNow();
  const timeString = formatTime(now);
  const dateString = formatDate(now);

  // Pin state: true = fixed top-right, false = draggable (implementation of draggable left as future generic gadget work,
  // but for now we basically toggle a visual state or class)
  // Requirement: "Add a 'Pin' toggle... When pinned: stays top-right. When unpinned: it can be dragged around"
  // Since react-rnd is familiar to this codebase, we could wrap usage.
  // However, keeping it simple first: Toggle logic.
  // For this step, I will implement the container logic.
  const [isPinned, setIsPinned] = useState(true);

  // We need to pass a ref to the container for "eventSource" if we want to confine events,
  // but for click-through "eventSource={document.body}" is key.
  // HOWEVER, enabling eventSource on body makes the WHOLE screen interactive for the canvas.
  // We want to limit the canvas VISUALLY to the top-right but INTERACTIVELY allow pass-through.

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: isPinned ? "12px" : "12px", // Fixed for now, would be Rnd-driven if fully unpinned
          right: isPinned ? "12px" : "auto",
          left: isPinned ? "auto" : "50%", // Just a visual change for unpinned demo if needed
          width: "280px",
          height: "300px",
          zIndex: 10, // Below active windows (usually 20+) but above wallpaper
          pointerEvents: "none", // Allow clicks to pass through the container
        }}
        className="lanyard-widget-container"
      >
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          {/* Toggle Pin Button - needs pointer-events: auto */}
          <button
            onClick={() => setIsPinned(!isPinned)}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 20,
              pointerEvents: "auto",
              opacity: 0.5,
              cursor: "pointer",
              padding: "4px",
              background: "transparent",
              border: "none",
            }}
            className="hover:opacity-100 transition-opacity"
            title={isPinned ? "Unpin widget" : "Pin widget"}
          >
            {/* Simple Pin Icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isPinned ? "text-gray-400" : "text-white"}
            >
              <line x1="12" y1="17" x2="12" y2="22"></line>
              <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
            </svg>
          </button>

          <ErrorBoundary
            fallback={<FallbackWidget time={timeString} date={dateString} />}
          >
            <Suspense
              fallback={<FallbackWidget time={timeString} date={dateString} />}
            >
              <TimeLanyardCanvas
                time={timeString}
                date={dateString}
                isPinned={isPinned}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}

function FallbackWidget({ time, date }: { time: string; date: string }) {
  return (
    <div
      style={{
        pointerEvents: "none", // Fallback shouldn't block either
        background: "transparent",
        padding: "20px",
        textAlign: "right",
      }}
    >
      <div className="text-3xl font-bold text-white/90 drop-shadow-md">
        {time}
      </div>
      <div className="text-sm text-white/70 drop-shadow-sm">{date}</div>
    </div>
  );
}
