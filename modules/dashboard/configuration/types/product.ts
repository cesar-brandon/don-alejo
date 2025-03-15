import { Tables } from "@/modules/core/types/database.types";

export type ProductWithGroup = Tables<"product"> & {
  product_group: {
    name: string;
  };
};
