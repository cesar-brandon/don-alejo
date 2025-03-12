"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { TableStatus } from "../../types/table";

interface TableFilterProps {
  selectedStatus: TableStatus | "all";
  onStatusChange: (status: TableStatus | "all") => void;
}

export default function TableFilter({
  selectedStatus,
  onStatusChange,
}: TableFilterProps) {
  const filters: Array<{ value: TableStatus | "all"; label: string }> = [
    { value: "all", label: "Todas las Mesas" },
    { value: TableStatus.Available, label: "Disponibles" },
    { value: TableStatus.Occupied, label: "Ocupadas" },
    { value: TableStatus.Reserved, label: "Reservadas" },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={selectedStatus === filter.value ? "default" : "outline"}
          size="sm"
          onClick={() => onStatusChange(filter.value)}
          className={
            selectedStatus === filter.value
              ? filter.value === TableStatus.Available
                ? "bg-emerald-600 hover:bg-emerald-700"
                : filter.value === TableStatus.Occupied
                  ? "bg-rose-600 hover:bg-rose-700"
                  : filter.value === TableStatus.Reserved
                    ? "bg-amber-600 hover:bg-amber-700"
                    : ""
              : ""
          }
        >
          {filter.value === selectedStatus && (
            <Check className="mr-1 h-4 w-4" />
          )}
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
