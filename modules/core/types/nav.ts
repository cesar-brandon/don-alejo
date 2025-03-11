import { type LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavItem[];
}

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface Project {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface NavData {
  user: User;
  navMain: NavItem[];
  navSecondary: NavItem[];
  projects: Project[];
}
