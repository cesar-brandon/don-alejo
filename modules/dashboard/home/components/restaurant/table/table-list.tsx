"use client";

import { cn } from "@/modules/core/lib/utils";
import TableView from "./table-view";
import { TableData } from "../../../types/table";

interface TableListProps {
  tables: TableData[];
  selectedTableId: number | null;
  onTableSelect: (table: TableData) => void;
  className?: string;
}

export default function TableList({
  tables,
  selectedTableId,
  onTableSelect,
  className,
}: TableListProps) {
  return (
    <div className={cn("h-full", className)}>
      <h2 className="text-lg font-medium mb-6">Mesas</h2>

      <div className="grid grid-cols-2 gap-4">
        {tables.map((table) => (
          <TableView
            key={table.id}
            table={table}
            selected={selectedTableId === table.id}
            onClick={onTableSelect}
          />
        ))}
      </div>
    </div>
  );
}
