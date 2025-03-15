"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorCode = searchParams.get("error_code");
  const errorDescription = searchParams.get("error_description");

  // Traducción de errores conocidos
  const translatedErrors: Record<string, string> = {
    access_denied: "Acceso denegado",
    signup_disabled: "Registro deshabilitado",
  };

  const translatedError = error ? translatedErrors[error] || error : null;
  const translatedErrorCode = errorCode
    ? translatedErrors[errorCode] || errorCode
    : null;
  const translatedDescription =
    errorDescription === "Signups not allowed for this instance"
      ? "El registro de usuarios no está permitido en esta instancia."
      : decodeURIComponent(errorDescription || "");

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-destructive">
            Error de Inicio de Sesión
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {translatedError && (
            <p className="font-semibold">Error: {translatedError}</p>
          )}
          {translatedErrorCode && (
            <p className="font-semibold">Código: {translatedErrorCode}</p>
          )}
          {translatedDescription && (
            <p className="text-gray-700">{translatedDescription}</p>
          )}
          <Button
            className="w-full mt-4"
            onClick={() => (window.location.href = "/login")}
          >
            Volver a intentar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
