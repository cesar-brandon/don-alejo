import {
  Frame,
  HandPlatter,
  Map,
  PieChart,
  Settings,
  Utensils,
} from "lucide-react";

export const navData = {
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

export const generateRouteMap = (navMain: any[]) => {
  const map: { [key: string]: any } = {};
  navMain.forEach((item: { url: string; title: any; items: any[] }) => {
    const key = item.url.split("/").pop();
    if (key) {
      map[key] = item.title;
    }
    if (item.items) {
      item.items.forEach((subItem: { url: string; title: any }) => {
        const subKey = subItem.url.split("/").pop();
        if (subKey) {
          map[subKey] = subItem.title;
        }
      });
    }
  });
  return map;
};
