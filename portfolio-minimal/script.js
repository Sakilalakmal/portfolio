const navLinks = Array.from(document.querySelectorAll(".nav__link"));
const allHashLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
const yearEl = document.getElementById("year");

if (yearEl) yearEl.textContent = String(new Date().getFullYear());

function getTargetFromHashLink(link) {
  const href = link.getAttribute("href");
  if (!href || !href.startsWith("#")) return null;
  const id = href.slice(1);
  if (!id) return null;
  return document.getElementById(id);
}

allHashLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    
    // Special case: if clicking home link, scroll to top of page
    if (href === "#home") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.pushState(null, "", "#home");
      return;
    }
    
    const target = getTargetFromHashLink(link);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", `#${target.id}`);
  });
});

// Subtle active link highlight while scrolling
const sections = ["home", "projects", "about", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const linkById = new Map(
    navLinks
      .map((a) => [a.getAttribute("href")?.replace("#", ""), a])
      .filter(([id]) => Boolean(id))
  );

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];

      if (!visible) return;

      navLinks.forEach((l) => l.classList.remove("is-active"));
      const active = linkById.get(visible.target.id);
      if (active) active.classList.add("is-active");
    },
    {
      root: null,
      threshold: [0.25, 0.4, 0.6],
      rootMargin: "-20% 0px -70% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
}

