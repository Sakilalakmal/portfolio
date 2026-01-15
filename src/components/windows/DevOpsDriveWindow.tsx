"use client";

import DesktopWindow from "./DesktopWindow";

export default function DevOpsDriveWindow() {
  const tools = [
    "Docker",
    "Docker Compose",
    "Jenkins",
    "GitHub Actions",
    "AWS",
  ];

  const highlights = [
    "Containerized local dev",
    "CI/CD automation",
    "Deployment-ready architecture",
  ];

  return (
    <DesktopWindow
      id="devops-drive"
      title="E: DevOps"
      width={580}
      height={500}
    >
      <div className="h-full bg-white p-8 overflow-auto">
        {/* Title */}
        <h2 className="text-xl font-bold mb-8 text-black">DevOps Tools & Practices</h2>

        {/* Tools Section */}
        <div className="mb-8">
          <h3 className="text-base font-semibold mb-4 text-gray-700">Tools</h3>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="
                  px-5 py-2.5 text-sm font-medium
                  bg-[#0b3d91] text-white rounded
                  border border-[#0a2d6e]
                "
              >
                {tool}
              </div>
            ))}
          </div>
        </div>

        {/* Highlights Section */}
        <div>
          <h3 className="text-base font-semibold mb-4 text-gray-700">Highlights</h3>
          <ul className="text-sm text-black space-y-3">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-3">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DesktopWindow>
  );
}
