/**
 * Taskbar - Windows 98-style taskbar
 * Accessible height with 3D border effect
 */

import StartButton from "./StartButton";

export default function Taskbar() {
  return (
    <div
      className="
        fixed bottom-0 left-0 right-0
        h-[52px]
        bg-[#1b1b1b]/30
        backdrop-blur-md
        flex items-center
        border-t-2 border-t-white/20
        shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]
        z-50
      "
    >
      {/* Start Button */}
      <StartButton />

      {/* Spacer for future taskbar buttons */}
      <div className="flex-1" />

      {/* System tray area */}
      <div className="mr-1 flex items-center">
        <div
          className="
            px-3 h-[36px]
            flex items-center
            text-[13px] text-white
            bg-black/20
            border-t-white/10 border-l-white/10
            border-b-white/30 border-r-white/30
            border-t border-l border-b border-r
          "
        >
          12:00 PM
        </div>
      </div>
    </div>
  );
}
