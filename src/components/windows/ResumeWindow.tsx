"use client";

import DesktopWindow from "./DesktopWindow";

export default function ResumeWindow() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume/Sakila-Lakmal-Resume.pdf";
    link.download = "Sakila_Lakmal_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open("/resume/Sakila-Lakmal-Resume.pdf", "_blank");
  };

  return (
    <DesktopWindow id="resume" title="Resume" width={800} height={640}>
      <div className="h-full flex flex-col bg-[#d4d4d4]">
        {/* Action buttons - compact */}
        <div className="flex gap-1 p-1 border-b border-[#808080]">
          <button
            onClick={handleDownload}
            className="
              px-2 py-1
              bg-[#C0C0C0]
              text-[11px] font-bold
              border-t border-l border-[#FFFFFF]
              border-b border-r border-[#808080]
              active:border-t active:border-l active:border-[#808080]
              active:border-b active:border-r active:border-[#FFFFFF]
              cursor-pointer
            "
          >
            Download
          </button>
          <button
            onClick={handleOpenInNewTab}
            className="
              px-2 py-1
              bg-[#C0C0C0]
              text-[11px] font-bold
              border-t border-l border-[#FFFFFF]
              border-b border-r border-[#808080]
              active:border-t active:border-l active:border-[#808080]
              active:border-b active:border-r active:border-[#FFFFFF]
              cursor-pointer
            "
          >
            Open in Tab
          </button>
        </div>

        {/* PDF viewer with zoom */}
        <div className="flex-1 overflow-hidden">
          <iframe
            src="/resume/Sakila-Lakmal-Resume.pdf#view=FitH&zoom=67"
            className="w-full h-full border-0"
            title="Resume PDF"
          >
            <p className="p-4 text-center text-[13px]">
              Your browser does not support embedded PDFs.
              <br />
              <a
                href="/resume/Sakila-Lakmal-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline"
              >
                Click here to view the PDF
              </a>
            </p>
          </iframe>
        </div>
      </div>
    </DesktopWindow>
  );
}
