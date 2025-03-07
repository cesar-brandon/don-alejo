import { TailwindIndicator } from "./tailwind-indicator";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";

export default function Provider({ children }: React.PropsWithChildren<{}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster richColors />
      <TailwindIndicator />
    </ThemeProvider>
  );
}
