"use client";

/**
 * Desktop - Main Windows 98-style desktop container
 * Full viewport with wallpaper, icons, windows, and taskbar
 */

import { useEffect } from "react";
import DesktopIcon from "./DesktopIcon";
import Taskbar from "./Taskbar";
import AboutWindow from "./windows/AboutWindow";
import { useDesktopStore } from "@/store/desktopStore";

// Desktop icons configuration
const desktopIcons = [
  { icon: "/icons/computer.svg", label: "My Computer", windowId: null },
  { icon: "/icons/folder.svg", label: "Projects", windowId: null },
  { icon: "/icons/about.svg", label: "About", windowId: "about" },
  { icon: "/icons/contact.svg", label: "Contact", windowId: null },
];

export default function Desktop() {
  const { windows, openWindow } = useDesktopStore();

  // Open About window on initial load
  useEffect(() => {
    openWindow({
      id: "about",
      type: "about",
      title: "About Me",
    });
  }, [openWindow]);

  // Handle icon click
  const handleIconClick = (windowId: string | null) => {
    if (windowId === "about") {
      openWindow({
        id: "about",
        type: "about",
        title: "About Me",
      });
    }
  };

  return (
    <div
      className="
        w-screen h-screen
        relative overflow-hidden
      "
      style={{
        backgroundImage: "url('/wallpapers/default.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Desktop icons grid - left-aligned column */}
      <div
        className="
          absolute top-3 left-3
          flex flex-col gap-1
          pb-[50px]
        "
      >
        {desktopIcons.map((item) => (
          <DesktopIcon
            key={item.label}
            icon={item.icon}
            label={item.label}
            onClick={() => handleIconClick(item.windowId)}
          />
        ))}
      </div>

      {/* Render open windows */}
      {windows.map((window) => {
        if (window.isMinimized) return null;

        switch (window.type) {
          case "about":
            return <AboutWindow key={window.id} />;
          default:
            return null;
        }
      })}

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
}
