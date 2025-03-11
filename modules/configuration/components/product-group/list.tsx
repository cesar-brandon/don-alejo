"use client";
import { Tables } from "@/modules/core/types/database.types";
import { ProductGroupDataTable } from "./datatable";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/modules/core/lib/supabase/client";
import { toast } from "sonner";

const fetchGroups = async (): Promise<Tables<"product_group">[]> => {
  const supabase = createClient();
  const { data, error } = await supabase.from("product_group").select();
  if (error) {
    toast.error("Error al cargar los grupos de productos");
    return [];
  }
  return data;
};

export default function ProductGroupList({
  initialData,
}: {
  initialData: Tables<"product_group">[];
}) {
  const { data: groups } = useQuery<Tables<"product_group">[]>({
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
