"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import DesktopWindow from "./DesktopWindow";

const aboutContent = [
  "",
  "$ whoami",
  "sakila-lakmal",
  "",
  "$ role",
  "Full Stack Developer / Backend Engineer",
  "",
  "$ about",
  "I am a Computer Science undergraduate (Class of 2027)",
  "focused on backend systems, microservices,",
  "and scalable architectures.",
  "",
  "I build production-grade systems using:",
  "  • Node.js, TypeScript, Express",
  "  • RabbitMQ event-driven microservices",
  "  • SQL Server, PostgreSQL",
  "  • Docker & CI/CD pipelines",
  "",
  "$ interests",
  "  • Backend Engineering",
  "  • DevOps & Infrastructure",
  "  • System Design",
  "  • Distributed Systems",
  "",
  "$ status",
  "Learning. Building. Shipping.",
  "",
];

type PromptSegment = {
  text: string;
  color: string;
};

const renderPrompt = (): PromptSegment[] => [
  { text: "sakila@kada-os", color: "#A15EE1" },
  { text: ":", color: "#6B7280" },
  { text: "~/portfolio", color: "#6B7280" },
  { text: " (", color: "#6B7280" },
  { text: "main", color: "#8B5CF6" },
  { text: ") ", color: "#6B7280" },
  { text: "$", color: "#C084FC" },
  { text: " ", color: "transparent" },
];

export default function TerminalWindow() {
  const [lines, setLines] = useState<string[]>([
    "Terminal v1.0.0 - Modern Shell",
    "Type @me or @about for info",
    "",
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const promptSegments = renderPrompt();

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Stream content line by line
  const streamContent = async (content: string[]) => {
    setIsStreaming(true);
    const commandLine = `$ ${input}`;
    const newLines = [...lines, commandLine];
    setLines(newLines);

    for (let i = 0; i < content.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLines((prev) => [...prev, content[i]]);
    }

    setIsStreaming(false);
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isStreaming) {
      const command = input.trim();

      if (command === "@me" || command === "@about") {
        setInput("");
        await streamContent(aboutContent);
      } else if (command === "") {
        setLines([...lines, "$ "]);
      } else {
        setLines([
          ...lines,
          `$ ${command}`,
          `Command not found: ${command}`,
          "Available commands: @me, @about",
          "",
        ]);
      }

      setInput("");
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <DesktopWindow id="terminal" title="Terminal" width={700} height={520}>
      <div className="h-full overflow-hidden relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/wallpapers/default.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 z-1 bg-black/50 backdrop-blur-[2px]" />
        
        {/* Terminal Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Terminal Header Bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10"
               style={{ backgroundColor: 'rgba(15, 15, 22, 0.95)' }}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#A15EE1]/70" />
              <span className="text-sm font-mono text-[#A15EE1] font-semibold">terminal</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#A15EE1]/50 animate-pulse" />
          </div>
          
          {/* Terminal Body */}
          <div
            className="flex-1 overflow-hidden cursor-text"
            onClick={handleTerminalClick}
          >
            <div
              ref={terminalRef}
              className="h-full overflow-y-auto overflow-x-hidden px-5 py-4 terminal-scrollbar"
              style={{
                fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
                fontSize: '14px',
                lineHeight: '1.6',
              }}
            >
              {lines.map((line, index) => (
                <div 
                  key={index} 
                  className="whitespace-pre-wrap wrap-break text-gray-300"
                  style={{ textShadow: '0 0 2px rgba(0,0,0,0.5)' }}
                >
                  {line}
                </div>
              ))}
              {!isStreaming && (
                <div className="flex items-center mt-1">
                  {promptSegments.map((segment, idx) => (
                    <span
                      key={idx}
                      style={{ 
                        color: segment.color,
                        textShadow: '0 0 4px rgba(161, 94, 225, 0.3)'
                      }}
                    >
                      {segment.text}
                    </span>
                  ))}
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none border-none"
                    style={{
                      fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
                      fontSize: '14px',
                      color: '#E9D5FF',
                      caretColor: '#C084FC',
                      textShadow: '0 0 2px rgba(0,0,0,0.5)',
                    }}
                    autoComplete="off"
                    spellCheck={false}
                    disabled={isStreaming}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DesktopWindow>
  );
}