// ===== PROJECT MODAL SYSTEM =====
const projectData = {
  "kada-mandiya": {
    title: "Kada Mandiya",
    summary: "Production-grade, event-driven e-commerce platform built with a microservices architecture.",
    techBadges: [
      { name: "Node.js", color: "339933", logo: "nodedotjs" },
      { name: "Express", color: "000000", logo: "express" },
      { name: "TypeScript", color: "3178C6", logo: "typescript" },
      { name: "RabbitMQ", color: "FF6600", logo: "rabbitmq" },
      { name: "SQL Server", color: "CC2927", logo: "microsoftsqlserver" },
      { name: "Stripe", color: "008CDD", logo: "stripe" },
      { name: "Next.js", color: "000000", logo: "nextdotjs" },
      { name: "Docker", color: "2496ED", logo: "docker" }
    ],
    highlights: [
      "Microservices with database-per-service pattern",
      "Event-driven communication using RabbitMQ",
      "API Gateway for routing, auth, and JWT verification",
      "Idempotent consumers for reliability",
      "Asynchronous workflows (order → payment → inventory)"
    ],
    diagram: `<svg viewBox="0 0 800 650" fill="none" stroke="currentColor" stroke-width="1">
      <style>text{fill:rgba(255,255,255,0.9);font-size:16px;font-family:sans-serif;font-weight:500}</style>
      
      <!-- Client -->
      <rect x="300" y="20" width="200" height="60" stroke="rgba(255,255,255,0.5)"/>
      <text x="400" y="55" text-anchor="middle">Client (Web + Mobile)</text>
      <line x1="400" y1="80" x2="400" y2="110" stroke="rgba(255,255,255,0.4)"/>
      <polygon points="400,115 395,105 405,105" fill="rgba(255,255,255,0.4)"/>
      
      <!-- API Gateway -->
      <rect x="280" y="120" width="240" height="70" stroke="rgba(255,255,255,0.5)"/>
      <text x="400" y="155" text-anchor="middle">API Gateway</text>
      <text x="400" y="175" text-anchor="middle" font-size="12" fill="rgba(255,255,255,0.6)">(JWT Auth + Routing)</text>
      
      <!-- Microservices Row -->
      <rect x="50" y="250" width="120" height="60" stroke="rgba(255,255,255,0.5)"/>
      <text x="110" y="285" text-anchor="middle">Auth</text>
      
      <rect x="200" y="250" width="120" height="60" stroke="rgba(255,255,255,0.5)"/>
      <text x="260" y="285" text-anchor="middle">Product</text>
      
      <rect x="350" y="250" width="120" height="60" stroke="rgba(255,255,255,0.5)"/>
      <text x="410" y="285" text-anchor="middle">Order</text>
      
      <rect x="500" y="250" width="120" height="60" stroke="rgba(255,255,255,0.5)"/>
      <text x="560" y="285" text-anchor="middle">Payment</text>
      
      <rect x="640" y="250" width="110" height="60" stroke="rgba(255,255,255,0.5)"/>
      <text x="695" y="275" text-anchor="middle" font-size="14">Cart/Review/</text>
      <text x="695" y="295" text-anchor="middle" font-size="14">Notification</text>
      
      <!-- Gateway to Services -->
      <line x1="350" y1="190" x2="110" y2="250" stroke="rgba(255,255,255,0.3)"/>
      <line x1="370" y1="190" x2="260" y2="250" stroke="rgba(255,255,255,0.3)"/>
      <line x1="400" y1="190" x2="410" y2="250" stroke="rgba(255,255,255,0.3)"/>
      <line x1="430" y1="190" x2="560" y2="250" stroke="rgba(255,255,255,0.3)"/>
      <line x1="450" y1="190" x2="695" y2="250" stroke="rgba(255,255,255,0.3)"/>
      
      <!-- Databases -->
      <rect x="60" y="350" width="100" height="40" stroke="rgba(255,255,255,0.35)"/>
      <text x="110" y="375" text-anchor="middle" font-size="13">auth_db</text>
      <line x1="110" y1="310" x2="110" y2="350" stroke="rgba(255,255,255,0.25)"/>
      
      <rect x="210" y="350" width="100" height="40" stroke="rgba(255,255,255,0.35)"/>
      <text x="260" y="375" text-anchor="middle" font-size="13">prod_db</text>
      <line x1="260" y1="310" x2="260" y2="350" stroke="rgba(255,255,255,0.25)"/>
      
      <rect x="360" y="350" width="100" height="40" stroke="rgba(255,255,255,0.35)"/>
      <text x="410" y="375" text-anchor="middle" font-size="13">order_db</text>
      <line x1="410" y1="310" x2="410" y2="350" stroke="rgba(255,255,255,0.25)"/>
      
      <rect x="510" y="350" width="100" height="40" stroke="rgba(255,255,255,0.35)"/>
      <text x="560" y="375" text-anchor="middle" font-size="13">pay_db</text>
      <line x1="560" y1="310" x2="560" y2="350" stroke="rgba(255,255,255,0.25)"/>
      
      <rect x="645" y="350" width="100" height="40" stroke="rgba(255,255,255,0.35)"/>
      <text x="695" y="375" text-anchor="middle" font-size="13">other_dbs</text>
      <line x1="695" y1="310" x2="695" y2="350" stroke="rgba(255,255,255,0.25)"/>
      
      <!-- RabbitMQ -->
      <rect x="250" y="480" width="300" height="80" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>
      <text x="400" y="510" text-anchor="middle" font-size="18">RabbitMQ Exchange</text>
      <text x="400" y="535" text-anchor="middle" font-size="13" fill="rgba(255,255,255,0.6)">(Event-Driven Communication)</text>
      <text x="400" y="552" text-anchor="middle" font-size="11" fill="rgba(255,255,255,0.5)">Idempotent Consumers</text>
      
      <!-- Event Publishers (green) -->
      <line x1="410" y1="310" x2="350" y2="480" stroke="#00FF00" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="365" y="400" font-size="11" fill="#00FF00">Publish</text>
      
      <line x1="560" y1="310" x2="450" y2="480" stroke="#00FF00" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="490" y="400" font-size="11" fill="#00FF00">Publish</text>
      
      <!-- Event Consumers (red) -->
      <line x1="350" y1="480" x2="260" y2="310" stroke="#FF6B6B" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="280" y="400" font-size="11" fill="#FF6B6B">Subscribe</text>
      
      <line x1="450" y1="480" x2="695" y2="310" stroke="#FF6B6B" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="540" y="400" font-size="11" fill="#FF6B6B">Subscribe</text>
      
      <!-- Legend -->
      <text x="50" y="610" font-size="13" fill="rgba(255,255,255,0.7)">Legend:</text>
      <line x1="50" y1="625" x2="100" y2="625" stroke="#00FF00" stroke-width="2" stroke-dasharray="5,3"/>
      <text x="110" y="630" font-size="12" fill="#00FF00">Event Publishers</text>
      <line x1="250" y1="625" x2="300" y2="625" stroke="#FF6B6B" stroke-width="2" stroke-dasharray="5,3"/>
      <text x="310" y="630" font-size="12" fill="#FF6B6B">Idempotent Consumers</text>
    </svg>`
  },
  "devwatchman": {
    title: "DevWatchMan",
    summary: "Developer-focused monitoring and observability platform for system metrics, logs, and runtime visibility.",
    techBadges: [
      { name: "Python", color: "3776AB", logo: "python" },
      { name: "FastAPI", color: "009688", logo: "fastapi" },
      { name: "SQLite", color: "003B57", logo: "sqlite" },
      { name: "JavaScript", color: "F7DF1E", logo: "javascript", logoColor: "black" },
      { name: "HTML5", color: "E34F26", logo: "html5" },
      { name: "CSS3", color: "1572B6", logo: "css3" },
      { name: "Tauri", color: "24C8DB", logo: "tauri" },
      { name: "Rust", color: "000000", logo: "rust" }
    ],
    highlights: [
      "System metrics collected via psutil",
      "REST + WebSocket APIs for real-time updates",
      "Charts rendered on the frontend",
      "Desktop wrapper using Tauri",
      "Designed for extensibility and performance"
    ],
    diagram: `<svg viewBox="0 0 350 280" fill="none" stroke="currentColor" stroke-width="1">
      <style>text{fill:rgba(255,255,255,0.8);font-size:10px;font-family:sans-serif}</style>
      <rect x="20" y="20" width="90" height="35" stroke="rgba(255,255,255,0.4)"/>
      <text x="65" y="43" text-anchor="middle">System Metrics</text>
      <line x1="110" y1="37" x2="140" y2="37" stroke="rgba(255,255,255,0.3)"/>
      <polygon points="145,37 135,32 135,42" fill="rgba(255,255,255,0.3)"/>
      <rect x="150" y="20" width="80" height="35" stroke="rgba(255,255,255,0.4)"/>
      <text x="190" y="43" text-anchor="middle">Collector</text>
      <line x1="190" y1="55" x2="190" y2="85" stroke="rgba(255,255,255,0.3)"/>
      <polygon points="190,90 185,80 195,80" fill="rgba(255,255,255,0.3)"/>
      <rect x="130" y="95" width="120" height="40" stroke="rgba(255,255,255,0.5)"/>
      <text x="190" y="120" text-anchor="middle">FastAPI Server</text>
      <line x1="190" y1="135" x2="190" y2="165" stroke="rgba(255,255,255,0.3)"/>
      <polygon points="190,170 185,160 195,160" fill="rgba(255,255,255,0.3)"/>
      <rect x="150" y="175" width="80" height="30" stroke="rgba(255,255,255,0.3)"/>
      <text x="190" y="195" text-anchor="middle">SQLite</text>
      <rect x="20" y="220" width="100" height="40" stroke="rgba(255,255,255,0.4)"/>
      <text x="70" y="245" text-anchor="middle">Web Dashboard</text>
      <rect x="230" y="220" width="100" height="40" stroke="rgba(255,255,255,0.4)"/>
      <text x="280" y="245" text-anchor="middle">Desktop App</text>
      <line x1="70" y1="220" x2="150" y2="135" stroke="rgba(255,255,255,0.2)"/>
      <line x1="280" y1="220" x2="230" y2="135" stroke="rgba(255,255,255,0.2)"/>
      <text x="90" y="170" font-size="8" fill="rgba(255,255,255,0.5)">REST + WS</text>
      <text x="250" y="170" font-size="8" fill="rgba(255,255,255,0.5)">REST</text>
    </svg>`
  },
  "lak-lms": {
    title: "Lak LMS",
    summary: "Modern Learning Management System with scalable backend logic and rich content features.",
    techBadges: [
      { name: "Next.js", color: "000000", logo: "nextdotjs" },
      { name: "React", color: "61DAFB", logo: "react", logoColor: "black" },
      { name: "Tailwind CSS", color: "06B6D4", logo: "tailwindcss" },
      { name: "PostgreSQL", color: "4169E1", logo: "postgresql" },
      { name: "Prisma", color: "2D3748", logo: "prisma" },
      { name: "AWS", color: "FF9900", logo: "amazonaws", logoColor: "black" },
      { name: "Stripe", color: "008CDD", logo: "stripe" },
      { name: "Docker", color: "2496ED", logo: "docker" }
    ],
    highlights: [
      "Server Actions for mutations",
      "Secure authentication and authorization",
      "Modular component system",
      "Cloud storage and payment integration",
      "CI/CD-driven deployments"
    ],
    diagram: `<svg viewBox="0 0 350 260" fill="none" stroke="currentColor" stroke-width="1">
      <style>text{fill:rgba(255,255,255,0.8);font-size:10px;font-family:sans-serif}</style>
      <rect x="130" y="10" width="90" height="30" stroke="rgba(255,255,255,0.4)"/>
      <text x="175" y="30" text-anchor="middle">Client</text>
      <line x1="175" y1="40" x2="175" y2="60" stroke="rgba(255,255,255,0.3)"/>
      <polygon points="175,65 170,55 180,55" fill="rgba(255,255,255,0.3)"/>
      <rect x="110" y="70" width="130" height="40" stroke="rgba(255,255,255,0.5)"/>
      <text x="175" y="95" text-anchor="middle">Next.js App</text>
      <line x1="175" y1="110" x2="175" y2="130" stroke="rgba(255,255,255,0.3)"/>
      <polygon points="175,135 170,125 180,125" fill="rgba(255,255,255,0.3)"/>
      <rect x="100" y="140" width="150" height="35" stroke="rgba(255,255,255,0.4)"/>
      <text x="175" y="163" text-anchor="middle">Server Actions + Prisma</text>
      <line x1="175" y1="175" x2="175" y2="195" stroke="rgba(255,255,255,0.3)"/>
      <polygon points="175,200 170,190 180,190" fill="rgba(255,255,255,0.3)"/>
      <rect x="130" y="205" width="90" height="30" stroke="rgba(255,255,255,0.3)"/>
      <text x="175" y="225" text-anchor="middle">PostgreSQL</text>
      <rect x="20" y="140" width="60" height="30" stroke="rgba(255,255,255,0.3)"/>
      <text x="50" y="160" text-anchor="middle">AWS S3</text>
      <rect x="270" y="140" width="60" height="30" stroke="rgba(255,255,255,0.3)"/>
      <text x="300" y="160" text-anchor="middle">Stripe</text>
      <line x1="80" y1="155" x2="100" y2="155" stroke="rgba(255,255,255,0.2)"/>
      <line x1="250" y1="155" x2="270" y2="155" stroke="rgba(255,255,255,0.2)"/>
    </svg>`
  }
};

