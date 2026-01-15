"use client";

import { useState } from "react";
import DesktopWindow from "./DesktopWindow";
import { useDesktopStore } from "@/store/desktopStore";

interface Architecture {
  id: string;
  name: string;
  icon: string;
  type: "architecture" | "service";
}

export default function MicroservicesDriveWindow() {
  const { openWindow } = useDesktopStore();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const architectures: Architecture[] = [
    { id: "monolithic", name: "Monolithic Architecture", icon: "🏛️", type: "architecture" },
    { id: "microservices", name: "Microservices Architecture", icon: "🔷", type: "architecture" },
  ];

  const handleItemClick = (item: Architecture) => {
    setSelectedItem(item.id);
  };

  const handleItemDoubleClick = (item: Architecture) => {
    if (item.id === "microservices") {
      openWindow({
        id: "microservices-details",
        type: "microservices-details",
        title: "Microservices Architecture",
        width: 680,
        height: 520,
      });
    } else if (item.id === "monolithic") {
      openWindow({
        id: "monolithic-details",
        type: "monolithic-details",
        title: "Monolithic Architecture",
        width: 580,
        height: 480,
      });
    }
  };

  const handleItemKeyDown = (
    e: React.KeyboardEvent,
    item: Architecture
  ) => {
    if (e.key === "Enter") {
      handleItemDoubleClick(item);
    }
  };

  return (
    <DesktopWindow
      id="architectures-drive"
      title="D: Architectures"
      width={640}
      height={480}
    >
      <div className="h-full flex flex-col bg-white">
        {/* Header */}
        <div
          className="px-4 py-3 border-b-2 text-sm font-semibold"
          style={{ borderBottomColor: "#808080" }}
        >
          Software Architecture Patterns
        </div>

        {/* Architecture Grid */}
        <div className="flex-1 p-8 flex gap-8 items-start justify-center overflow-auto">
          {architectures.map((item) => (
            <div
              key={item.id}
              tabIndex={0}
              onClick={() => handleItemClick(item)}
              onDoubleClick={() => handleItemDoubleClick(item)}
              onKeyDown={(e) => handleItemKeyDown(e, item)}
              className={`
                flex flex-col items-center p-6 cursor-pointer rounded-lg w-52
                ${
                  selectedItem === item.id
                    ? "bg-[#0b3d91] text-white"
                    : "hover:bg-[#e8e8e8]"
                }
              `}
            >
              <div className="text-6xl mb-4">{item.icon}</div>
              <div className="text-base font-semibold text-center wrap-break">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DesktopWindow>
  );
}
