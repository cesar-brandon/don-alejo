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
          <Form item={item} setOpen={setOpen} />
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
        <Form className="px-4" item={item} setOpen={setOpen} />
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
  setOpen,
}: {
  className?: string;
  item?: Tables<"product_group">;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: item?.name || "",
    description: item?.description || "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: { name: string; description: string }) => {
      const supabase = createClient();
      if (!item) {
        return await supabase.from("product_group").insert(formData);
      }
      if (item.id) {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const updateData = {
          ...formData,
          user_upd: session?.user?.id ?? "",
          updated_at: new Date().toISOString(),
        };
        await supabase
          .from("product_group")
          .update(updateData)
          .eq("id", item.id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product_group"] });
      setOpen(false);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate(formData);
      }}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Nombre del grupo</Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Ej. Entradas"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Ej. Platos ligeros para comenzar"
          value={formData.description}
          onChange={handleChange}
          className="max-h-32"
        />
      </div>
      <Button type="submit" isLoading={isPending}>
        Guardar Categoría
      </Button>
    </form>
  );
}
