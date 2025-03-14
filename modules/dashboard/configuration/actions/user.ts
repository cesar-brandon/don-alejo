"use server";

import { supabase } from "@/modules/core/lib/supabase/admin";

export async function updateUserAction({
  id,
  email,
  password,
}: {
  id: string;
  email?: string;
  password?: string;
}) {
  if (!id || (!email && !password)) {
    return { error: "Datos incompletos" };
  }

  const { error } = await supabase.auth.admin.updateUserById(id, {
    email,
    password,
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

export async function banUserAction(userId: string, currentUserId: string) {
  if (!userId) {
    return { error: "ID de usuario inválido" };
  }

  const { error } = await supabase.auth.admin.updateUserById(userId, {
    ban_duration: "",
    user_metadata: {
      state: 0,
      user_del: currentUserId,
      deleted_at: new Date().toLocaleString(),
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { message: "Usuario baneado correctamente" };
}
