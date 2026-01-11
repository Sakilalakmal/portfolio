import Image from "next/image";
import DesktopWindow from "./DesktopWindow";
import { Project } from "@/data/projects";
import { useRef, useEffect, useState } from "react";

interface ProjectDetailsWindowProps {
  project: Project;
}

export default function ProjectDetailsWindow({
  project,
}: ProjectDetailsWindowProps) {
  const [isCompact, setIsCompact] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ResizeObserver for container-aware responsiveness
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width < 600) {
          setIsCompact(true);
        } else {
          setIsCompact(false);
        }
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const buttonClass = `
    flex items-center justify-center
    px-4 py-2
    bg-[#C0C0C0]
    border-t-2 border-l-2 border-b-2 border-r-2
    border-t-[#FFFFFF] border-l-[#FFFFFF]
    border-b-[#000000] border-r-[#000000]
    active:border-t-[#000000] active:border-l-[#000000]
    active:border-b-[#FFFFFF] active:border-r-[#FFFFFF]
    text-[13px] font-bold text-black
    hover:bg-[#dcdcdc]
    w-full
  `;

  return (
    <DesktopWindow
      id={`project:${project.id}`}
      title={`Project: ${project.name}`}
      width={820}
      height={520}
    >
      <div
        ref={containerRef}
        className="h-full bg-white text-black p-6 overflow-y-auto"
        style={{
          fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top Section */}
        <div
          className={`flex gap-8 mb-8 ${isCompact ? "flex-col" : "flex-row"}`}
        >
          {/* LEFT: Thumbnail & Buttons */}
          <div
            className={`flex flex-col gap-4 ${
              isCompact ? "w-full" : "w-[45%] flex-shrink-0"
            }`}
          >
            <div className="relative aspect-video w-full bg-gray-100 border border-gray-300 shadow-inner">
              <Image
                src={project.thumbnail}
                alt={project.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonClass}
              >
                Source Code
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonClass}
              >
                Live Demo
              </a>
            </div>
          </div>

          {/* RIGHT: Tech Stack */}
          <div className="flex-1">
            <h3 className="text-[18px] font-bold uppercase tracking-wider mb-4 border-b pb-2">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="
                    px-3 py-1
                    bg-gray-100
                    border border-gray-200
                    text-[12px] font-medium text-gray-700
                    rounded-full
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Overview */}
        <div>
          <h3 className="text-[18px] font-bold uppercase tracking-wider mb-4 border-b pb-2">
            Overview
          </h3>
          <p className="text-[15px] leading-relaxed text-gray-800">
            {project.description}
          </p>
        </div>
      </div>
    </DesktopWindow>
  );
}
