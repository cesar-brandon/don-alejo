"use client";
import { ProductGroupDataTable } from "./datatable";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/modules/core/lib/supabase/client";
import { toast } from "sonner";
import { ProductGroupWithCount } from "../../types/product-group";

const fetchGroups = async (): Promise<ProductGroupWithCount[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("product_group")
    .select("*, product_count:product(count)")
    .eq("state", 1);
  if (error) {
    toast.error("Error al cargar los grupos de productos");
    return [];
  }
  return data;
};

export default function ProductGroupList({
  initialData,
}: {
  initialData: ProductGroupWithCount[];
}) {
  const { data: groups } = useQuery<ProductGroupWithCount[]>({
    queryKey: ["product_group"],
    queryFn: fetchGroups,
    initialData: initialData,
  });

  return (
    <div className="px-6">
      <ProductGroupDataTable data={groups} />
    </div>
  );
}
