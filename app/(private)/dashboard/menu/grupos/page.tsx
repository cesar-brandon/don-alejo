import ProductGroupForm from "@/configuration/components/product-group/form";
import ProductGroupList from "@/configuration/components/product-group/list";
import { createClient } from "@/modules/core/lib/supabase/server";

export default async function ProductGroupPage() {
  const supabase = await createClient();

  const { data: groups, error } = await supabase
    .from("product_group")
    .select("*, product_count:product(count)")
    .eq("state", 1);

  console.log(groups);

  return (
    <div className="h-full flex flex-1 flex-col space-y-8 p-8">
      <div className="sm:flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Grupos de productos
          </h2>
          <p className="text-muted-foreground">
            Configuración de los grupos de productos
          </p>
        </div>
        <div>
          <ProductGroupForm />
        </div>
      </div>
      {error ? (
        <div>Error al cargar los grupos de productos</div>
      ) : (
        <ProductGroupList initialData={groups} />
      )}
    </div>
  );
}
