"use client";

/**
 * DesktopWindow - Reusable Windows 98-style window component
 * Features title bar, minimize/close buttons, 3D borders
 */

import { Rnd } from "react-rnd";
import type { DraggableData, RndDragEvent } from "react-rnd";
import { useDesktopStore } from "@/store/desktopStore";
import { useEffect, useState } from "react";

interface DesktopWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  width?: number;
  height?: number;
  hideCloseButton?: boolean;
  hideTitle?: boolean;
}

export default function DesktopWindow({
  id,
  title,
  children,
  width = 560,
  height = 360,
  hideCloseButton = false,
  hideTitle = false,
}: DesktopWindowProps) {
  const {
    activeWindowId,
    focusWindow,
    minimizeWindow,
    closeWindow,
    windows,
    updateWindowPosition,
    updateWindowSize,
  } = useDesktopStore();

  const isActive = activeWindowId === id;
  const windowState = windows.find((w) => w.id === id);

  // Local state for hydration mismatch prevention (Rnd needs client-side only)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted || !windowState) return null;

  return (
    <Rnd
      default={{
        x: windowState.x ?? 100,
        y: windowState.y ?? 50,
        width: width,
        height: height,
      }}
      position={
        windowState.x !== undefined && windowState.y !== undefined
          ? { x: windowState.x, y: windowState.y }
          : undefined
      }
      onDragStop={(_e: RndDragEvent, d: DraggableData) => {
        updateWindowPosition(id, d.x, d.y);
      }}
      onResizeStop={(
        e: MouseEvent | TouchEvent,
        direction,
        ref,
        delta,
        position
      ) => {
        if (updateWindowSize) {
          updateWindowSize(
            id,
            parseInt(ref.style.width),
            parseInt(ref.style.height)
          );
        }
        updateWindowPosition(id, position.x, position.y);
      }}
      onMouseDown={() => focusWindow(id)}
      dragHandleClassName="window-title-bar"
      enableResizing={true}
      minWidth={300}
      minHeight={200}
      bounds="window"
      style={{ zIndex: isActive ? 50 : 10 }}
    >
      <div
        className={`
          flex flex-col h-full
          bg-[#C0C0C0]
          shadow-[2px_2px_10px_rgba(0,0,0,0.5)]
          ${isActive ? "" : "opacity-95"}
        `}
        style={{
          // 3D border effect
          borderTop: "2px solid #DFDFDF",
          borderLeft: "2px solid #DFDFDF",
          borderRight: "2px solid #000000",
          borderBottom: "2px solid #000000",
          boxShadow: "inset 1px 1px 0px #FFFFFF, inset -1px -1px 0px #808080",
        }}
        onClick={() => focusWindow(id)}
      >
        {/* Title Bar */}
        <div
          className={`
            window-title-bar
            ${hideTitle ? "h-[8px] opacity-0" : "h-[32px]"}
            px-1 mx-[2px] mt-[2px]
            flex items-center
            select-none cursor-default
            ${
              isActive
                ? "bg-gradient-to-r from-black to-[#0b3d91]"
                : "bg-[#808080]"
            }
          `}
        >
          {/* Window Title */}
          {!hideTitle && (
            <span
              className="flex-1 text-white text-[14px] font-bold px-1 truncate drop-shadow-sm"
              style={{
                fontFamily: 'Tahoma, "MS Sans Serif", Verdana, sans-serif',
                letterSpacing: "0.5px",
              }}
            >
              {title}
            </span>
          )}

          {/* Window Controls */}
          {!hideTitle && (
            <div className="flex gap-[4px] mr-[1px]">
              {/* Minimize Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  minimizeWindow(id);
                }}
                className="
                  w-[22px] h-[22px]
                  bg-[#C0C0C0]
                  flex items-center justify-center
                  border-t-[#FFFFFF] border-l-[#FFFFFF]
                  border-b-[#000000] border-r-[#000000]
                  border-t-2 border-l-2 border-b border-r
                  active:border-t-[#000000] active:border-l-[#000000]
                  active:border-b-[#FFFFFF] active:border-r-[#FFFFFF]
                  active:border-t active:border-l active:border-b-2 active:border-r-2
                "
              >
                <div className="w-2 h-[2px] bg-black mt-2" />
              </button>

              {/* Close Button */}
              {!hideCloseButton && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeWindow(id);
                  }}
                  className="
                  w-[22px] h-[22px]
                  bg-[#c0392b]
                  flex items-center justify-center
                  text-[14px] font-bold text-white
                  border-t-[#ff8a80] border-l-[#ff8a80]
                  border-b-[#000000] border-r-[#000000]
                  border-t-2 border-l-2 border-b border-r
                  active:border-t-[#000000] active:border-l-[#000000]
                  active:border-b-[#ff8a80] active:border-r-[#ff8a80]
                  active:border-t active:border-l active:border-b-2 active:border-r-2
                "
                  style={{ textShadow: "0 1px 0 rgba(0,0,0,0.5)" }}
                >
                  ✕
                </button>
              )}
            </div>
          )}
        </div>

        {/* Window Content */}
        <div
          className="flex-1 p-4 m-[2px] mt-1 bg-[#d4d4d4] overflow-auto text-black"
          style={{
            borderTop: "2px solid #808080",
            borderLeft: "2px solid #808080",
            borderRight: "2px solid #FFFFFF",
            borderBottom: "2px solid #FFFFFF",
          }}
        >
          {children}
        </div>
      </div>
    </Rnd>
  );
}
