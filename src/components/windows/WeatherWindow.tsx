import { useNow } from "@/hooks/useNow";
import { formatDate, formatTime } from "@/lib/dateTime";
import DesktopWindow from "./DesktopWindow";

export default function WeatherWindow() {
  const now = useNow();

  if (!now) return null;

  return (
    <DesktopWindow
      id="weather"
      title="Weather"
      width={280}
      height={320}
      hideCloseButton
      hideTitle
    >
      <div
        className="h-full w-full relative overflow-hidden flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/weather.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Content with overlay for readability */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          {/* Time */}
          <div className="text-[48px] font-bold tracking-wide text-[#ffd89b] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-mono tabular-nums">
            {formatTime(now)}
          </div>

          {/* Date */}
          <div className="mt-3 text-[12px] font-medium opacity-95 uppercase tracking-[0.2em] text-[#ffe4b5] drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
            {formatDate(now)}
          </div>

          {/* Separator */}
          <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#ff8c42] to-transparent my-4 opacity-70"></div>

          {/* Weather Placeholder */}
          <div className="flex items-center gap-2 text-[11px] text-[#ffd89b] opacity-90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
            <div className="w-3 h-3 rounded-full bg-[#ffb347] shadow-[0_0_10px_rgba(255,179,71,0.9)]"></div>
            <span>Mostly Cloudy</span>
          </div>
        </div>
      </div>
    </DesktopWindow>
  );
}
