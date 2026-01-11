"use client";

/**
 * Desktop - Main Windows 98-style desktop container
 * Full viewport with wallpaper, icons, windows, and taskbar
 */

import { useEffect } from "react";
import DesktopIcon from "./DesktopIcon";
import Taskbar from "./Taskbar";
import AboutWindow from "./windows/AboutWindow";
import ProjectsWindow from "./windows/ProjectsWindow";
import ProjectDetailsWindow from "./windows/ProjectDetailsWindow";
import WeatherWindow from "./windows/WeatherWindow";
import CalmMindPlayerWindow from "./windows/CalmMindPlayerWindow";
import { useDesktopStore } from "@/store/desktopStore";
import { getProjectById } from "@/data/projects";

// Desktop icons configuration
const desktopIcons = [
  { icon: "/icons/computer.svg", label: "My Computer", windowId: null },
  { icon: "/icons/folder.svg", label: "Projects", windowId: "projects" },
  { icon: "/icons/about.svg", label: "About", windowId: "about" },
  { icon: "/icons/contact.svg", label: "Contact", windowId: null },
];

export default function Desktop() {
  const { windows, openWindow } = useDesktopStore();

  // Open About, Weather, and Music Player windows on initial load
  useEffect(() => {
    openWindow({
      id: "about",
      type: "about",
      title: "About Me",
    });
    openWindow({
      id: "weather",
      type: "weather",
      title: "Weather",
      x: window.innerWidth - 340,
      y: 14,
    });
    openWindow({
      id: "calm-mind-player",
      type: "calm-mind-player",
      title: "Calm Your Messy Mind",
      width: 300,
      height: 380,
      x: 200,
      y: 60,
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
    } else if (windowId === "projects") {
      openWindow({
        id: "projects",
        type: "projects",
        title: "Projects",
        width: 520,
        height: 420,
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
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
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
          case "projects":
            return <ProjectsWindow key={window.id} />;
          case "weather":
            return <WeatherWindow key={window.id} />;
          case "calm-mind-player":
            return <CalmMindPlayerWindow key={window.id} />;
          case "project-details":
            // Extract project ID from window ID (format: "project:ID")
            const projectId = window.id.split(":")[1];
            const project = getProjectById(projectId);
            if (!project) return null;
            return <ProjectDetailsWindow key={window.id} project={project} />;
          default:
            return null;
        }
      })}

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
}
