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

export default function DeleteConfirmationDialog({
  id,
  tableName,
  queryKey,
}: {
  id: string;
  tableName: string;
  queryKey: string;
}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      await supabase
        .from(tableName)
        .update({ state: 0, user_del: user?.id, deleted_at: new Date() })
        .match({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      setOpen(false);
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
            ¿Estás seguro de eliminar este dato?
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
