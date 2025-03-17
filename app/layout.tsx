import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/modules/core/components/provider";
import { appConfig } from "@/modules/core/config/app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
export const metadata: Metadata = {
  metadataBase: new URL(appConfig.url),
  title: {
    default: appConfig.name,
    template: `%s - ${appConfig.name}`,
  },
  description: appConfig.description,
  keywords: [
    "restaurante",
    "comida",
    "Don Alejo",
    "reservas",
    "menú",
    "gastronomía",
    "cena",
    "almuerzo",
    "desayuno",
    "comida peruana",
  ],
  authors: [
    {
      name: "Cesar Brandon",
      url: "https://cesarbrandon.vercel.app/",
    },
  ],
  creator: "Cesar Brandon",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: appConfig.url,
    title: appConfig.name,
    description: appConfig.description,
    siteName: appConfig.name,
    images: [{ url: `${appConfig.url}/og.png` }],
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.name,
    description: appConfig.description,
    images: [`${appConfig.url}/og.png`],
    creator: "@burando_03",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
