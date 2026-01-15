"use client";

import DesktopWindow from "./DesktopWindow";

export default function MonolithicDetailsWindow() {
  const features = [
    { icon: "🏗️", title: "Single Codebase", desc: "All functionality in one application" },
    { icon: "🔄", title: "Shared Database", desc: "Centralized data management" },
    { icon: "⚡", title: "Simple Deployment", desc: "Deploy as a single unit" },
    { icon: "🎯", title: "Easy Development", desc: "Straightforward to develop and test" },
  ];

  const techStack = [
    "ASP.NET Core",
    "SQL Server",
    "Entity Framework",
    "MVC Pattern",
  ];

  return (
    <DesktopWindow
      id="monolithic-details"
      title="Monolithic Architecture"
      width={580}
      height={480}
    >
      <div className="h-full bg-white p-6 overflow-auto">
        {/* Title */}
        <h2 className="text-lg font-bold mb-2 text-black">Monolithic Architecture</h2>
        <p className="text-sm text-gray-700 mb-6">
          Traditional single-tier application architecture
        </p>

        {/* Features Grid */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-3 text-gray-800">Key Features</h3>
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded"
              >
                <div className="text-3xl">{feature.icon}</div>
                <div>
                  <div className="text-sm font-semibold text-black">{feature.title}</div>
                  <div className="text-xs text-gray-600 mt-1">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <h3 className="text-base font-semibold mb-3 text-gray-800">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="px-4 py-2 text-sm font-medium bg-[#0b3d91] text-white rounded"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DesktopWindow>
  );
}
