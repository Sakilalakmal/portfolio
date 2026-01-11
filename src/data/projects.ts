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
      "This architecture mirrors real enterprise backend systems, not tutorial-level apps",
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
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};
