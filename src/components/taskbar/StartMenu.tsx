"use client";

import { useEffect, useRef } from "react";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuItemClick: (action: string) => void;
}

export default function StartMenu({
  isOpen,
  onClose,
  onMenuItemClick,
}: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const menuItems = [
    { label: "My Computer", action: "my-computer" },
    { type: "separator" },
    { label: "About Me", action: "about" },
    { label: "Projects", action: "projects" },
    { label: "Skills", action: "skills" },
    { label: "Contact", action: "contact" },
    { type: "separator" },
    { label: "Kada Mandiya (Featured)", action: "kada-mandiya" },
    { label: "Resume.pdf", action: "resume" },
    { type: "separator" },
    { label: "Shut Down...", action: "shutdown" },
  ];

  return (
    <div
      ref={menuRef}
      className="
        absolute bottom-[52px] left-1
        w-[220px]
        bg-black
        text-white
        border-2 border-white
        shadow-lg
        z-[60]
      "
      style={{ fontFamily: "MS Sans Serif, sans-serif" }}
    >
      {menuItems.map((item, index) => {
        if (item.type === "separator") {
          return (
            <div
              key={`separator-${index}`}
              className="h-[1px] bg-gray-600 my-1"
            />
          );
        }

        return (
          <div
            key={item.action}
            onClick={() => {
              onMenuItemClick(item.action!);
              onClose();
            }}
            className="
              h-[28px]
              px-4
              flex items-center gap-3
              text-[13px]
              cursor-pointer
              hover:bg-[#0A64AD]
              hover:text-white
            "
          >
            <span className="text-white">▶</span>
            <span>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
