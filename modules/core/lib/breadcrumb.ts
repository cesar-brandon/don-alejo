import { ChefHat, HandPlatter, Settings, Soup, Utensils } from "lucide-react";
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
          title: "Usuarios",
          url: "/dashboard/configuracion/usuarios",
          allowedRoles: [Role.SAdmin, Role.Admin],
        },
      ],
    },
    {
      title: "Menú",
      url: "/configuracion/menu",
      icon: Soup,
      isActive: true,
      allowedRoles: [Role.SAdmin, Role.Admin], // Solo los admins pueden ver esto
      items: [
        {
          title: "Grupos",
          url: "/dashboard/menu/grupos",
          allowedRoles: [Role.SAdmin, Role.Admin],
        },
        {
          title: "Productos",
          url: "/dashboard/menu/productos",
          allowedRoles: [Role.SAdmin, Role.Admin, Role.Cajero],
        },
        {
          title: "El menú de hoy",
          url: "/dashboard/menu/menu-de-hoy",
          allowedRoles: [Role.SAdmin, Role.Admin, Role.Cajero],
        },
      ],
    },
    {
      title: "Pedidos",
      url: "/dashboard/pedidos",
      icon: HandPlatter,
      allowedRoles: [Role.SAdmin, Role.Admin, Role.Mesero],
      items: [
        {
          title: "Gestión de Pedidos",
          // url: "/dashboard/pedidos/gestion",
          url: "#",
          allowedRoles: [Role.SAdmin, Role.Admin, Role.Mesero],
        },
      ],
    },
    {
      title: "Cocina",
      url: "/dashboard/cocina",
      icon: ChefHat,
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
  navMain: NavItem[]
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
