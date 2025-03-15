"use client";
import { Tables } from "@/modules/core/types/database.types";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/modules/core/lib/supabase/client";
import { toast } from "sonner";
import { ProfileDataTable } from "./datatable";

const fetchProfiles = async (): Promise<Tables<"profile">[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profile")
    .select()
    .neq("role", "sadmin");

  if (error) {
    toast.error("Error al cargar los grupos de productos");
    return [];
  }
  return data;
};

export default function ProfileList({
  initialData,
}: {
  initialData: Tables<"profile">[];
}) {
  const { data: groups } = useQuery<Tables<"profile">[]>({
    queryKey: ["profile"],
    queryFn: fetchProfiles,
    initialData: initialData,
  });

  return (
    <div className="px-6">
      <ProfileDataTable data={groups} />
    </div>
  );
}
