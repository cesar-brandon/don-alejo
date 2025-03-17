import { createClient } from "@/modules/core/lib/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Separator } from "@/modules/core/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/modules/core/components/ui/sidebar";
import { AppSidebar } from "@/modules/core/components/app-sidebar";
import BreadcrumbMain from "@/modules/core/components/breadcrumb-main";

export const metadata: Metadata = {
  title: "Sistema",
  description: "Página principal del sistema.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <SidebarProvider className="overflow-hidden">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1">
              Alternar barra lateral
            </SidebarTrigger>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbMain />
          </div>
        </header>
        <div className="p-4 pt-0 max-h-[90dvh] overflow-y-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
