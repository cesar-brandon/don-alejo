import type { TableData } from "./table-view";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Clock, CalendarClock, Phone } from "lucide-react";

interface TableDetailsProps {
  table: TableData | null;
}

export default function TableDetails({ table }: TableDetailsProps) {
  // Status badge styling
  const getStatusBadge = () => {
    if (!table) return null;

    switch (table.status) {
      case "available":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/50"
          >
            Disponible
          </Badge>
        );
      case "occupied":
        return (
          <Badge
            variant="outline"
            className="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800/50"
          >
            Ocupado
          </Badge>
        );
      case "reserved":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/50"
          >
            Reservado
          </Badge>
        );
      default:
        return null;
    }
  };

  // Visual representation of the table with rectangular chairs
  const TableVisual = () => {
    if (!table) return null;

    // Fixed dimensions for the visual
    const tableWidth = 120;
    const tableHeight = 180;
    const chairWidth = 24;
    const chairHeight = 40;
    const chairMargin = 6;

    // Get status-based styling for the table
    const getTableStatusStyles = () => {
      switch (table.status) {
        case "available":
          return "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800/50";
        case "occupied":
          return "bg-rose-50 border-rose-200 dark:bg-rose-950/30 dark:border-rose-800/50";
        case "reserved":
          return "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800/50";
        default:
          return "bg-gray-50 border-gray-200 dark:bg-gray-800/30 dark:border-gray-700/50";
      }
    };

    // Get status-based styling for the chairs
    const getChairStatusStyles = () => {
      switch (table.status) {
        case "available":
          return "bg-emerald-100 border-emerald-300 dark:bg-emerald-900/30 dark:border-emerald-700/50";
        case "occupied":
          return "bg-rose-100 border-rose-300 dark:bg-rose-900/30 dark:border-rose-700/50";
        case "reserved":
          return "bg-amber-100 border-amber-300 dark:bg-amber-900/30 dark:border-amber-700/50";
        default:
          return "bg-gray-100 border-gray-300 dark:bg-gray-700/30 dark:border-gray-600/50";
      }
    };

    // Generate rectangular chairs around the table
    const generateChairs = () => {
      const chairs = [];
      let remainingChairs = table.capacity;

      // Calculate how many chairs we need on each side
      // We'll prioritize putting chairs on the long sides (left and right)
      const maxChairsPerLongSide = Math.floor(
        tableHeight / (chairHeight + chairMargin),
      );
      const chairsPerLongSide = Math.min(
        Math.ceil(remainingChairs / 2),
        maxChairsPerLongSide,
      );

      remainingChairs -= chairsPerLongSide * 2; // Subtract chairs for both long sides

      // Calculate chairs for short sides if needed
      const maxChairsPerShortSide = Math.floor(
        tableWidth / (chairWidth + chairMargin),
      );
      const chairsPerShortSide = Math.min(
        Math.ceil(remainingChairs / 2),
        maxChairsPerShortSide,
      );

      // Left side chairs (long side)
      for (let i = 0; i < chairsPerLongSide; i++) {
        const position =
          (tableHeight -
            (chairsPerLongSide * (chairHeight + chairMargin) - chairMargin)) /
            2 +
          i * (chairHeight + chairMargin);
        chairs.push(
          <div
            key={`left-${i}`}
            className={`absolute border rounded-sm ${getChairStatusStyles()}`}
            style={{
              width: `${chairWidth}px`,
              height: `${chairHeight}px`,
              left: `-${chairWidth + 3}px`,
              top: `${position}px`,
            }}
          />,
        );
      }

      // Right side chairs (long side)
      for (let i = 0; i < chairsPerLongSide; i++) {
        const position =
          (tableHeight -
            (chairsPerLongSide * (chairHeight + chairMargin) - chairMargin)) /
            2 +
          i * (chairHeight + chairMargin);
        chairs.push(
          <div
            key={`right-${i}`}
            className={`absolute border rounded-sm ${getChairStatusStyles()}`}
            style={{
              width: `${chairWidth}px`,
              height: `${chairHeight}px`,
              right: `-${chairWidth + 3}px`,
              top: `${position}px`,
            }}
          />,
        );
      }

      // Top side chairs (short side) if needed
      if (remainingChairs > 0) {
        for (let i = 0; i < chairsPerShortSide; i++) {
          const position =
            (tableWidth -
              (chairsPerShortSide * (chairWidth + chairMargin) - chairMargin)) /
              2 +
            i * (chairWidth + chairMargin);
          chairs.push(
            <div
              key={`top-${i}`}
              className={`absolute border rounded-sm ${getChairStatusStyles()}`}
              style={{
                width: `${chairHeight}px`, // Swap dimensions for horizontal chairs
                height: `${chairWidth}px`,
                top: `-${chairWidth + 3}px`,
                left: `${position}px`,
              }}
            />,
          );
        }

        // Bottom side chairs (short side)
        for (let i = 0; i < chairsPerShortSide; i++) {
          const position =
            (tableWidth -
              (chairsPerShortSide * (chairWidth + chairMargin) - chairMargin)) /
              2 +
            i * (chairWidth + chairMargin);
          chairs.push(
            <div
              key={`bottom-${i}`}
              className={`absolute border rounded-sm ${getChairStatusStyles()}`}
              style={{
                width: `${chairHeight}px`, // Swap dimensions for horizontal chairs
                height: `${chairWidth}px`,
                bottom: `-${chairWidth + 3}px`,
                left: `${position}px`,
              }}
            />,
          );
        }
      }

      return chairs;
    };

    return (
      <div
        className="relative flex justify-center my-8"
        style={{ height: `${tableHeight + 100}px` }}
      >
        <div className="relative">
          {/* Table */}
          <div
            className={`border rounded-md flex items-center justify-center shadow-sm ${getTableStatusStyles()}`}
            style={{
              width: `${tableWidth}px`,
              height: `${tableHeight}px`,
            }}
          >
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {table.name}
            </span>
          </div>

          {/* Chairs */}
          {generateChairs()}
        </div>
      </div>
    );
  };

  if (!table) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Table Details</CardTitle>
          <CardDescription>Select a table to view details</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px] text-gray-400">
          No table selected
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{table.name}</CardTitle>
            <CardDescription>Table Information</CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <TableVisual />

        <div className="space-y-4 mt-6">
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-3 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Capacity</p>
              <p className="text-sm text-gray-500">{table.capacity} people</p>
            </div>
          </div>

          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-3 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm text-gray-500">{table.location}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-3 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Last Cleaned</p>
              <p className="text-sm text-gray-500">
                {table.lastCleaned || "Not recorded"}
              </p>
            </div>
          </div>

          {table.status === "reserved" && table.reservationInfo && (
            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800/50">
              <h3 className="text-sm font-medium mb-2">Reservation Details</h3>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-amber-700 dark:text-amber-400" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {table.reservationInfo.name} ({table.reservationInfo.guests}{" "}
                    guests)
                  </p>
                </div>

                <div className="flex items-center">
                  <CalendarClock className="h-4 w-4 mr-2 text-amber-700 dark:text-amber-400" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {table.reservationInfo.time}
                  </p>
                </div>

                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-amber-700 dark:text-amber-400" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {table.reservationInfo.phone}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
