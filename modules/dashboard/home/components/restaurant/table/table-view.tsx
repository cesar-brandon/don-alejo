"use client";

import { cn } from "@/modules/core/lib/utils";
import { useState } from "react";

export interface TableData {
  id: number;
  name: string;
  capacity: number;
  shape: "rectangle" | "square" | "round";
  status: "available" | "occupied" | "reserved";
  width: number;
  length: number;
  location: string;
  lastCleaned?: string;
  reservationInfo?: {
    name: string;
    time: string;
    guests: number;
    phone: string;
  };
}

interface TableViewProps {
  table: TableData;
  selected: boolean;
  onClick: (table: TableData) => void;
}

export default function TableView({
  table,
  selected,
  onClick,
}: TableViewProps) {
  const [isHovered, setIsHovered] = useState(false);

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

  // Calculate dimensions for the table
  const tableWidth = 80; // Fixed width for all tables
  const tableHeight = 120; // Fixed height for all tables

  // Calculate dimensions for chairs
  const chairWidth = 16;
  const chairHeight = 30;
  const chairMargin = 4;

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
          className={cn(
            "absolute border rounded-sm transition-all",
            getChairStatusStyles(),
            selected && "border-blue-400 dark:border-blue-500",
          )}
          style={{
            width: `${chairWidth}px`,
            height: `${chairHeight}px`,
            left: `-${chairWidth + 2}px`,
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
          className={cn(
            "absolute border rounded-sm transition-all",
            getChairStatusStyles(),
            selected && "border-blue-400 dark:border-blue-500",
          )}
          style={{
            width: `${chairWidth}px`,
            height: `${chairHeight}px`,
            right: `-${chairWidth + 2}px`,
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
            className={cn(
              "absolute border rounded-sm transition-all",
              getChairStatusStyles(),
              selected && "border-blue-400 dark:border-blue-500",
            )}
            style={{
              width: `${chairHeight}px`, // Swap dimensions for horizontal chairs
              height: `${chairWidth}px`,
              top: `-${chairWidth + 2}px`,
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
            className={cn(
              "absolute border rounded-sm transition-all",
              getChairStatusStyles(),
              selected && "border-blue-400 dark:border-blue-500",
            )}
            style={{
              width: `${chairHeight}px`, // Swap dimensions for horizontal chairs
              height: `${chairWidth}px`,
              bottom: `-${chairWidth + 2}px`,
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
      className={cn(
        "relative mx-auto cursor-pointer transition-all",
        selected ? "scale-105" : "hover:scale-102",
      )}
      style={{ width: `${tableWidth + 60}px`, height: `${tableHeight + 60}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(table)}
    >
      {/* Table */}
      <div
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border rounded-md flex items-center justify-center shadow-sm",
          getTableStatusStyles(),
          selected && "ring-2 ring-blue-500 dark:ring-blue-400",
          isHovered && !selected && "ring-1 ring-gray-300 dark:ring-gray-600",
        )}
        style={{
          width: `${tableWidth}px`,
          height: `${tableHeight}px`,
        }}
      >
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {table.name}
        </span>
      </div>

      {/* Chairs */}
      {generateChairs()}

      {/* Hover tooltip */}
      {isHovered && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-white dark:bg-gray-800 text-xs rounded shadow-md border z-10 whitespace-nowrap">
          {table.name} - {table.capacity} seats
        </div>
      )}
    </div>
  );
}
