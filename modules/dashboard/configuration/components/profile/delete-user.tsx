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
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { banUserAction } from "../../actions/user";

export default function DeleteUserConfirmationDialog({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const supabase = createClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user?.id)
        throw new Error("No se pudo obtener el usuario autenticado.");

      const result = await banUserAction(id, user.id);

      if (result.error) throw new Error("Error al banear el usuario.");
    },
    onError: (error) => {
      console.error("Error en la mutación:", error);
      toast.error("Error al eliminar el usuario.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setOpen(false);
      toast.success("Usuario eliminado y baneado correctamente.");
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
