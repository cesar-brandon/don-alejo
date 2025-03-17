import { Tables } from "@/modules/core/types/database.types";

export type Product = Tables<"product">;

export type SelectedProduct = {
  id: string;
  name: string;
  price: number;
  stock: number;
};
