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
import { Textarea } from "@/modules/core/components/ui/textarea";
import { useMediaQuery } from "@/modules/core/hooks/use-media-query";
import { createClient } from "@/modules/core/lib/supabase/client";
import { cn } from "@/modules/core/lib/utils";
import { Tables } from "@/modules/core/types/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pen, Plus } from "lucide-react";
import { useState } from "react";

export default function ProductGroupForm({
  id,
  item,
}: {
  id?: string;
  item?: Tables<"product_group">;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {id ? (
            <Button variant="outline" size="icon">
              <Pen />
            </Button>
          ) : (
            <Button variant="secondary">
              Agregar Grupo
              <Plus />
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{id ? "Editar" : "Agregar"} Grupo</DialogTitle>
            <DialogDescription>
              Completa los campos y guarda los cambios.
            </DialogDescription>
          </DialogHeader>
          <Form item={item} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {id ? (
          <Button variant="outline" size="icon">
            <Pen />
          </Button>
        ) : (
          <Button variant="secondary">
            Agregar Grupo
            <Plus />
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{id ? "Editar" : "Agregar"} Grupo</DrawerTitle>
          <DrawerDescription>
            Completa los campos y guarda los cambios.
          </DrawerDescription>
        </DrawerHeader>
        <Form className="px-4" item={item} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function Form({
  className,
  item,
}: {
  className?: string;
  item?: Tables<"product_group">;
}) {
  const queyClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const supabase = createClient();
      if (item && item.id) {
        const { data } = await supabase.auth.getUser();
        // formData.append("user_upd", data.user?.id);
        formData.append("updated_at", new Date().toISOString());
        await supabase.from("product_group").update(formData).eq("id", item.id);
      } else {
        await supabase.from("product_group").insert(formData);
      }
    },
    onSuccess: () => {
      queyClient.invalidateQueries({ queryKey: ["product_group"] });
    },
  });

  return (
    <form action={mutate} className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="name">Nombre del grupo</Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Ej. Entradas"
          value={item?.name || ""}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Ej. Platos ligeros para comenzar"
          value={item?.description || ""}
        />
      </div>
      <Button type="submit" isLoading={isPending}>
        Guardar Categoría
      </Button>
    </form>
  );
}
