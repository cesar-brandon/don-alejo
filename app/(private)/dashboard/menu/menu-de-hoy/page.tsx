import ProductForm from "@/configuration/components/product/form";
import ProductList from "@/configuration/components/product/list";
import { createClient } from "@/modules/core/lib/supabase/server";

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
          <h2 className="text-2xl font-bold tracking-tight">Productos</h2>
          <p className="text-muted-foreground">
            Configuración de los productos
          </p>
        </div>
        <div>
          <ProductForm />
        </div>
      </div>
      {error ? (
        <div>error al cargar los productos</div>
      ) : (
        <ProductList initialData={products} />
      )}
    </div>
  );
}
