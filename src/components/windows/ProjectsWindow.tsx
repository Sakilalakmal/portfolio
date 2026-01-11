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
      width: 820,
      height: 520,
    });
  };

  return (
    <DesktopWindow id="projects" title="Projects" width={520} height={420}>
      <div className="h-full bg-white p-4 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="
                group
                flex flex-col items-center
                p-2
                border border-transparent
                hover:bg-blue-50 hover:border-blue-200
                cursor-pointer
                transition-colors
                rounded-sm
              "
              onDoubleClick={() => handleOpenProject(project.id, project.name)}
            >
              {/* Icon/Thumbnail */}
              <div className="relative w-12 h-12 mb-2">
                <Image
                  src="/icons/folder.svg" // Using generic folder icon for list view as per "small icon" request, or could use thumb
                  alt={project.name}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>

              {/* Text */}
              <div className="text-center">
                <div className="text-[13px] font-medium text-black group-hover:text-blue-700">
                  {project.name}
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5 px-1 truncate max-w-[120px]">
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
