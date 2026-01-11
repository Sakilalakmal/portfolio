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
import { useDesktopStore } from "@/store/desktopStore";
import { getProjectById } from "@/data/projects";
import TimeLanyardWidget from "./widgets/TimeLanyardWidget";

// Desktop icons configuration
const desktopIcons = [
  { icon: "/icons/computer.svg", label: "My Computer", windowId: null },
  { icon: "/icons/folder.svg", label: "Projects", windowId: "projects" },
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

      {/* 3D Lanyard Widget */}
      <TimeLanyardWidget />
    </div>
  );
}
