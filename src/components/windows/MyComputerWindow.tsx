"use client";

import { useState } from "react";
import DesktopWindow from "./DesktopWindow";
import { useDesktopStore } from "@/store/desktopStore";

interface ExplorerItem {
  id: string;
  icon: string;
  label: string;
  subtitle?: string;
  action: () => void;
}

export default function MyComputerWindow() {
  const { openWindow } = useDesktopStore();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const leftItems = [
    { id: "desktop", label: "Desktop" },
    { id: "mycomputer", label: "My Computer", selected: true },
    { id: "about", label: "About Me" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
    { id: "resume", label: "Resume.pdf" },
    { id: "systeminfo", label: "System Info" },
  ];

  const handleLeftItemClick = (id: string) => {
    if (id === "about") {
      openWindow({
        id: "about",
        type: "about",
        title: "About Me",
      });
    } else if (id === "projects") {
      openWindow({
        id: "projects",
        type: "projects",
        title: "Projects",
        width: 520,
        height: 420,
      });
    } else if (id === "skills") {
      openWindow({
        id: "skills",
        type: "skills",
        title: "Skills",
        width: 600,
        height: 500,
      });
    } else if (id === "contact") {
      openWindow({
        id: "contact",
        type: "contact",
        title: "Contact",
        width: 440,
        height: 520,
      });
    } else if (id === "resume") {
      openWindow({
        id: "resume",
        type: "resume",
        title: "Resume.pdf",
        width: 800,
        height: 600,
      });
    } else if (id === "systeminfo") {
      openWindow({
        id: "system-properties",
        type: "system-properties",
        title: "System Properties",
        width: 400,
        height: 480,
      });
    }
  };

  const rightItems: ExplorerItem[] = [
    {
      id: "c-drive",
      icon: "💾",
      label: "C: Sakila's OS",
      subtitle: "Main Portfolio System",
      action: () =>
        openWindow({
          id: "about",
          type: "about",
          title: "About Me",
        }),
    },
    {
      id: "d-drive",
      icon: "💾",
      label: "D: Architectures",
      subtitle: "Design Patterns • Systems",
      action: () =>
        openWindow({
          id: "architectures-drive",
          type: "architectures-drive",
          title: "D: Architectures",
          width: 640,
          height: 480,
        }),
    },
    {
      id: "e-drive",
      icon: "💾",
      label: "E: DevOps",
      subtitle: "Docker • CI/CD",
      action: () =>
        openWindow({
          id: "devops-drive",
          type: "devops-drive",
          title: "E: DevOps",
          width: 560,
          height: 480,
        }),
    },
    {
      id: "f-drive",
      icon: "💾",
      label: "F: Learning",
      subtitle: "Python • SQL • System Design",
      action: () =>
        openWindow({
          id: "skills",
          type: "skills",
          title: "Skills",
          width: 600,
          height: 500,
        }),
    },
    {
      id: "system-props",
      icon: "🖥️",
      label: "System Properties",
      subtitle: "About this OS",
      action: () =>
        openWindow({
          id: "system-properties",
          type: "system-properties",
          title: "System Properties",
          width: 400,
          height: 480,
        }),
    },
    {
      id: "resume-file",
      icon: "📄",
      label: "Resume.pdf",
      subtitle: "Open CV",
      action: () =>
        openWindow({
          id: "resume",
          type: "resume",
          title: "Resume.pdf",
          width: 800,
          height: 600,
        }),
    },
  ];

  const handleItemClick = (item: ExplorerItem) => {
    setSelectedItem(item.id);
  };

  const handleItemDoubleClick = (item: ExplorerItem) => {
    item.action();
  };

  const handleItemKeyDown = (
    e: React.KeyboardEvent,
    item: ExplorerItem
  ) => {
    if (e.key === "Enter") {
      item.action();
    }
  };

  return (
    <DesktopWindow id="my-computer" title="My Computer" width={720} height={520}>
      <div className="h-full flex bg-white">
        {/* LEFT SIDEBAR */}
        <div
          className="w-52 border-r-2 flex flex-col"
          style={{
            borderRightColor: "#808080",
            background: "#d4d4d4",
          }}
        >
          <div className="p-3">
            {leftItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleLeftItemClick(item.id)}
                className={`
                  px-4 py-2 mb-1 text-sm cursor-pointer
                  ${item.selected ? "bg-[#0b3d91] text-white font-semibold" : "hover:bg-[#0b3d91] hover:text-white"}
                `}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT PANE */}
        <div className="flex-1 flex flex-col overflow-auto">
          {/* Header */}
          <div
            className="px-4 py-3 border-b-2 text-sm font-semibold"
            style={{ borderBottomColor: "#808080" }}
          >
            Contents of My Computer
          </div>

          {/* Icon Grid */}
          <div className="flex-1 p-6 grid grid-cols-3 gap-6 auto-rows-max content-start">
            {rightItems.map((item) => (
              <div
                key={item.id}
                tabIndex={0}
                onClick={() => handleItemClick(item)}
                onDoubleClick={() => handleItemDoubleClick(item)}
                onKeyDown={(e) => handleItemKeyDown(e, item)}
                className={`
                  flex flex-col items-center p-4 cursor-pointer rounded
                  ${selectedItem === item.id ? "bg-[#0b3d91] text-white" : "hover:bg-[#e8e8e8]"}
                `}
              >
                <div className="text-5xl mb-3">{item.icon}</div>
                <div className="text-sm font-semibold text-center">{item.label}</div>
                {item.subtitle && (
                  <div
                    className={`text-xs text-center mt-1 ${
                      selectedItem === item.id ? "text-white/90" : "text-gray-600"
                    }`}
                  >
                    {item.subtitle}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DesktopWindow>
  );
}
