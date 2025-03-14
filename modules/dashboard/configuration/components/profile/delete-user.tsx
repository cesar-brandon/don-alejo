import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/modules/core/components/ui/alert-dialog";
import { Button } from "@/modules/core/components/ui/button";
import { createClient } from "@/modules/core/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, ShieldBan, ShieldCheck, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  banUserAction,
  deleteUserAction,
  unbanUserAction,
} from "../../actions/user";

export function DeleteUserConfirmationDialog({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const supabase = createClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const {
        data: { session },
        error: userError,
      } = await supabase.auth.getSession();
      if (userError || !session?.user?.id)
        throw new Error("No se pudo obtener el usuario autenticado.");

      const { error } = await deleteUserAction(id);

      if (error) throw new Error("Error al eliminar el usuario.");
    },
    onError: (error) => {
      console.error("Error en la mutación:", error);
      toast.error("Error al eliminar el usuario.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setOpen(false);
      toast.success("Usuario eliminado correctamente.");
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de eliminar este usuario?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button
            onClick={() => {
              mutate();
            }}
            disabled={isPending}
          >
            {isPending ? "Eliminando..." : "Continuar"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function UserBanButton({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const supabase = createClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const {
        data: { session },
        error: userError,
      } = await supabase.auth.getSession();
      if (userError || !session?.user?.id)
        throw new Error("No se pudo obtener el usuario autenticado.");

      // Ejecutar ambas operaciones en paralelo
      const [updateError, banError] = await Promise.allSettled([
        supabase
          .from("profile")
          .update({
            state: 0,
            user_del: session.user.id,
            deleted_at: new Date().toISOString(),
          })
          .match({ id }),

        await banUserAction(id),
      ]);

      if (updateError.status === "rejected")
        throw new Error("Error al actualizar el perfil.");
      if (banError.status === "rejected")
        throw new Error("Error al banear el usuario.");
    },
    onError: (error) => {
      console.error("Error en la mutación:", error);
      toast.error("Error al eliminar el usuario.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Usuario baneado correctamente.");
    },
  });

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => {
        mutate();
      }}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="animate-spin" /> : <ShieldBan />}
    </Button>
  );
}

export function UserUnbanButton({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const supabase = createClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const {
        data: { session },
        error: userError,
      } = await supabase.auth.getSession();
      if (userError || !session?.user?.id)
        throw new Error("No se pudo obtener el usuario autenticado.");

      // Ejecutar ambas operaciones en paralelo
      const [updateError, banError] = await Promise.allSettled([
        supabase
          .from("profile")
          .update({
            state: 1,
            user_upd: session.user.id,
            updated_at: new Date().toISOString(),
          })
          .match({ id }),

        await unbanUserAction(id),
      ]);

      if (updateError.status === "rejected")
        throw new Error("Error al actualizar el perfil.");
      if (banError.status === "rejected")
        throw new Error("Error al banear el usuario.");
    },
    onError: (error) => {
      console.error("Error en la mutación:", error);
      toast.error("Error al eliminar el usuario.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Usuario baneado correctamente.");
    },
  });

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => {
        mutate();
      }}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
    </Button>
  );
}
