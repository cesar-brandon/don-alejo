"use server";

import { createClient } from "@/modules/core/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { ActionState } from "../type/action-state";

export async function login(actionState: ActionState, formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return toActionState("Error al iniciar sesión", "ERROR");
  }

  revalidatePath("/dashboard", "layout");
  return toActionState("Iniciaste sesión correctamente", "SUCCESS");
}

export async function signup(actionState: ActionState, formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return toActionState("Error al registrarse", "ERROR");
  }

  revalidatePath("/", "layout");
  return toActionState("Registrado correctamente", "SUCCESS");
}

const toActionState = (
  message: string,
  status: "SUCCESS" | "ERROR"
): ActionState => {
  return { message, status };
};
