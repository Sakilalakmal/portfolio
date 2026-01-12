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
import ContactWindow from "./windows/ContactWindow";
import { useDesktopStore } from "@/store/desktopStore";
import { getProjectById } from "@/data/projects";

// Desktop icons configuration
const desktopIcons = [
  { icon: "/icons/computer.svg", label: "My Computer", windowId: null },
  { icon: "/icons/folder.svg", label: "Projects", windowId: "projects" },
  { icon: "/icons/about.svg", label: "About", windowId: "about" },
  { icon: "/icons/contact.svg", label: "Contact", windowId: "contact" },
];

export default function Desktop() {
  const { windows, openWindow } = useDesktopStore();

  // Open windows on initial load
  // Order matters: windows opened later appear on top
  useEffect(() => {
    // Open Weather first (bottom layer)
    openWindow({
      id: "weather",
      type: "weather",
      title: "Weather",
      x: window.innerWidth - 340,
      y: 14,
    });

    // Open Music Player second
    openWindow({
      id: "calm-mind-player",
      type: "calm-mind-player",
      title: "Calm Your Messy Mind",
      width: 300,
      height: 380,
      x: 200,
      y: 60,
    });

    // Open Projects third (will be on top of Weather and Music)
    openWindow({
      id: "projects",
      type: "projects",
      title: "Projects",
      width: 520,
      height: 420,
      x: 450,
      y: 80,
    });

    // Open About last (top layer)
    openWindow({
      id: "about",
      type: "about",
      title: "About Me",
      x: 100,
      y: 50,
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
    } else if (windowId === "contact") {
      openWindow({
        id: "contact",
        type: "contact",
        title: "Contact",
        width: 440,
        height: 520,
      });
    }
  };

  return (
    <div
      className="
        w-screen h-screen
        relative z-10 overflow-hidden
      "
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
          case "contact":
            return <ContactWindow key={window.id} />;
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
