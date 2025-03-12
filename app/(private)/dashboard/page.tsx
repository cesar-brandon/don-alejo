"use client";
import { RecentOrders } from "@/modules/dashboard/home/components/recent-orders";
import { SalesChart } from "@/modules/dashboard/home/components/sales-chart";
import { useState } from "react";
import { TableData } from "@/modules/dashboard/home/components/restaurant/table/table-view";
import TableList from "@/modules/dashboard/home/components/restaurant/table/table-list";
import TableDetails from "@/modules/dashboard/home/components/restaurant/table/table-details";
import TableFilter, {
  TableStatus,
} from "@/modules/dashboard/home/components/restaurant/table-filter";

export default function Page() {
  const [selectedStatus, setSelectedStatus] = useState<TableStatus | "all">(
    "all",
  );
  const [tables] = useState<TableData[]>([
    {
      id: 1,
      name: "T1",
      capacity: 4,
      shape: "rectangle",
      status: "available",
      width: 2,
      length: 3,
      location: "Main Floor - Window",
      lastCleaned: "Today, 10:30 AM",
    },
    {
      id: 2,
      name: "T2",
      capacity: 2,
      shape: "rectangle",
      status: "occupied",
      width: 1,
      length: 2,
      location: "Main Floor - Bar",
      lastCleaned: "Today, 11:45 AM",
    },
    {
      id: 3,
      name: "T3",
      capacity: 6,
      shape: "rectangle",
      status: "reserved",
      width: 2,
      length: 4,
      location: "Main Floor - Center",
      lastCleaned: "Today, 9:15 AM",
      reservationInfo: {
        name: "Johnson Family",
        time: "Today, 7:30 PM",
        guests: 5,
        phone: "(555) 123-4567",
      },
    },
    {
      id: 4,
      name: "T4",
      capacity: 8,
      shape: "rectangle",
      status: "available",
      width: 2,
      length: 5,
      location: "Main Floor - Back",
      lastCleaned: "Today, 12:00 PM",
    },
    {
      id: 5,
      name: "T5",
      capacity: 4,
      shape: "square",
      status: "available",
      width: 2,
      length: 2,
      location: "Patio - North",
      lastCleaned: "Today, 11:00 AM",
    },
    {
      id: 6,
      name: "T6",
      capacity: 6,
      shape: "rectangle",
      status: "available",
      width: 3,
      length: 2,
      location: "Patio - South",
      lastCleaned: "Today, 12:00 PM",
    },
    {
      id: 7,
      name: "T7",
      capacity: 2,
      shape: "round",
      status: "occupied",
      width: 1,
      length: 1,
      location: "Indoor - East",
      lastCleaned: "Today, 1:00 PM",
    },
    {
      id: 8,
      name: "T8",
      capacity: 8,
      shape: "square",
      status: "reserved",
      width: 4,
      length: 4,
      location: "Indoor - West",
      lastCleaned: "Today, 2:00 PM",
    },
  ]);

  // State for selected table
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  // Find the selected table
  const selectedTable =
    tables.find((table) => table.id === selectedTableId) || null;

  // Handle table selection
  const handleTableSelect = (table: TableData) => {
    setSelectedTableId(table.id);
  };

  return (
    <div className="grid grid-cols-6 grid-rows-8 gap-4">
      <div className="col-span-2 row-span-8 col-start-1 row-start-1">
        <div className="flex flex-col p-6">
          <TableFilter
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />
          <TableList
            tables={tables}
            selectedTableId={selectedTableId}
            onTableSelect={handleTableSelect}
            className="col-span-2 row-span-8 w-full"
          />
        </div>
      </div>
      <div className="col-span-2 row-span-8 col-start-3 row-start-1">
        <TableDetails table={selectedTable} />
      </div>
      <div className="col-span-2 row-span-4 col-start-5 row-start-1">
        <SalesChart />
      </div>
      <div className="col-span-2 row-span-4 col-start-5 row-start-5">
        <RecentOrders />
      </div>
    </div>
  );
}
