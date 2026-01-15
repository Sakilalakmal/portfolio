"use client";

import { useState } from "react";
import DesktopWindow from "./DesktopWindow";
import { useDesktopStore } from "@/store/desktopStore";

interface Service {
  id: string;
  name: string;
  icon: string;
}

export default function MicroservicesDetailsWindow() {
  const { openWindow } = useDesktopStore();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services: Service[] = [
    { id: "auth-service", name: "Auth Service", icon: "🔐" },
    { id: "user-service", name: "User Service", icon: "👤" },
    { id: "product-service", name: "Product Service", icon: "📦" },
    { id: "cart-service", name: "Cart Service", icon: "🛒" },
    { id: "order-service", name: "Order Service", icon: "📋" },
    { id: "payment-service", name: "Payment Service", icon: "💳" },
    { id: "notification-service", name: "Notification Service", icon: "📧" },
  ];

  const handleServiceClick = (service: Service) => {
    setSelectedService(service.id);
  };

  const handleServiceDoubleClick = (service: Service) => {
    openWindow({
      id: `service-details:${service.id}`,
      type: "service-details",
      title: service.name,
      width: 600,
      height: 480,
    });
  };

  const handleServiceKeyDown = (
    e: React.KeyboardEvent,
    service: Service
  ) => {
    if (e.key === "Enter") {
      handleServiceDoubleClick(service);
    }
  };

  return (
    <DesktopWindow
      id="microservices-details"
      title="Microservices Architecture"
      width={680}
      height={520}
    >
      <div className="h-full flex flex-col bg-white">
        {/* Header */}
        <div
          className="px-5 py-4 border-b-2"
          style={{ borderBottomColor: "#808080" }}
        >
          <h2 className="text-base font-bold mb-2">Event-Driven Microservices</h2>
          <p className="text-sm text-gray-700">
            Node.js • TypeScript • RabbitMQ • SQL Server • Docker
          </p>
        </div>

        {/* Services Grid */}
        <div className="flex-1 p-6 grid grid-cols-3 gap-5 auto-rows-max content-start overflow-auto">
          {services.map((service) => (
            <div
              key={service.id}
              tabIndex={0}
              onClick={() => handleServiceClick(service)}
              onDoubleClick={() => handleServiceDoubleClick(service)}
              onKeyDown={(e) => handleServiceKeyDown(e, service)}
              className={`
                flex flex-col items-center p-5 cursor-pointer rounded-lg
                ${
                  selectedService === service.id
                    ? "bg-[#0b3d91] text-white"
                    : "hover:bg-[#e8e8e8]"
                }
              `}
            >
              <div className="text-5xl mb-3">{service.icon}</div>
              <div className="text-sm font-semibold text-center break-words w-full">
                {service.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DesktopWindow>
  );
}
