"use client";

import { useState } from "react";
import StartButton from "./StartButton";
import StartMenu from "./StartMenu";
import { useDesktopStore } from "@/store/desktopStore";

export default function Taskbar() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const { openWindow } = useDesktopStore();

  const handleStartClick = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const handleMenuItemClick = (action: string) => {
    // Placeholder functions for menu items
    switch (action) {
      case "my-computer":
        openMyComputerWindow();
        break;
      case "about":
        openAboutWindow();
        break;
      case "projects":
        openProjectsWindow();
        break;
      case "skills":
        openSkillsWindow();
        break;
      case "contact":
        openContactWindow();
        break;
      case "kada-mandiya":
        openKadaMandiyaWindow();
        break;
      case "resume":
        openResumeWindow();
        break;
      case "shutdown":
        openShutdownDialog();
        break;
      default:
        console.log(`Action not implemented: ${action}`);
    }
  };

  // Placeholder window functions
  const openMyComputerWindow = () => {
    openWindow({
      id: "my-computer",
      type: "my-computer",
      title: "My Computer",
      width: 720,
      height: 520,
    });
  };

  const openAboutWindow = () => {
    openWindow({
      id: "about",
      type: "about",
      title: "About Me",
    });
  };

  const openProjectsWindow = () => {
    openWindow({
      id: "projects",
      type: "projects",
      title: "Projects",
      width: 520,
      height: 420,
    });
  };

  const openSkillsWindow = () => {
    openWindow({
      id: "skills",
      type: "skills",
      title: "Skills",
      width: 640,
      height: 520,
    });
  };

  const openContactWindow = () => {
    openWindow({
      id: "contact",
      type: "contact",
      title: "Contact",
      width: 440,
      height: 520,
    });
  };

  const openKadaMandiyaWindow = () => {
    openWindow({
      id: "project:kada-mandiya",
      type: "project-details",
      title: "Kada Mandiya",
      width: 700,
      height: 560,
    });
  };

  const openResumeWindow = () => {
    openWindow({
      id: "resume",
      type: "resume",
      title: "Resume",
      width: 800,
      height: 640,
    });
  };

  const openShutdownDialog = () => {
    console.log("Shutdown dialog - not implemented yet");
  };

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0
        h-[52px]
        bg-[#1b1b1b]/30
        backdrop-blur-md
        flex items-center
        border-t-2 border-t-white/20
        shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]
        z-50
      "
    >
      {/* Start Menu */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onMenuItemClick={handleMenuItemClick}
      />

      {/* Start Button */}
      <StartButton isPressed={isStartMenuOpen} onClick={handleStartClick} />

      {/* Spacer for future taskbar buttons */}
      <div className="flex-1" />

      {/* System tray area */}
      <div className="mr-1 flex items-center">
        <div
          className="
            px-2 h-[36px]
            flex items-center
            bg-black/20
            border-t-white/10 border-l-white/10
            border-b-white/30 border-r-white/30
            border-t border-l border-b border-r
          "
        >
          <img
            src="/music-photo.png"
            alt="Music"
            className="h-[35px] w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
