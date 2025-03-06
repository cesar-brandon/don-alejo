import LogoIcon from "./logo-icon";

interface LoaderLogoProps {
  className?: string;
}

export default function LoaderLogo({ className }: LoaderLogoProps) {
  return (
    <div className={className}>
      <LogoIcon />
    </div>
  );
}
