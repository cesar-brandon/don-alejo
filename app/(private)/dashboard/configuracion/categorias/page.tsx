import CategoryForm from "@/modules/configuration/components/category/form";
import { DataTableCategorias } from "@/modules/dashboard/components/data-table/data-table-demo";

export default function CategoryPage() {
  return (
    <div className="h-full flex flex-1 flex-col space-y-8 p-8">
      <div className="sm:flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Categorias</h2>
          <p className="text-muted-foreground">Configuración de categorias</p>
        </div>
        <div>
          <CategoryForm />
        </div>
      </div>
      <DataTableCategorias />
    </div>
  );
}
