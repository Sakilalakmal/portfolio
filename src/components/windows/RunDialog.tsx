"use client";

import { useState, useEffect, useRef } from "react";
import DesktopWindow from "./DesktopWindow";
import { useDesktopStore } from "@/store/desktopStore";

export default function RunDialog() {
  const [input, setInput] = useState("");
  const { closeWindow, openWindow } = useDesktopStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleOk = () => {
    const command = input.toLowerCase().trim();
    if (command === "about" || command === "me" || command === "terminal") {
      openWindow({
        id: "terminal",
        type: "terminal",
        title: "Terminal — about_me.sh",
        width: 650,
        height: 480,
      });
    }
    closeWindow("run");
  };

  const handleCancel = () => {
    closeWindow("run");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleOk();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <DesktopWindow id="run" title="Run" width={420} height={180}>
      <div className="h-full flex flex-col gap-4 p-4 bg-[#d4d4d4]">
        {/* Instruction text */}
        <p className="text-[13px] leading-relaxed">
          Type the name of a program, folder, document, or Internet resource.
        </p>

        {/* Input field */}
        <div className="flex items-center gap-2">
          <label className="text-[13px] font-bold">Open:</label>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="
              flex-1 px-2 py-1
              bg-white
              border-2
              border-t-[#808080] border-l-[#808080]
              border-b-[#FFFFFF] border-r-[#FFFFFF]
              text-[13px]
              font-mono
              outline-none
            "
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-auto">
          <button
            onClick={handleOk}
            className="
              px-6 py-1.5
              bg-[#C0C0C0]
              text-[13px] font-bold
              border-t-2 border-l-2 border-[#FFFFFF]
              border-b-2 border-r-2 border-[#808080]
              active:border-t-2 active:border-l-2 active:border-[#808080]
              active:border-b-2 active:border-r-2 active:border-[#FFFFFF]
              cursor-pointer
            "
          >
            OK
          </button>
          <button
            onClick={handleCancel}
            className="
              px-6 py-1.5
              bg-[#C0C0C0]
              text-[13px] font-bold
              border-t-2 border-l-2 border-[#FFFFFF]
              border-b-2 border-r-2 border-[#808080]
              active:border-t-2 active:border-l-2 active:border-[#808080]
              active:border-b-2 active:border-r-2 active:border-[#FFFFFF]
              cursor-pointer
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </DesktopWindow>
  );
}