// Modal elements
const modal = document.getElementById("project-modal");
const modalBackdrop = modal?.querySelector(".modal__backdrop");
const modalClose = modal?.querySelector(".modal__close");
const modalTitle = modal?.querySelector(".modal__title");
const modalSummary = modal?.querySelector(".modal__summary");
const modalTech = modal?.querySelector(".modal__tech");
const modalHighlights = modal?.querySelector(".modal__highlights");
const modalDiagram = modal?.querySelector(".modal__diagram");

function openModal(projectId) {
  const data = projectData[projectId];
  if (!data || !modal) return;

  // Populate content
  modalTitle.textContent = data.title;
  modalSummary.textContent = data.summary;
  
  // Tech badges (shields.io)
  modalTech.innerHTML = data.techBadges
    .map(b => {
      const logoColor = b.logoColor || "white";
      return `<img src="https://img.shields.io/badge/${encodeURIComponent(b.name)}-${b.color}?style=for-the-badge&logo=${b.logo}&logoColor=${logoColor}" alt="${b.name}" />`;
    })
    .join("");
  
  // Highlights
  modalHighlights.innerHTML = data.highlights
    .map(h => `<li>${h}</li>`)
    .join("");
  
  // Diagram
  modalDiagram.innerHTML = data.diagram;
  
  // Show modal
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  
  // Focus trap
  modalClose?.focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

// Event listeners for project titles
document.querySelectorAll("[data-project]").forEach((title) => {
  title.addEventListener("click", () => {
    openModal(title.dataset.project);
  });
  
  title.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(title.dataset.project);
    }
  });
});

// Close handlers
modalClose?.addEventListener("click", closeModal);
modalBackdrop?.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.classList.contains("is-open")) {
    closeModal();
  }
});
