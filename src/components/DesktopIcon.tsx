/**
 * DesktopIcon - Windows 98-style desktop icon
 * Accessible sizing with 48x48 icons
 */

import Image from "next/image";

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick?: () => void;
}

export default function DesktopIcon({
  icon,
  label,
  onClick,
}: DesktopIconProps) {
  return (
    <div
      onClick={onClick}
      className="
        w-[84px] p-2
        flex flex-col items-center
        cursor-pointer
        hover:bg-[#000080]/30
        rounded-sm
        group
      "
    >
      {/* Icon image - 48x48 for accessibility */}
      <div className="w-[48px] h-[48px] relative mb-1">
        <Image
          src={icon}
          alt={label}
          width={48}
          height={48}
          className="pixelated drop-shadow-md"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      {/* Icon label - larger font for readability */}
      <span
        className="
          text-center text-[13px] leading-tight
          text-white
          px-1 py-[2px]
          group-hover:bg-[#000080]
          break-words w-full
          line-clamp-2 text-ellipsis overflow-hidden
        "
        style={{
          fontFamily: 'Tahoma, "MS Sans Serif", Verdana, sans-serif',
          textShadow: "1px 1px 2px rgba(0,0,0,0.9)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
