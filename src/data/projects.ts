export interface Project {
  id: string;
  name: string;
  tagline: string;
  thumbnail: string;
  sourceUrl: string;
  liveUrl: string;
  techStack: string[];
  description: string;
}

export const projects: Project[] = [
  {
    id: "kada-mandiya",
    name: "Kada Mandiya",
    tagline: "E-commerce & LMS Platform",
    thumbnail: "/p-1-thumb.png",
    sourceUrl: "https://github.com/Sakilalakmal",
    liveUrl: "https://github.com/Sakilalakmal",
    techStack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "RabbitMQ",
      "SQL Server",
      "Docker",
      "Jenkins",
    ],
    description:
      "A comprehensive platform combining e-commerce capabilities with a Learning Management System. I architected the scalable backend APIs and set up the complete CI/CD pipeline for automated deployments.",
  },
  {
    id: "project-two",
    name: "Project Two",
    tagline: "Another Cool App",
    thumbnail: "/p-1-thumb.png",
    sourceUrl: "https://github.com/Sakilalakmal",
    liveUrl: "https://github.com/Sakilalakmal",
    techStack: ["React", "Tailwind", "Firebase"],
    description:
      "A placeholder project to demonstrate the layout. Features real-time data synchronization and a responsive UI.",
  },
  {
    id: "project-three",
    name: "Project Three",
    tagline: "Creative Dashboard",
    thumbnail: "/p-1-thumb.png",
    sourceUrl: "https://github.com/Sakilalakmal",
    liveUrl: "https://github.com/Sakilalakmal",
    techStack: ["Vue.js", "D3.js", "Express"],
    description:
      "An interactive dashboard for visualizing complex datasets. optimized for performance and accessibility.",
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};
