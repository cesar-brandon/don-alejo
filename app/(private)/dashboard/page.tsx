"use client";
import { RecentOrders } from "@/modules/dashboard/home/components/recent-orders";
import { SalesChart } from "@/modules/dashboard/home/components/sales-chart";
import { useState } from "react";
import TableList from "@/modules/dashboard/home/components/restaurant/table/table-list";
import TableDetails from "@/modules/dashboard/home/components/restaurant/table/table-details";
import TableFilter from "@/modules/dashboard/home/components/restaurant/table-filter";
import {
  TableData,
  TableShape,
  TableStatus,
} from "@/modules/dashboard/home/types/table";

export default function Page() {
  const [selectedStatus, setSelectedStatus] = useState<TableStatus | "all">(
    "all",
  );

  const [tables] = useState<TableData[]>([
    {
      id: 1,
      name: "M1",
      capacity: 4,
      shape: TableShape.Rectangle,
      status: TableStatus.Available,
      width: 2,
      length: 3,
      location: "Cerca de la Ventana",
      lastCleaned: "Hoy, 10:30 AM",
    },
    {
      id: 2,
      name: "M2",
      capacity: 2,
      shape: TableShape.Round,
      status: TableStatus.Occupied,
      width: 1,
      length: 2,
      location: "Cerca de la Barra",
      lastCleaned: "Hoy, 11:45 AM",
    },
    {
      id: 3,
      name: "M3",
      capacity: 6,
      shape: TableShape.Rectangle,
      status: TableStatus.Reserved,
      width: 2,
      length: 4,
      location: "Centro del Restaurante",
      lastCleaned: "Hoy, 9:15 AM",
      reservationInfo: {
        name: "Familia Casas",
        time: "Hoy, 7:30 PM",
        guests: 5,
        phone: "987654321",
      },
    },
    {
      id: 4,
      name: "M4",
      capacity: 8,
      shape: TableShape.Rectangle,
      status: TableStatus.Available,
      width: 2,
      length: 5,
      location: "Fondo del Restaurante",
      lastCleaned: "Hoy, 12:00 PM",
    },
    {
      id: 5,
      name: "M5",
      capacity: 4,
      shape: TableShape.Square,
      status: TableStatus.Available,
      width: 2,
      length: 2,
      location: "Patio Norte",
      lastCleaned: "Hoy, 11:00 AM",
    },
    {
      id: 6,
      name: "M6",
      capacity: 6,
      shape: TableShape.Rectangle,
      status: TableStatus.Available,
      width: 3,
      length: 2,
      location: "Patio Sur",
      lastCleaned: "Hoy, 12:00 PM",
    },
    {
      id: 7,
      name: "M7",
      capacity: 2,
      shape: TableShape.Round,
      status: TableStatus.Occupied,
      width: 1,
      length: 1,
      location: "Interior Este",
      lastCleaned: "Hoy, 1:00 PM",
    },
    {
      id: 8,
      name: "M8",
      capacity: 8,
      shape: TableShape.Square,
      status: TableStatus.Reserved,
      width: 4,
      length: 4,
      location: "Interior Oeste",
      lastCleaned: "Hoy, 2:00 PM",
    },
  ]);

  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  const selectedTable =
    tables.find((table) => table.id === selectedTableId) || null;

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
