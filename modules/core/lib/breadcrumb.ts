import {
  Frame,
  HandPlatter,
  Map,
  PieChart,
  Settings,
  Utensils,
} from "lucide-react";
import { NavData, NavItem } from "../types/nav";

export const navData: NavData = {
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
          title: "Grupos",
          url: "/dashboard/configuracion/grupos",
        },
        {
          title: "Productos",
          url: "/dashboard/configuracion/productos",
        },
        {
          title: "Roles",
          url: "#",
        },
        {
          title: "Usuarios",
          url: "#",
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
