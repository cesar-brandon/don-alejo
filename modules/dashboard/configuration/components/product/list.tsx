"use client";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/modules/core/lib/supabase/client";
import { toast } from "sonner";
import { ProductDataTable } from "./datatable";
import { ProductWithGroup } from "../../types/product";

const fetchGroups = async (): Promise<ProductWithGroup[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("product")
    .select(
      `
      *,
      product_group(name)
    `,
    )
    .eq("state", 1);
  if (error) {
    toast.error("Error al cargar los grupos de productos");
    return [];
  }
  return data;
};

export default function ProductList({
  initialData,
}: {
  initialData: ProductWithGroup[];
}) {
  const { data: groups } = useQuery<ProductWithGroup[]>({
    queryKey: ["product"],
    queryFn: fetchGroups,
    initialData: initialData,
  });

  return (
    <div className="px-6">
      <ProductDataTable data={groups} />
    </div>
  );
}
