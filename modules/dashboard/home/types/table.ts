export enum TableShape {
  Rectangle = "rectangle",
  Square = "square",
  Round = "round",
}

export enum TableStatus {
  Available = "available",
  Occupied = "occupied",
  Reserved = "reserved",
}

export interface TableData {
  id: number;
  name: string;
  capacity: number;
  shape: TableShape;
  status: TableStatus;
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
