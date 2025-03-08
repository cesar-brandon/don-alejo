"use client";
import React, { useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/modules/core/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { generateRouteMap, navData } from "../utils/breadcrumb";

export default function BreadcrumbMain(
  props: React.ComponentProps<typeof Breadcrumb>
) {
  const paths = usePathname();
  const pathNames = useMemo(
    () => paths.split("/").filter((path) => path),
    [paths]
  );

  const routeMap = generateRouteMap(navData.navMain);

  return (
    <Breadcrumb {...props}>
      <BreadcrumbList>
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathNames.length - 1;
          const value = routeMap[link] || link.replace(/-/g, " ");

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem className="hidden md:block">
                {isLast ? (
                  <BreadcrumbPage>{value}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{value}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
