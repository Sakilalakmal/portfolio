import Image from "next/image";
import DesktopWindow from "./DesktopWindow";
import { Project } from "@/data/projects";
import { useRef, useEffect, useState } from "react";

interface ProjectDetailsWindowProps {
  project: Project;
}

// Tech stack badge mapping for shields.io
const getTechBadge = (tech: string): string => {
  const badges: Record<string, string> = {
    "Node.js":
      "https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white",
    "Express.js":
      "https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white",
    TypeScript:
      "https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white",
    RabbitMQ:
      "https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white",
    "Microsoft SQL Server":
      "https://img.shields.io/badge/SQL_Server-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white",
    "JSON Web Tokens (JWT)":
      "https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white",
    "Stripe API":
      "https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white",
    "Next.js":
      "https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white",
    React:
      "https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black",
    Docker:
      "https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white",
    "Docker Compose":
      "https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white",
    "RabbitMQ Management UI":
      "https://img.shields.io/badge/RabbitMQ_UI-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white",
  };
  return (
    badges[tech] ||
    `https://img.shields.io/badge/${encodeURIComponent(
      tech
    )}-gray?style=for-the-badge`
  );
};

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
    flex items-center justify-center gap-2
    px-6 py-3
    bg-[#C0C0C0]
    border-t-2 border-l-2 border-b-2 border-r-2
    border-t-[#FFFFFF] border-l-[#FFFFFF]
    border-b-[#000000] border-r-[#000000]
    active:border-t-[#000000] active:border-l-[#000000]
    active:border-b-[#FFFFFF] active:border-r-[#FFFFFF]
    text-[13px] font-bold text-black
    hover:bg-[#dcdcdc]
    w-full
    transition-all
  `;

  return (
    <DesktopWindow
      id={`project:${project.id}`}
      title={`Project: ${project.name}`}
      width={900}
      height={600}
    >
      <div
        ref={containerRef}
        className="h-full bg-white text-black p-6 overflow-y-auto"
      >
        {/* Header Section */}
        <div className="mb-6 pb-4 border-b-2 border-gray-300">
          <h1 className="text-[24px] font-bold mb-2">{project.name}</h1>
          <p className="text-[16px] text-gray-600 italic">{project.tagline}</p>
        </div>

        {/* Top Section */}
        <div
          className={`flex gap-6 mb-8 ${isCompact ? "flex-col" : "flex-row"}`}
        >
          {/* LEFT: Thumbnail & Buttons */}
          <div
            className={`flex flex-col gap-4 ${
              isCompact ? "w-full" : "w-[40%] flex-shrink-0"
            }`}
          >
            <div className="relative aspect-video w-full bg-gray-100 border-2 border-gray-300 shadow-lg rounded overflow-hidden">
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
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Source Code
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonClass}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z" />
                </svg>
                Live Demo
              </a>
            </div>
          </div>

          {/* RIGHT: Overview */}
          <div className="flex-1">
            <h3 className="text-[18px] font-bold uppercase tracking-wider mb-3 pb-2 border-b-2 border-gray-200">
              📋 Overview
            </h3>
            <p className="text-[14px] leading-relaxed text-gray-800 whitespace-pre-line">
              {project.description}
            </p>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mb-8">
          <h3 className="text-[18px] font-bold uppercase tracking-wider mb-4 pb-2 border-b-2 border-gray-200">
            🛠️ Tech Stack
          </h3>
          <div className="space-y-4">
            {project.techStack.map((category) => (
              <div key={category.category}>
                <h4 className="text-[14px] font-semibold text-gray-700 mb-2">
                  {category.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((tech) => (
                    <Image
                      key={tech}
                      src={getTechBadge(tech)}
                      alt={tech}
                      width={150}
                      height={28}
                      className="h-[28px] w-auto"
                      unoptimized
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Highlights Section */}
        <div className="mb-8">
          <h3 className="text-[18px] font-bold uppercase tracking-wider mb-4 pb-2 border-b-2 border-gray-200">
            ⭐ What Makes This Project Special
          </h3>
          <ul className="space-y-3">
            {project.highlights.map((highlight, index) => (
              <li
                key={index}
                className="flex gap-3 text-[14px] leading-relaxed"
              >
                <span className="text-blue-600 font-bold flex-shrink-0">▸</span>
                <span className="text-gray-800">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Architecture Overview Section */}
        <div className="mb-8">
          <h3 className="text-[18px] font-bold uppercase tracking-wider mb-4 pb-2 border-b-2 border-gray-200">
            🏗️ Architecture Overview
          </h3>
          <ul className="space-y-3">
            {project.architecture.map((point, index) => (
              <li
                key={index}
                className="flex gap-3 text-[14px] leading-relaxed"
              >
                <span className="text-green-600 font-bold flex-shrink-0">
                  ▸
                </span>
                <span className="text-gray-800">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Security Highlights Section */}
        <div className="mb-6">
          <h3 className="text-[18px] font-bold uppercase tracking-wider mb-4 pb-2 border-b-2 border-gray-200">
            🔐 Security Highlights
          </h3>
          <ul className="space-y-3">
            {project.security.map((feature, index) => (
              <li
                key={index}
                className="flex gap-3 text-[14px] leading-relaxed"
              >
                <span className="text-red-600 font-bold flex-shrink-0">▸</span>
                <span className="text-gray-800">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DesktopWindow>
  );
}
