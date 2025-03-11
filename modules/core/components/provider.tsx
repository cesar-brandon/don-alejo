"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TailwindIndicator } from "./tailwind-indicator";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Toaster richColors />
      <TailwindIndicator />
    </ThemeProvider>
  );
}
