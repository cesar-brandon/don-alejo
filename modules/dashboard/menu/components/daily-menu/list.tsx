"use client";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/modules/core/lib/supabase/client";
import { toast } from "sonner";
import { DailyMenuDataTable } from "./datatable";
import { Tables } from "@/modules/core/types/database.types";

const fetchMenus = async (): Promise<Tables<"menu_day">[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("menu_day")
    .select()
    .eq("state", 1);
  if (error) {
    toast.error("Error al cargar los grupos de productos");
    return [];
  }
  return data;
};

export default function DailyMenuList({
  initialData,
}: {
  initialData: Tables<"menu_day">[];
}) {
  const { data: groups } = useQuery<Tables<"menu_day">[]>({
    queryKey: ["menu_day"],
    queryFn: fetchMenus,
    initialData: initialData,
  });

  return (
    <div className="px-6">
      <DailyMenuDataTable data={groups} />
    </div>
  );
}
