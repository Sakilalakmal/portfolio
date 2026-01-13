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

export default function TerminalWindow() {
  const [lines, setLines] = useState<string[]>([
    "Terminal v1.0.0",
    "Type @me or @about for info",
    "",
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    <DesktopWindow id="terminal" title="Terminal" width={650} height={480}>
      <div
        className="h-full overflow-hidden p-0 cursor-text"
        onClick={handleTerminalClick}
        style={{ backgroundColor: "#001a00" }}
      >
        <div
          ref={terminalRef}
          className="
            h-full overflow-y-auto overflow-x-hidden
            p-4
            font-mono text-[14px] leading-relaxed
          "
          style={{
            color: "#00FF66",
            backgroundColor: "#001a00",
          }}
        >
          {lines.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap break-words">
              {line}
            </div>
          ))}
          {!isStreaming && (
            <div className="flex items-center">
              <span className="mr-1">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="
                  flex-1 bg-transparent outline-none border-none
                  font-mono text-[14px]
                "
                style={{
                  color: "#00FF66",
                  caretColor: "#00FF66",
                }}
                autoComplete="off"
                spellCheck={false}
                disabled={isStreaming}
              />
            </div>
          )}
        </div>
      </div>
    </DesktopWindow>
  );
}
