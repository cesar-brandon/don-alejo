import { useActionState } from "react";
import { withCallbacks } from "../../core/lib/callbacks";
import { googleLogin, login } from "../actions/login";
import { toast } from "sonner";
import { ActionState } from "../../core/types/action-state";

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
    null,
  );
};

export const useGoogleLogin = () => {
  return useActionState(
    withCallbacks(googleLogin, {
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
    null,
  );
};
