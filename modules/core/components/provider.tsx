import { ThemeProvider } from "./theme-provider";

export default function Provider({ children }: React.PropsWithChildren<{}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
