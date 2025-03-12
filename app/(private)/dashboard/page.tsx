import { RadialChatText } from "@/modules/core/components/chart/radial-chart-text";
import { Skeleton } from "@/modules/core/components/ui/skeleton";
import { RecentSales } from "@/modules/dashboard/home/components/recent-orders";
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
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
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
        <RecentSales />
      </div>
    </div>
  );
}
