"use client";

/**
 * Desktop - Main Windows 98-style desktop container
 * Full viewport with wallpaper, icons, windows, and taskbar
 */

import { useEffect } from "react";
import DesktopIcon from "./DesktopIcon";
import Taskbar from "./taskbar/Taskbar";
import AboutWindow from "./windows/AboutWindow";
import ProjectsWindow from "./windows/ProjectsWindow";
import ProjectDetailsWindow from "./windows/ProjectDetailsWindow";
import WeatherWindow from "./windows/WeatherWindow";
import CalmMindPlayerWindow from "./windows/CalmMindPlayerWindow";
import ContactWindow from "./windows/ContactWindow";
import SkillsWindow from "./windows/SkillsWindow";
import ResumeWindow from "./windows/ResumeWindow";
import TerminalWindow from "./windows/TerminalWindow";
import MyComputerWindow from "./windows/MyComputerWindow";
import SystemPropertiesWindow from "./windows/SystemPropertiesWindow";
import MicroservicesDriveWindow from "./windows/MicroservicesDriveWindow";
import MicroservicesDetailsWindow from "./windows/MicroservicesDetailsWindow";
import MonolithicDetailsWindow from "./windows/MonolithicDetailsWindow";
import DevOpsDriveWindow from "./windows/DevOpsDriveWindow";
import ServiceDetailsWindow from "./windows/ServiceDetailsWindow";
import { useDesktopStore } from "@/store/desktopStore";
import { getProjectById } from "@/data/projects";

// Desktop icons configuration
const desktopIcons = [
  { icon: "/icons/computer.svg", label: "My Computer", windowId: "my-computer" },
  { icon: "/icons/folder.svg", label: "Projects", windowId: "projects" },
  { icon: "/icons/about.svg", label: "About", windowId: "about" },
  { icon: "/icons/contact.svg", label: "Contact", windowId: "contact" },
  { icon: "/terminal.png", label: "Terminal", windowId: "terminal" },
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
    if (windowId === "my-computer") {
      openWindow({
        id: "my-computer",
        type: "my-computer",
        title: "My Computer",
        width: 720,
        height: 520,
      });
    } else if (windowId === "about") {
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
    } else if (windowId === "terminal") {
      openWindow({
        id: "terminal",
        type: "terminal",
        title: "Terminal",
        width: 650,
        height: 480,
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
          pb-12.5
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
          case "my-computer":
            return <MyComputerWindow key={window.id} />;
          case "system-properties":
            return <SystemPropertiesWindow key={window.id} />;
          case "architectures-drive":
            return <MicroservicesDriveWindow key={window.id} />;
          case "microservices-details":
            return <MicroservicesDetailsWindow key={window.id} />;
          case "monolithic-details":
            return <MonolithicDetailsWindow key={window.id} />;
          case "devops-drive":
            return <DevOpsDriveWindow key={window.id} />;
          case "service-details":
            // Extract service name from window ID (format: "service-details:serviceName")
            const serviceName = window.id.split(":")[1];
            return <ServiceDetailsWindow key={window.id} serviceName={serviceName} />;
          case "about":
            return <AboutWindow key={window.id} />;
          case "projects":
            return <ProjectsWindow key={window.id} />;
          case "contact":
            return <ContactWindow key={window.id} />;
          case "skills":
            return <SkillsWindow key={window.id} />;
          case "resume":
            return <ResumeWindow key={window.id} />;
          case "terminal":
            return <TerminalWindow key={window.id} />;
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
