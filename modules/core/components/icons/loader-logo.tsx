import { cn } from "../../lib/utils";
import LogoIcon from "./logo-icon";

interface LoaderLogoProps {
  className?: string;
}

export default function LoaderLogo({ className }: LoaderLogoProps) {
  return (
    <div className={cn("w-20 h-20", className)}>
      <LogoIcon />
    </div>
  );
}
