import { useActionState } from "react";
import { withCallbacks } from "../utils/callbacks";
import { login } from "../actions/login";
import { toast } from "sonner";
import { ActionState } from "../type/action-state";

export const useLogin = () => {
  return useActionState(
    withCallbacks(login, {
      onStart: () => {
        return toast.loading("Iniciando sesión...");
      },
      onError: (result: ActionState) => {
        if (result?.message) {
          toast.error(result.message);
        }
      },
      onSuccess: (result: ActionState) => {
        if (result?.message) {
          toast.success(result.message);
        }
      },
      onEnd: (reference: string | number) => {
        toast.dismiss(reference);
      },
    }),
    null
  );
};
