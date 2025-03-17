import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LucideAlertCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <LucideAlertCircle className="w-16 h-16 text-red-500" />
      <h1 className="text-4xl font-bold mt-4">404 - Página no encontrada</h1>
      <p className="text-gray-500 mt-2">
        Lo sentimos, la página que buscas no existe.
      </p>
      <Link href="/">
        <Button className="mt-4">Volver al inicio</Button>
      </Link>
    </div>
  );
}
