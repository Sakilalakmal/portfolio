import { useState } from "react";
import { useNow } from "@/hooks/useNow";
import { formatDate, formatTime } from "@/lib/dateTime";

export default function TopRightGadget() {
  const now = useNow();
  const [isVisible, setIsVisible] = useState(true);

  if (!now || !isVisible) return null;

  return (
    <div
      className="
        fixed top-[14px] right-[14px]
        w-[280px] h-auto
        flex flex-col
        font-sans
        select-none
        z-10
        animate-in fade-in zoom-in-95 duration-500
      "
    >
      {/* Win98 Bevel Frame */}
      <div
        className="
        w-full h-full
        bg-[#c0c0c0]
        border-t-[2px] border-t-[#dfdfdf]
        border-l-[2px] border-l-[#dfdfdf]
        border-r-[2px] border-r-[#404040]
        border-b-[2px] border-b-[#404040]
        p-[2px]
        relative
      "
        style={{
          boxShadow: "2px 2px 0px 0px rgba(0,0,0,0.3)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="
            absolute top-[4px] right-[4px]
            w-[18px] h-[18px]
            bg-[#c0c0c0]
            border-t-[1px] border-t-[#ffffff]
            border-l-[1px] border-l-[#ffffff]
            border-r-[1px] border-r-[#404040]
            border-b-[1px] border-b-[#404040]
            flex items-center justify-center
            text-[10px] font-bold
            text-black
            hover:bg-[#b0b0b0]
            active:border-t-[#404040] active:border-l-[#404040]
            active:border-r-[#ffffff] active:border-b-[#ffffff]
            cursor-pointer
            z-10
          "
          aria-label="Close gadget"
        >
          ×
        </button>

        {/* Content Area */}
        <div
          className="
            w-full
            bg-gradient-to-br from-[#2a2a3e] to-[#1a1a2e]
            border-t-[1.5px] border-t-[#000000]
            border-l-[1.5px] border-l-[#000000]
            border-r-[1.5px] border-r-[#808080]
            border-b-[1.5px] border-b-[#808080]
            p-5
            flex flex-col items-center justify-center
            text-[#e0e0e0]
            relative
            overflow-hidden
          "
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: "url('/weather.png')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          {/* Content with z-index to appear above background */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Time */}
            <div className="text-[42px] font-bold tracking-wide text-[#ffd89b] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-mono tabular-nums">
              {formatTime(now)}
            </div>

            {/* Date */}
            <div className="mt-2 text-[11px] font-medium opacity-90 uppercase tracking-[0.15em] text-center text-[#ffe4b5] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              {formatDate(now)}
            </div>

            {/* Separator */}
            <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#ff8c42] to-transparent my-3 opacity-60"></div>

            {/* Weather Placeholder */}
            <div className="flex items-center gap-2 text-[10px] text-[#ffd89b] opacity-80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffb347] shadow-[0_0_8px_rgba(255,179,71,0.8)]"></div>
              <span>Mostly Cloudy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
