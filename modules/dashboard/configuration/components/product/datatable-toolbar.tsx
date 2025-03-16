"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/modules/core/lib/supabase/client";
import { Skeleton } from "@/modules/core/components/ui/skeleton";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
}: DataTableToolbarProps<TData> & {
  globalFilter: string;
  setGlobalFilter: (filter: string) => void;
}) {
  const supabase = createClient();
  const isFiltered = table.getState().columnFilters.length > 0;

  const { data: groups = [], isPending: isPendingGroups } = useQuery({
    queryKey: ["product_group"],
    queryFn: async () => {
      const { data, error } = await supabase.from("product_group").select();
      if (error) return [];
      return data.map((group) => ({
        value: group.name,
        label: group.name,
        icon: group.icon,
      }));
    },
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Buscar por palabra clave"
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.currentTarget.value ?? "")}
          className="max-w-sm py-6"
        />
        {isPendingGroups ? (
          <Skeleton className="h-8 w-full" />
        ) : (
          table.getColumn("product_group_name") && (
            <DataTableFacetedFilter
              column={table.getColumn("product_group_name")}
              title="Grupo"
              options={groups}
            />
          )
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
