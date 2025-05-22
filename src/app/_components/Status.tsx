// src/app/_components/Status.tsx
import React from "react";
import { CheckCircle, XCircle, Loader2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StatusProps {
  status: "idle" | "pending" | "success" | "error";
}

export const Status: React.FC<StatusProps> = ({ status }) => {
  const statusConfig = {
    idle: {
      icon: Clock,
      label: "Ready",
      variant: "secondary" as const,
      className: "bg-gray-100 text-gray-700",
    },
    pending: {
      icon: Loader2,
      label: "Loading",
      variant: "secondary" as const,
      className: "bg-blue-100 text-blue-700",
      animate: true,
    },
    success: {
      icon: CheckCircle,
      label: "Success",
      variant: "secondary" as const,
      className: "bg-green-100 text-green-700",
    },
    error: {
      icon: XCircle,
      label: "Error",
      variant: "destructive" as const,
      className: "bg-red-100 text-red-700",
    },
  };

  const config = statusConfig[status] || statusConfig.idle;
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={config.className}>
      <Icon className={`h-3 w-3 mr-1 ${config ? "animate-spin" : ""}`} />
      {config.label}
    </Badge>
  );
};
