import Image from "next/image";
import DesktopWindow from "./DesktopWindow";
import { projects } from "@/data/projects";
import { useDesktopStore } from "@/store/desktopStore";

export default function ProjectsWindow() {
  const { openWindow } = useDesktopStore();

  const handleOpenProject = (projectId: string, title: string) => {
    openWindow({
      id: `project:${projectId}`,
      type: "project-details",
      title: `Project: ${title}`,
      width: 900,
      height: 600,
    });
  };

  return (
    <DesktopWindow id="projects" title="Projects" width={600} height={480}>
      <div className="h-full bg-white p-8 overflow-y-auto">
        {/* Content */}
        <div className="flex flex-wrap gap-8 justify-center items-start">
          {projects.map((project) => (
            <div
              key={project.id}
              className="
                group
                flex flex-col items-center
                p-4
                cursor-pointer
                transition-all
                hover:scale-105
                hover:bg-blue-50
                rounded-lg
              "
              onDoubleClick={() => handleOpenProject(project.id, project.name)}
            >
              {/* Large Folder Icon */}
              <div className="relative w-24 h-24 mb-3 drop-shadow-lg">
                <Image
                  src="/icons/folder.svg"
                  alt={project.name}
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>

              {/* Project Name */}
              <div className="text-center max-w-[200px]">
                <div className="text-[14px] font-bold text-black">
                  {project.name}
                </div>
                <div className="text-[11px] text-gray-600 mt-1">
                  {project.tagline}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DesktopWindow>
  );
}
