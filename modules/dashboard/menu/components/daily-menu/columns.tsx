import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tables } from "@/modules/core/types/database.types";
import DailyMenuForm from "./form";
import DeleteConfirmationDialog from "@/modules/dashboard/configuration/components/delete-confirmation-dialog";

export const dailyMenuColumns: ColumnDef<Tables<"menu_day">>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
      };
      return (
        <div className="ml-2">{`Menu del ${date.toLocaleDateString("es-PE", options)}`}</div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de creación
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "America/Lima",
      };
      return <div>{date.toLocaleString("es-PE", options)}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex items-center p-2 gap-2">
          <DailyMenuForm id={item.id} item={item} />
          <DeleteConfirmationDialog
            id={item.id}
            tableName="menu_day"
            queryKey="menu_day"
          />
        </div>
      );
    },
  },
];
