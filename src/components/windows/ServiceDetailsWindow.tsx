"use client";

import DesktopWindow from "./DesktopWindow";

interface ServiceDetailsWindowProps {
  serviceName: string;
}

export default function ServiceDetailsWindow({
  serviceName,
}: ServiceDetailsWindowProps) {
  const serviceData: Record<string, { publishes: string[]; consumes: string[] }> = {
    "auth-service": {
      publishes: ["user.authenticated", "user.logged_out"],
      consumes: ["user.created"],
    },
    "user-service": {
      publishes: ["user.created", "user.updated"],
      consumes: ["order.created"],
    },
    "product-service": {
      publishes: ["product.created", "product.updated"],
      consumes: ["order.created"],
    },
    "cart-service": {
      publishes: ["cart.updated"],
      consumes: ["user.created", "product.updated"],
    },
    "order-service": {
      publishes: ["order.created", "order.updated"],
      consumes: ["payment.succeeded", "cart.updated"],
    },
    "payment-service": {
      publishes: ["payment.succeeded", "payment.failed"],
      consumes: ["order.created"],
    },
    "notification-service": {
      publishes: [],
      consumes: ["order.created", "payment.succeeded", "user.created"],
    },
  };

  const events = serviceData[serviceName] || { publishes: [], consumes: [] };

  return (
    <DesktopWindow
      id={`service-details:${serviceName}`}
      title={serviceName.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
      width={600}
      height={480}
    >
      <div className="h-full bg-white p-8 overflow-auto">
        {/* Service Name */}
        <h2 className="text-xl font-bold mb-6 text-black">{serviceName.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</h2>

        {/* Tech Stack */}
        <div className="mb-8">
          <h3 className="text-base font-semibold mb-3 text-gray-700">Tech Stack</h3>
          <div className="text-sm text-black leading-relaxed">
            Node.js • TypeScript • Express • SQL Server • RabbitMQ
          </div>
        </div>

        {/* Events */}
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold mb-3 text-gray-700">
              Events Published
            </h3>
            <ul className="text-sm text-black space-y-2">
              {events.publishes.length > 0 ? (
                events.publishes.map((event, index) => (
                  <li key={index} className="ml-5">
                    • {event}
                  </li>
                ))
              ) : (
                <li className="ml-5 text-gray-500 italic">None</li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-3 text-gray-700">
              Events Consumed
            </h3>
            <ul className="text-sm text-black space-y-2">
              {events.consumes.length > 0 ? (
                events.consumes.map((event, index) => (
                  <li key={index} className="ml-5">
                    • {event}
                  </li>
                ))
              ) : (
                <li className="ml-5 text-gray-500 italic">None</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </DesktopWindow>
  );
}
