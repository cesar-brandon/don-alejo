"use client";

import * as React from "react";
import {
  Frame,
  HandPlatter,
  Map,
  PieChart,
  Settings,
  SquareChartGantt,
  Utensils,
} from "lucide-react";
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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Configuración",
      url: "/configuracion/menu",
      icon: Settings,
      isActive: true,
      items: [
        {
          title: "Categorías",
          url: "/dashboard/configuracion/categorias",
        },
        {
          title: "Menú",
          url: "/dashboard/configuracion/menu",
        },
        {
          title: "Roles",
          url: "/dashboard/configuracion/roles",
        },
        {
          title: "Usuarios",
          url: "/dashboard/configuracion/usuarios",
        },
      ],
    },
    {
      title: "Pedidos",
      url: "#",
      icon: HandPlatter,
      items: [
        {
          title: "Gestión de Pedidos",
          url: "#",
        },
      ],
    },
    {
      title: "Cocina",
      url: "#",
      icon: Utensils,
      items: [
        {
          title: "Pedidos",
          url: "#",
        },
      ],
    },
    // {
    //   title: "Reportes",
    //   url: "#",
    //   icon: SquareChartGantt,
    //   items: [
    //     {
    //       title: "Ventas",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  navSecondary: [],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
