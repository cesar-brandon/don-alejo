import type { FooterItem, MainNavItem } from "@/modules/core/types/app";

export type AppConfig = typeof appConfig;

const links = {
  website: "https://donalejo.vercel.app/",
  facebook: "https://www.facebook.com/donalejo.chincha/",
  instagram: "https://www.instagram.com/donalejo.chincha/",
};

export const appConfig = {
  name: "Don Alejo",
  description: "Restaurante Don Alejo",
  url: "https://donalejo.vercel.app",
  ogImage: "https://donalejo.vercel.app/opengraph-image.png",
  mainNav: [
    {
      title: "Inicio",
      items: [
        {
          title: "Iniciar sesión",
          href: "/login",
          description: "Inicia sesión.",
          items: [],
        },
        // {
        //   title: "Registrarse",
        //   href: "/register",
        //   description: "Crea una cuenta nueva.",
        //   items: [],
        // },
        // {
        //   title: "Menú",
        //   href: "/menu",
        //   description: "Explora nuestro menú.",
        //   items: [],
        // },
        // {
        //   title: "Reservas",
        //   href: "/reservas",
        //   description: "Haz una reserva en nuestro restaurante.",
        //   items: [],
        // },
      ],
    },
  ] satisfies MainNavItem[],
  links,
  footerNav: [
    {
      title: "Social",
      items: [
        {
          title: "Facebook",
          href: links.facebook,
          external: true,
        },
        {
          title: "Instagram",
          href: links.instagram,
          external: true,
        },
      ],
    },
  ] satisfies FooterItem[],
};
