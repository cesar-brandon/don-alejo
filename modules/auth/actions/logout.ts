"use server";

import { createClient } from "@/modules/core/lib/supabase/server";

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut({ scope: "local" });
}
