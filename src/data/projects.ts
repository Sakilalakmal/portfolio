export interface Project {
  id: string;
  name: string;
  tagline: string;
  thumbnail: string;
  sourceUrl: string;
  liveUrl: string;
  techStack: {
    category: string;
    items: string[];
  }[];
  highlights: string[];
  architecture: string[];
  security: string[];
  description: string;
}

export const projects: Project[] = [
  {
    id: "kada-mandiya",
    name: "Kada Mandiya",
    tagline: "Event-Driven Microservices E-Commerce Platform",
    thumbnail: "/wallpapers/kada.png",
    sourceUrl: "https://github.com/Sakilalakmal/kada_mandiya_microservice",
    liveUrl: "https://github.com/Sakilalakmal/kada_mandiya_microservice",
    techStack: [
      {
        category: "Backend",
        items: [
          "Node.js",
          "Express.js",
          "TypeScript",
          "RabbitMQ",
          "Microsoft SQL Server",
          "JSON Web Tokens (JWT)",
          "Stripe API",
        ],
      },
      {
        category: "Frontend",
        items: ["Next.js", "React", "TypeScript"],
      },
      {
        category: "Infrastructure & DevOps",
        items: ["Docker", "Docker Compose", "RabbitMQ Management UI"],
      },
    ],
    highlights: [
      "Pure Event-Driven Microservices — Business services communicate only through RabbitMQ events, no direct service-to-service HTTP calls",
      "Database per Service — Each microservice owns its own SQL Server database, ensuring strict data isolation and autonomy",
      "API Gateway Pattern — A centralized gateway handles JWT verification, routing, and acts as the single entry point",
      "Idempotent Event Consumers — All event handlers are designed to safely handle duplicate messages, preventing inconsistent state",
      "Secure, Production-Ready Payments — Stripe integration with verified webhooks and server-side amount validation",
      "Correlation ID Tracking — Every request and event carries a correlationId for distributed tracing and debugging",
    ],
    architecture: [
      "Client applications communicate only with the API Gateway",
      "API Gateway routes requests to relevant services",
      "Services publish and consume domain events via RabbitMQ",
      "No tight coupling between services",
      "Fully asynchronous, scalable design",
    ],
    security: [
      "Stateless JWT authentication (locally verified in each service)",
      "Secure password hashing",
      "Stripe webhook signature verification",
      "No trust in client-side payment data",
    ],
    description:
      "Kada Mandiya is a production-grade, enterprise-style e-commerce platform built to demonstrate real-world microservices architecture, event-driven communication, and secure payment workflows. The system is designed with scalability, reliability, and clean domain separation in mind.\n\nThe platform implements 9 independently deployable microservices: Authentication Service, User Service, Product Service, Order Service, Payment Service, Cart Service, Vendor Service, Review Service, and Notification Service. Each service follows clear domain boundaries and can be scaled independently based on demand.",
  },
  {
    id: "lms-platform",
    name: "Learning Management System",
    tagline: "Full-Stack SaaS LMS Platform",
    thumbnail: "/wallpapers/lms.png",
    sourceUrl: "https://github.com/Sakilalakmal/lak_lms_system",
    liveUrl: "https://lak-lms-system.vercel.app/login",
    techStack: [
      {
        category: "Frontend",
        items: [
          "Next.js 16 (App Router)",
          "React 19",
          "TypeScript",
          "Tailwind CSS 4",
          "Radix UI",
          "Shadcn UI",
          "Lucide React",
          "TipTap",
          "Recharts",
          "TanStack Table",
        ],
      },
      {
        category: "Backend & Data",
        items: [
          "PostgreSQL",
          "Prisma ORM",
          "Next.js Server Actions",
          "REST APIs",
        ],
      },
      {
        category: "Authentication & Security",
        items: [
          "Better Auth",
          "Email OTP",
          "GitHub OAuth",
          "Google OAuth",
          "Arcjet",
        ],
      },
      {
        category: "Payments",
        items: [
          "Stripe Checkout",
          "Stripe Webhooks",
          "One-Time Payments",
          "Subscription Plans",
        ],
      },
      {
        category: "Media & Storage",
        items: ["AWS S3", "Presigned URLs"],
      },
      {
        category: "Emails & Notifications",
        items: ["Resend", "Transactional Emails", "OTP Notifications"],
      },
      {
        category: "DevOps & CI/CD",
        items: ["Docker", "Jenkins", "Docker Hub"],
      },
    ],
    highlights: [
      "Full-Stack SaaS Architecture — Built using Next.js Server Actions, combining frontend and backend in a clean, scalable structure",
      "Role-Based Access Control (RBAC) — Clearly separated experiences for Admins, Tutors, and Students, each with protected dashboards and routes",
      "Secure Authentication & Access — Modern auth flow using Email OTP and OAuth, designed for real production usage",
      "High-Performance Video Delivery — Course videos are streamed securely using AWS S3 presigned URLs, preventing unauthorized access",
      "Real-Time Learning Progress Tracking — Tracks lesson completion and course progress, giving students instant feedback and instructors insight",
      "Production-Ready Payments — Stripe-powered checkout for course purchases and subscription-based tutor access",
      "Advanced Security Layer — Protected by Arcjet, including bot detection, rate limiting, and SQL injection prevention",
      "Automated CI/CD Pipeline — Every commit triggers linting, type checks, builds, Docker image creation, and deployment via Jenkins",
    ],
    architecture: [
      "App Router–based full-stack architecture",
      "Server Actions for secure data mutations",
      "PostgreSQL + Prisma for strong data consistency",
      "Secure media handling without exposing storage credentials",
      "Clean separation between public, authenticated, and role-restricted routes",
    ],
    security: [
      "Arcjet bot protection and rate limiting",
      "SQL injection prevention at the gateway level",
      "Email OTP and OAuth for secure authentication",
      "AWS S3 presigned URLs for protected video streaming",
    ],
    description:
      "An advanced, full-stack SaaS Learning Management System designed to deliver a secure, scalable, and modern online education experience. Built with Next.js 16 App Router, the platform focuses on performance, security, and real-world SaaS patterns.\n\nThe system provides role-based access control for Admins, Tutors, and Students, with secure video streaming, real-time progress tracking, and production-ready payment integration. Every aspect is designed with enterprise-grade security and scalability in mind.",
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};
