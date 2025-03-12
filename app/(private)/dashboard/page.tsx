import { RadialChatText } from "@/modules/core/components/chart/radial-chart-text";
import { Skeleton } from "@/modules/core/components/ui/skeleton";
import { RecentOrders } from "@/modules/dashboard/home/components/recent-orders";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  return (
    <div className="grid grid-cols-6 grid-rows-8 gap-4">
      <div className="col-span-2 row-span-8 col-start-1 row-start-1">
        <div className="flex flex-col gap-4">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por estado de la mesa" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Estado de la Mesa</SelectLabel>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="occupied">Ocupada</SelectItem>
                <SelectItem value="free">Libre</SelectItem>
                <SelectItem value="reserved">Reservada</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="grid grid-cols-2 grid-rows-4 gap-4">
            <div>
              <Skeleton className="w-full h-44" />
            </div>
            <div className="col-start-2 row-start-2">
              <Skeleton className="w-full h-44" />
            </div>
            <div className="col-start-1 row-start-2">
              <Skeleton className="w-full h-44" />
            </div>
            <div className="col-start-2 row-start-1">
              <Skeleton className="w-full h-44" />
            </div>
            <div className="col-start-2 row-start-3">
              <Skeleton className="w-full h-44" />
            </div>
            <div className="col-start-1 row-start-3">
              <Skeleton className="w-full h-44" />
            </div>
            <div>
              <Skeleton className="w-full h-44" />
            </div>
            <div>
              <Skeleton className="w-full h-44" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 row-span-8 col-start-3 row-start-1">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="col-span-2 row-span-4 col-start-5 row-start-1">
        <RadialChatText />
      </div>
      <div className="col-span-2 row-span-4 col-start-5 row-start-5">
        <RecentOrders />
      </div>
    </div>
  );
}
