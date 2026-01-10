/**
 * StartButton - Windows 98-style Start button
 * Accessible sizing with larger click target
 */

export default function StartButton() {
  return (
    <button
      className="
        h-[40px] px-3 mx-1 my-1
        flex items-center gap-2
        bg-[#C0C0C0]
        font-bold text-[14px]
        border-t-[#FFFFFF] border-l-[#FFFFFF]
        border-b-[#808080] border-r-[#808080]
        border-t-2 border-l-2 border-b-2 border-r-2
        hover:border-t-[#808080] hover:border-l-[#808080]
        hover:border-b-[#FFFFFF] hover:border-r-[#FFFFFF]
        active:border-t-[#808080] active:border-l-[#808080]
        active:border-b-[#FFFFFF] active:border-r-[#FFFFFF]
        cursor-pointer
        select-none
      "
      style={{ fontFamily: 'Tahoma, "MS Sans Serif", Verdana, sans-serif' }}
    >
      {/* Windows logo - 5x5 grid for better visibility */}
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
