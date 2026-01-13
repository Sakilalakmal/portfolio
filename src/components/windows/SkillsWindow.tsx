/* eslint-disable @next/next/no-img-element */
"use client";

import DesktopWindow from "./DesktopWindow";

export default function SkillsWindow() {
  return (
    <DesktopWindow id="skills" title="Skills" width={640} height={520}>
      <div className="h-full overflow-y-auto bg-[#d4d4d4] p-4 space-y-6">
        {/* Section 1: Currently Learning */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[16px]">🚀</span>
            <h2 className="text-[14px] font-bold uppercase tracking-wide">
              Currently Learning
            </h2>
          </div>
          <div className="h-[1px] bg-[#808080] mb-4" />
          <div className="flex flex-wrap gap-2">
            <img
              src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"
              alt="Python"
            />
            <img
              src="https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=postgresql&logoColor=white"
              alt="SQL"
            />
            <img
              src="https://img.shields.io/badge/Microservices-FF6C37?style=for-the-badge&logo=kubernetes&logoColor=white"
              alt="Microservices"
            />
          </div>
        </section>

        {/* Section 2: Languages & Tools */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[16px]">🛠️</span>
            <h2 className="text-[14px] font-bold uppercase tracking-wide">
              Languages & Tools
            </h2>
          </div>
          <div className="h-[1px] bg-[#808080] mb-4" />
          <div className="flex flex-wrap gap-2">
            <img
              src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"
              alt="TypeScript"
            />
            <img
              src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"
              alt="JavaScript"
            />
            <img
              src="https://img.shields.io/badge/Kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white"
              alt="Kotlin"
            />
            <img
              src="https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white"
              alt="Dart"
            />
            <img
              src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"
              alt="Python"
            />
            <img
              src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"
              alt="React"
            />
            <img
              src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"
              alt="Next.js"
            />
            <img
              src="https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white"
              alt="Flutter"
            />
            <img
              src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"
              alt="Tailwind CSS"
            />
            <img
              src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"
              alt="Node.js"
            />
            <img
              src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"
              alt="Express"
            />
            <img
              src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white"
              alt="PostgreSQL"
            />
            <img
              src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"
              alt="MongoDB"
            />
            <img
              src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white"
              alt="Prisma"
            />
            <img
              src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white"
              alt="Supabase"
            />
            <img
              src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"
              alt="Docker"
            />
            <img
              src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white"
              alt="AWS"
            />
            <img
              src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white"
              alt="Jenkins"
            />
            <img
              src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white"
              alt="GitHub Actions"
            />
            <img
              src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black"
              alt="Linux"
            />
            <img
              src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"
              alt="Figma"
            />
            <img
              src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"
              alt="Postman"
            />
            <img
              src="https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white"
              alt="VS Code"
            />
            <img
              src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white"
              alt="pnpm"
            />
          </div>
        </section>
      </div>
    </DesktopWindow>
  );
}
