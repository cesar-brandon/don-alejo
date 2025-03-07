"use client";
import { GoogleLogo } from "@/modules/core/components/icons/svgl";
import { Button } from "@/modules/core/components/ui/button";
import { Input } from "@/modules/core/components/ui/input";
import { Label } from "@/modules/core/components/ui/label";
import { cn } from "@/modules/core/lib/utils";
import { Eye, Loader2 } from "lucide-react";
import { useState } from "react";
import { useLogin } from "../hook/userLogin";
import { redirect } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [visible, setVisible] = useState(false);
  const [, loginAction, loginPending] = useLogin();

  const handleSubmit = async (formData: FormData) => {
    await loginAction(formData);
    if (!loginPending) {
      redirect("/dashboard");
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      action={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Inicia sesión en tu cuenta</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Ingresa tu correo electrónico abajo para continuar
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@ejemplo.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={visible ? "text" : "password"}
              className="pr-12"
              placeholder="********"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
              onClick={() => setVisible((v) => !v)}
            >
              <Eye className="w-6 h-6" />
            </Button>
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={loginPending}>
          Iniciar Sesión
          {loginPending && <Loader2 className="w-6 h-6 animate-spin" />}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            O continúa con
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <GoogleLogo className="w-6 h-6" />
          Iniciar sesión con Google
        </Button>
      </div>
    </form>
  );
}
