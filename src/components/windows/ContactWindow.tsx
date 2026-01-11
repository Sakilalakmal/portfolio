"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  Linkedin,
  Github,
  MessageCircle,
  Check,
} from "lucide-react";
import DesktopWindow from "./DesktopWindow";

// Contact information configuration
const CONTACT = {
  phone: "+94 712207719",
  email: "sakilalakmal77@gmail.com",
  linkedin: "https://www.linkedin.com/in/sakila-lakmal-a970502b7/",
  github: "https://github.com/Sakilalakmal",
  whatsapp: "+94712207719",
};

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  onClick?: () => void;
  gradient: string;
}

function ContactItem({
  icon,
  label,
  value,
  href,
  onClick,
  gradient,
}: ContactItemProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient background on hover */}
      <div
        className={`
          absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          ${gradient}
        `}
      />

      {/* Content */}
      <div
        className="
          relative
          flex items-center gap-4 p-4
          bg-white/80 backdrop-blur-sm
          border border-gray-200/50
          rounded-xl
          cursor-pointer
          transition-all duration-300
          hover:border-transparent
          hover:shadow-lg hover:shadow-black/5
          hover:-translate-y-0.5
        "
        onClick={handleClick}
      >
        {/* Icon with gradient background */}
        <div
          className={`
            flex-shrink-0 w-12 h-12
            flex items-center justify-center
            rounded-lg
            ${gradient}
            text-white
            transition-transform duration-300
            ${isHovered ? "scale-110 rotate-3" : "scale-100"}
          `}
        >
          {icon}
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-0.5">
            {label}
          </div>
          <div className="text-[14px] font-medium text-gray-900 truncate">
            {value}
          </div>
        </div>

        {/* Copy button for phone */}
        {onClick && (
          <button
            onClick={handleCopy}
            className={`
              flex-shrink-0
              px-3 py-1.5
              text-[11px] font-medium
              rounded-lg
              transition-all duration-200
              ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {copied ? (
              <span className="flex items-center gap-1">
                <Check size={12} />
                Copied
              </span>
            ) : (
              "Copy"
            )}
          </button>
        )}

        {/* Arrow indicator for links */}
        {href && (
          <div className="flex-shrink-0 text-gray-400 group-hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ContactWindow() {
  const handlePhoneClick = async () => {
    // Copy to clipboard
    await navigator.clipboard.writeText(CONTACT.phone);
    // Optionally open tel: link
    window.location.href = `tel:${CONTACT.phone}`;
  };

  const getWhatsAppLink = (number: string) => {
    // Remove all non-digit characters
    const cleanNumber = number.replace(/\D/g, "");
    return `https://wa.me/${cleanNumber}`;
  };

  return (
    <DesktopWindow id="contact" title="Contact" width={440} height={520}>
      <div
        className="h-full overflow-y-auto"
        style={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Inter, Arial, sans-serif',
        }}
      >
        {/* Header section */}
        <div className="p-6 pb-4">
          <h2 className="text-[24px] font-bold text-gray-900 mb-1">
            Let&apos;s Connect
          </h2>
          <p className="text-[13px] text-gray-600">
            Choose your preferred way to reach out
          </p>
        </div>

        {/* Contact items */}
        <div className="px-6 pb-6 space-y-3">
          {/* Mobile */}
          <ContactItem
            icon={<Phone size={20} strokeWidth={2.5} />}
            label="Mobile"
            value={CONTACT.phone}
            onClick={handlePhoneClick}
            gradient="bg-gradient-to-br from-blue-500 to-blue-600"
          />

          {/* Email */}
          <ContactItem
            icon={<Mail size={20} strokeWidth={2.5} />}
            label="Email"
            value={CONTACT.email}
            href={`mailto:${CONTACT.email}`}
            gradient="bg-gradient-to-br from-purple-500 to-purple-600"
          />

          {/* LinkedIn */}
          <ContactItem
            icon={<Linkedin size={20} strokeWidth={2.5} />}
            label="LinkedIn"
            value="sakila-lakmal-a970502b7"
            href={CONTACT.linkedin}
            gradient="bg-gradient-to-br from-cyan-500 to-cyan-600"
          />

          {/* GitHub */}
          <ContactItem
            icon={<Github size={20} strokeWidth={2.5} />}
            label="GitHub"
            value="Sakilalakmal"
            href={CONTACT.github}
            gradient="bg-gradient-to-br from-gray-700 to-gray-800"
          />

          {/* WhatsApp */}
          <ContactItem
            icon={<MessageCircle size={20} strokeWidth={2.5} />}
            label="WhatsApp"
            value={CONTACT.whatsapp}
            href={getWhatsAppLink(CONTACT.whatsapp)}
            gradient="bg-gradient-to-br from-green-500 to-green-600"
          />
        </div>

        {/* Footer note */}
        <div className="px-6 pb-6">
          <div
            className="
            p-4 rounded-xl
            bg-white/60 backdrop-blur-sm
            border border-gray-200/50
          "
          >
            <p className="text-[12px] text-gray-600 text-center leading-relaxed">
              Available for freelance projects and full-time opportunities
            </p>
          </div>
        </div>
      </div>
    </DesktopWindow>
  );
}
