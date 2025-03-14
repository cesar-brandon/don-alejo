import { TableShape, TableStatus } from "../config/table";

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
