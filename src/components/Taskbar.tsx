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
        bg-[#1b1b1b]
        flex items-center
        border-t-2 border-t-[#3a3a3a]
        shadow-[inset_0_1px_0_#555555]
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
            bg-[#1b1b1b]
            border-t-[#101010] border-l-[#101010]
            border-b-[#3a3a3a] border-r-[#3a3a3a]
            border-t border-l border-b border-r
          "
        >
          12:00 PM
        </div>
      </div>
    </div>
  );
}
