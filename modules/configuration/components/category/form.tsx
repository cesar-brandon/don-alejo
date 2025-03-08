"use client";

import { Button } from "@/modules/core/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/modules/core/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/modules/core/components/ui/drawer";
import { Input } from "@/modules/core/components/ui/input";
import { Label } from "@/modules/core/components/ui/label";
import { useMediaQuery } from "@/modules/core/hooks/use-media-query";
import { cn } from "@/modules/core/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function CategoryForm({
  className,
}: React.ComponentProps<"form">) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary">
            Agregar Categoría
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar/Editar Categoría</DialogTitle>
            <DialogDescription>
              Completa los campos y guarda los cambios.
            </DialogDescription>
          </DialogHeader>
          <Form />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary">
          Agregar Categoría
          <Plus />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Agregar/Editar Categoría</DrawerTitle>
          <DrawerDescription>
            Completa los campos y guarda los cambios.
          </DrawerDescription>
        </DrawerHeader>
        <Form className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function Form({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="nombre">Nombre de la Categoría</Label>
        <Input type="text" id="nombre" placeholder="Ej. Entradas" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="descripcion">Descripción</Label>
        <Input
          type="text"
          id="descripcion"
          placeholder="Ej. Platos ligeros para comenzar"
        />
      </div>
      <Button type="submit">Guardar Categoría</Button>
    </form>
  );
}
