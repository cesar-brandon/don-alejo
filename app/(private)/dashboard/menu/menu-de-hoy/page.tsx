import { createClient } from "@/modules/core/lib/supabase/server";
import DailyMenuForm from "@/modules/dashboard/menu/components/daily-menu/form";
import DailyMenuList from "@/modules/dashboard/menu/components/daily-menu/list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menú de Hoy",
  description: "Configuración del menú de hoy",
};

export default async function MenuPage() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from("menu_day")
    .select()
    .eq("state", 1);

  return (
    <div className="h-full flex flex-1 flex-col space-y-8 p-8">
      <div className="sm:flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Menú de Hoy</h2>
          <p className="text-muted-foreground">Configuración del menú de hoy</p>
        </div>
        <div>
          <DailyMenuForm />
        </div>
      </div>
      {error ? (
        <div>error al cargar los productos</div>
      ) : (
        <DailyMenuList initialData={products} />
      )}
    </div>
  );
}
