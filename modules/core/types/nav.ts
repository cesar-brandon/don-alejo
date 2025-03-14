import { Role } from "@/modules/dashboard/configuration/config/role";
import { type LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavItem[];
  allowedRoles?: Role[];
}

interface Project {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface NavData {
  navMain: NavItem[];
  navSecondary: NavItem[];
  projects: Project[];
}
