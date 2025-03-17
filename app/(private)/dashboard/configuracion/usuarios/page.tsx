import { createClient } from "@/modules/core/lib/supabase/server";
import ProfileFormModal from "@/modules/dashboard/configuration/components/profile/form";
import ProfileList from "@/modules/dashboard/configuration/components/profile/list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usuarios",
  description: "Configuración de los usuarios",
};

export default async function MenuPage() {
  const supabase = await createClient();
  const { data: profiles, error } = await supabase
    .from("profile")
    .select()
    .neq("role", "sadmin");

  if (error) {
    return (
      <div className="h-full flex flex-1 flex-col space-y-8 p-8">
        <div className="sm:flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Usuarios</h2>
            <p className="text-muted-foreground">
              Configuración de los usuarios
            </p>
          </div>
        </div>
        <div>error al cargar los usuarios</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-1 flex-col space-y-8 p-8">
      <div className="sm:flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Usuarios</h2>
          <p className="text-muted-foreground">Configuración de los usuarios</p>
        </div>
        <div>
          <ProfileFormModal />
        </div>
      </div>
      <ProfileList initialData={profiles} />
    </div>
  );
}
