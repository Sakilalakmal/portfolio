import Image from "next/image";
import DesktopWindow from "./DesktopWindow";

export default function AboutWindow() {
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
        className="h-full flex flex-col bg-white text-black p-8 overflow-y-auto"
        style={{
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Inter, Arial, sans-serif',
        }}
      >
        {/* HERO SECTION - 3 COLUMNS */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
          {/* LEFT COLUMN: HEADLINE */}
          <div className="flex-1 flex flex-col justify-between order-2 md:order-1">
            <div>
              <p className="text-[12px] font-bold tracking-[0.2em] text-gray-500 mb-6">
                PORTFOLIO / 2026
              </p>
              <h1 className="text-[48px] md:text-[64px] leading-[0.9] font-black tracking-tighter uppercase mb-4">
                Full
                <br />
                Stack
                <br />
                Develop
                <br />
                er
              </h1>
              <div className="h-1 w-20 bg-black mb-4" />
              <p className="text-[14px] font-medium tracking-wide text-gray-700">
                BACKEND • DEVOPS • SYSTEM DESIGN
              </p>
            </div>
          </div>

          {/* CENTER COLUMN: PORTRAIT + BUTTONS */}
          <div className="flex-1 flex flex-col items-center order-1 md:order-2">
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

            {/* Buttons Row */}
            <div className="w-full max-w-[280px] grid grid-cols-1 md:grid-cols-3 gap-3">
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

          {/* RIGHT COLUMN: DETAILS */}
          <div className="flex-1 flex flex-col pt-4 order-3 md:order-3">
            <div className="space-y-4 mb-8">
              <p className="font-bold text-[15px] tracking-wide">
                / ART DIRECTION
              </p>
              <p className="font-bold text-[15px] tracking-wide">
                / WEB DESIGN (UI/UX)
              </p>
              <p className="font-bold text-[15px] tracking-wide">
                / WEB DEVELOPMENT
              </p>
            </div>

            <p className="text-[14px] leading-relaxed text-gray-600 max-w-[240px]">
              I&apos;m an experienced web and UX/UI designer, crafting memorable
              digital experiences that move brands forward.
            </p>

            {/* Decoration */}
            <div className="flex-1 w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] mt-8 opacity-50 min-h-[100px]" />
          </div>
        </div>

        {/* BIO SECTION */}
        <div className="border-t border-gray-200 pt-10 mt-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[14px] font-bold uppercase tracking-widest mb-6 text-gray-400">
              Profile
            </h2>
            <div className="grid md:grid-cols-2 gap-12 text-[15px] leading-relaxed text-gray-800">
              <p>
                I am a Computer Science undergraduate (Class of 2027) with a
                strong foundation in Full Stack Development (Next.js,
                TypeScript, Node.js) and a practical focus on DevOps automation.
              </p>
              <p>
                Unlike many standard engineering interns, I have experience
                bridging the gap between code and infrastructure. Recently, I
                architected a scalable Learning Management System (LMS) where I
                not only built the backend APIs but also configured a complete
                CI/CD pipeline using Docker and Jenkins to automate deployments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DesktopWindow>
  );
}
