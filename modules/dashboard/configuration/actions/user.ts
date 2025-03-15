"use server";

import { supabase } from "@/modules/core/lib/supabase/admin";

export async function updateUserAction({
  id,
  email,
  password,
  user_metadata,
}: {
  id: string;
  email?: string;
  password?: string;
  user_metadata: object;
}) {
  if (!id || (!email && !password)) {
    return { error: "Datos incompletos" };
  }

  const { error } = await supabase.auth.admin.updateUserById(id, {
    email,
    password,
    user_metadata: user_metadata,
  });

  if (error) {
    return { error: error.message };
  }

  return { message: "Usuario actualizado correctamente" };
}

export async function deleteUserAction(userId: string) {
  if (!userId) {
    return { error: "ID de usuario inválido" };
  }

  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    return { error: error.message };
  }

  return { message: "Usuario eliminado correctamente" };
}

export async function banUserAction(userId: string) {
  if (!userId) {
    return { error: "ID de usuario inválido" };
  }

  const { error } = await supabase.auth.admin.updateUserById(userId, {
    ban_duration: "1000000h",
  });

  if (error) {
    return { error: error.message };
  }

  return { message: "Usuario baneado correctamente" };
}

export async function unbanUserAction(userId: string) {
  if (!userId) {
    return { error: "ID de usuario inválido" };
  }

  const { error } = await supabase.auth.admin.updateUserById(userId, {
    ban_duration: "0h",
  });

  if (error) {
    return { error: error.message };
  }

  return { message: "Usuario baneado correctamente" };
}
