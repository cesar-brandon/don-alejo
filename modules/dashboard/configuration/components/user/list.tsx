"use client";
import { Tables } from "@/modules/core/types/database.types";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/modules/core/lib/supabase/client";
import { toast } from "sonner";
import { ProductDataTable } from "./datatable";

const fetchGroups = async (): Promise<Tables<"product">[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("product")
    .select()
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
  initialData: Tables<"product">[];
}) {
  const { data: groups } = useQuery<Tables<"product">[]>({
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
