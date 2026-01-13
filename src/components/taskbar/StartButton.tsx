"use client";

interface StartButtonProps {
  isPressed: boolean;
  onClick: () => void;
}

export default function StartButton({ isPressed, onClick }: StartButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        h-[40px] px-3 mx-1 my-1
        flex items-center gap-2
        bg-[#C0C0C0]
        font-bold text-[14px]
        select-none
        cursor-pointer
        ${
          isPressed
            ? "border-t-[#808080] border-l-[#808080] border-b-[#FFFFFF] border-r-[#FFFFFF]"
            : "border-t-[#FFFFFF] border-l-[#FFFFFF] border-b-[#808080] border-r-[#808080]"
        }
        border-t-2 border-l-2 border-b-2 border-r-2
      `}
    >
      {/* Windows logo */}
      <div className="w-5 h-5 grid grid-cols-2 grid-rows-2 gap-[1px]">
        <div className="bg-[#FF0000]" />
        <div className="bg-[#00FF00]" />
        <div className="bg-[#0000FF]" />
        <div className="bg-[#FFFF00]" />
      </div>
      <span className="text-black">Start</span>
    </button>
  );
}
