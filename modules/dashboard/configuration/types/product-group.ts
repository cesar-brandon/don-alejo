import { Tables } from "@/modules/core/types/database.types";

type ProductGroup = Tables<"product_group">;

export type ProductGroupWithCount = ProductGroup & {
  product_count: [
    {
      count: number;
    }
  ];
};
