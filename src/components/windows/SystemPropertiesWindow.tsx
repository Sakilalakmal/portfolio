"use client";

import { useEffect } from "react";
import DesktopWindow from "./DesktopWindow";
import { useDesktopStore } from "@/store/desktopStore";

export default function SystemPropertiesWindow() {
  const { closeWindow } = useDesktopStore();

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeWindow("system-properties");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeWindow]);

  const properties = [
    { label: "OS Name:", value: "Sakila's OS 98" },
    { label: "User:", value: "Sakila Lakmal" },
    { label: "Role:", value: "Full Stack Developer / Backend Engineer" },
    { label: "Architecture:", value: "Event-driven Microservices" },
    { label: "Message Broker:", value: "RabbitMQ" },
    { label: "Databases:", value: "SQL Server, PostgreSQL" },
    { label: "DevOps:", value: "Docker, CI/CD" },
    { label: "Status:", value: "Learning • Building • Shipping" },
  ];

  return (
    <DesktopWindow
      id="system-properties"
      title="System Properties"
      width={400}
      height={480}
    >
      <div className="h-full flex flex-col bg-white">
        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="space-y-5">
            {properties.map((prop, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-36 text-sm font-semibold text-gray-700 text-right">
                  {prop.label}
                </div>
                <div className="flex-1 text-sm text-black">{prop.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* OK Button */}
        <div className="p-4 flex justify-center border-t-2" style={{ borderTopColor: "#808080" }}>
          <button
            onClick={() => closeWindow("system-properties")}
            className="
              px-8 py-2 text-sm font-medium
              bg-[#C0C0C0]
              border-t-2 border-l-2 border-b border-r
              border-t-white border-l-white
              border-b-[#000000] border-r-[#000000]
              active:border-t-[#000000] active:border-l-[#000000]
              active:border-b-white active:border-r-white
              active:border-t active:border-l active:border-b-2 active:border-r-2
            "
          >
            OK
          </button>
        </div>
      </div>
    </DesktopWindow>
  );
}
