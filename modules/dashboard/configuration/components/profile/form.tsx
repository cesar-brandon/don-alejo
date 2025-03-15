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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/modules/core/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMediaQuery } from "@/modules/core/hooks/use-media-query";
import { createClient } from "@/modules/core/lib/supabase/client";
import { cn } from "@/modules/core/lib/utils";
import { Tables } from "@/modules/core/types/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pen, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { ProfileRequest, ProfileValidator } from "../../validators/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role, roles } from "../../config/role";
import { updateUserAction } from "../../actions/user";

export default function ProfileFormModal({
  id,
  item,
}: {
  id?: string;
  item?: Tables<"profile">;
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
              Agregar Usuario
              <Plus />
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{id ? "Editar" : "Agregar"} Usuario</DialogTitle>
            <DialogDescription>
              Completa los campos y guarda los cambios.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm item={item} setOpen={setOpen} />
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
            Agregar Usuario
            <Plus />
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{id ? "Editar" : "Agregar"} Usuario</DrawerTitle>
          <DrawerDescription>
            Completa los campos y guarda los cambios.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" item={item} setOpen={setOpen} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({
  className,
  item,
  setOpen,
}: {
  className?: string;
  item?: Tables<"profile">;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const form = useForm<ProfileRequest>({
    resolver: zodResolver(ProfileValidator),
    defaultValues: {
      id: item?.id || "",
      email: item?.email || "",
      password: "",
      first_name: item?.first_name || "",
      last_name: item?.last_name || "",
      role: item?.role || Role.Mesero,
    },
  });

  const { mutate: upsertProfile, isPending } = useMutation({
    mutationFn: async (formData: {
      email: string;
      password?: string;
      first_name: string;
      last_name: string;
      role: string;
    }) => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError) throw new Error("Error al obtener la sesión");

      if (!item) {
        // 🔹 Crear usuario con metadata
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password ?? "",
          options: {
            data: {
              email: formData.email,
              first_name: formData.first_name,
              last_name: formData.last_name,
              role: formData.role,
              user_reg: session?.user?.id ?? "",
            },
          },
        });
        if (error) throw new Error(error.message);
        return true;
      }

      // 🔹 Actualizar `profiles`
      const { error: profileError } = await supabase
        .from("profile") // Corrección en el nombre de la tabla
        .update({
          email: formData.email ?? item.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          role: formData.role,
          user_upd: session?.user?.id ?? "",
          updated_at: new Date().toISOString(),
        })
        .eq("id", item.id);

      if (profileError) throw new Error(profileError.message);

      // 🔹 Actualizar `auth.users` solo si se cambia email o contraseña
      const result = await updateUserAction({
        id: item.id, // ID en `auth.users`
        email: formData.email || undefined,
        password: formData.password || undefined,
        user_metadata: {
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          role: formData.role,
        },
      });

      if (result.error) throw new Error(result.error);

      await supabase.auth.refreshSession();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error al guardar el usuario: " + error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setOpen(false);
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          upsertProfile(data as ProfileRequest),
        )}
        className={cn("grid items-start gap-4", className)}
      >
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombres</FormLabel>
              <FormControl>
                <Input placeholder="Ej. Juan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellidos</FormLabel>
              <FormControl>
                <Input placeholder="Ej. Pérez" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormDescription>
                {roles.find((role) => role.value === field.value)?.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input placeholder="usuario@ejemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {item?.id ? "Nueva contraseña" : "Contraseña"}
              </FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" isLoading={isPending}>
          {item ? "Actualizar Usuario" : "Registrar Usuario"}
        </Button>
      </form>
    </Form>
  );
}
