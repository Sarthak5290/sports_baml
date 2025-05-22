// src/app/_components/ErrorPreview.tsx
import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorPreviewProps {
  error: Error | unknown;
}

const ErrorPreview: React.FC<ErrorPreviewProps> = ({ error }) => {
  const errorMessage =
    error instanceof Error ? error.message : "An unexpected error occurred";
  const errorStack = error instanceof Error ? error.stack : "";

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <p className="font-medium">{errorMessage}</p>
        {process.env.NODE_ENV === "development" && errorStack && (
          <details className="mt-2">
            <summary className="cursor-pointer text-sm">Stack trace</summary>
            <pre className="mt-2 text-xs overflow-auto bg-red-50 p-2 rounded">
              {errorStack}
            </pre>
          </details>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorPreview;
