import { HandPlatter, Settings, Utensils } from "lucide-react";
import { NavData, NavItem } from "../types/nav";
import { Role } from "@/modules/dashboard/configuration/config/role";

export const navData: NavData = {
  navMain: [
    {
      title: "Configuración",
      url: "/configuracion/menu",
      icon: Settings,
      isActive: true,
      allowedRoles: [Role.SAdmin, Role.Admin], // Solo los admins pueden ver esto
      items: [
        {
          title: "Grupos",
          url: "/dashboard/configuracion/grupos",
          allowedRoles: [Role.SAdmin, Role.Admin],
        },
        {
          title: "Productos",
          url: "/dashboard/configuracion/productos",
          allowedRoles: [Role.SAdmin, Role.Admin, Role.Cajero],
        },
        {
          title: "Usuarios",
          url: "/dashboard/configuracion/usuarios",
          allowedRoles: [Role.SAdmin, Role.Admin],
        },
      ],
    },
    {
      title: "Pedidos",
      url: "#",
      icon: HandPlatter,
      allowedRoles: [Role.SAdmin, Role.Admin, Role.Mesero],
      items: [
        {
          title: "Gestión de Pedidos",
          url: "#",
          allowedRoles: [Role.SAdmin, Role.Admin, Role.Mesero],
        },
      ],
    },
    {
      title: "Cocina",
      url: "#",
      icon: Utensils,
      allowedRoles: [Role.SAdmin, Role.Admin, Role.Cocinero],
      items: [
        {
          title: "Pedidos",
          url: "#",
          allowedRoles: [Role.SAdmin, Role.Admin, Role.Cocinero],
        },
      ],
    },
  ],
  navSecondary: [],
  projects: [],
};

export const generateRouteMap = (
  navMain: NavItem[],
): { [key: string]: string } => {
  const map: { [key: string]: string } = {};
  navMain.forEach((item: NavItem) => {
    const key = item.url.split("/").pop();
    if (key) {
      map[key] = item.title;
    }
    if (item.items) {
      item.items.forEach((subItem: NavItem) => {
        const subKey = subItem.url.split("/").pop();
        if (subKey) {
          map[subKey] = subItem.title;
        }
      });
    }
  });
  return map;
};
