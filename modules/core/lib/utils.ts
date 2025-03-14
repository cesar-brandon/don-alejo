import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(firstName: string, lastName: string): string {
  if (!firstName || !lastName) return "";
  const firstInitials = firstName.slice(0, 1).toUpperCase();
  const lastInitials = lastName.slice(0, 1).toUpperCase();
  return firstInitials + lastInitials;
}
