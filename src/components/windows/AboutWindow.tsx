import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import DesktopWindow from "./DesktopWindow";

export default function AboutWindow() {
  const [isCompact, setIsCompact] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width < 760) {
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
    px-4 py-2
    bg-transparent
    border border-black/20
    text-[13px] font-medium text-black
    hover:bg-black hover:text-white
    transition-all duration-200
    uppercase tracking-wider
  `;

  return (
    <DesktopWindow id="about" title="About Me" width={900} height={600}>
      <div
        ref={containerRef}
        className="h-full flex flex-col bg-white text-black p-6 md:p-8 overflow-y-auto overflow-x-hidden"
        style={{
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Inter, Arial, sans-serif',
        }}
      >
        {/* HERO SECTION - LEFT: TITLE, RIGHT: PHOTO + BUTTONS */}
        <div
          className={`
                flex gap-8 mb-12
                ${isCompact ? "flex-col" : "flex-row gap-12 items-start"}
            `}
        >
          {/* LEFT COLUMN: TITLE + BIO CONTENT */}
          <div
            className={`flex flex-col justify-start ${
              isCompact ? "order-1" : "flex-1 order-1"
            }`}
          >
            <div>
              <p className="text-[12px] font-bold tracking-[0.2em] text-gray-500 mb-6">
                PORTFOLIO / 2026
              </p>
              <h1 className="text-[48px] md:text-[56px] leading-[1.1] font-black tracking-tighter uppercase mb-8">
                Full Stack
                <br />
                Developer
              </h1>

              {/* Bio Content Under Title */}
              <div className="space-y-5 text-[15px] leading-relaxed text-gray-700 max-w-[500px]">
                <p>
                  I&apos;m a Computer Science undergraduate and Full-Stack
                  Developer focused on building production-ready backend systems
                  and modern web applications.
                </p>
                <p>
                  I enjoy working with microservices, SaaS architectures, and
                  scalable systems, and I care a lot about clean code, security,
                  and real-world engineering practices.
                </p>
                <p>
                  Currently, I&apos;m sharpening my skills in Python, SQL, and
                  DevOps through hands-on projects.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PORTRAIT + BUTTONS BELOW */}
          <div
            className={`flex flex-col items-center ${
              isCompact ? "order-2 w-full" : "order-2"
            }`}
          >
            {/* Portrait Card */}
            <div className="bg-white p-3 shadow-sm border border-gray-100 mb-6 w-full max-w-[280px]">
              <div className="aspect-[3/4] relative bg-gray-100 w-full overflow-hidden filter grayscale contrast-110 hover:grayscale-0 transition-all duration-500">
                <Image
                  src="/sakila-lakmal.png"
                  alt="Portrait"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Buttons Below Photo */}
            <div
              className={`w-full max-w-[280px] grid gap-3 ${
                isCompact ? "grid-cols-3" : "grid-cols-3"
              }`}
            >
              <a
                href="mailto:sakilalakmal77@gmail.com"
                target="_blank"
                rel="noreferrer"
                className={buttonClass}
              >
                Email
              </a>
              <a
                href="https://github.com/Sakilalakmal"
                target="_blank"
                rel="noreferrer"
                className={buttonClass}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/sakila-lakmal-a970502b7/"
                target="_blank"
                rel="noreferrer"
                className={buttonClass}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </DesktopWindow>
  );
}
