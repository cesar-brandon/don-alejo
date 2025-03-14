import { createClient } from "@/modules/core/lib/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return children;
  }

  redirect("/dashboard");
}
