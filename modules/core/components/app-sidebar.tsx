"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav/nav-main";
import { NavSecondary } from "./nav/nav-secondary";
import { NavUser } from "./nav/nav-user";
import LogoIcon from "@/modules/core/components/icons/logo-icon";
import Link from "next/link";
import { navData } from "../lib/breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "../lib/supabase/client";
import { toast } from "sonner";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const supabase = createClient();
  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        throw new Error(error.message);
      }
      return data.session?.user;
    },
  });

  if (isError) {
    toast.error("Error al cargar la sesión");
    return null;
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground overflow-hidden">
                  <LogoIcon />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Don Alejo</span>
                  <span className="truncate text-xs">donalejo.com</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} userRole={user?.user_metadata?.role} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={navData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} isPending={isPending} />
      </SidebarFooter>
    </Sidebar>
  );
}
