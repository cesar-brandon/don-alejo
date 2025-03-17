import { Skeleton } from "@/modules/core/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="h-full flex flex-1 flex-col space-y-8 p-8">
      <div className="sm:flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Menú de Hoy</h2>
          <p className="text-muted-foreground">Configuración del menú de hoy</p>
        </div>
      </div>
      <Skeleton className="w-full h-[40rem]" />
    </div>
  );
}
