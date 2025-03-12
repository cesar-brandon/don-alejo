import { Skeleton } from "@/modules/core/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-6 grid-rows-8 gap-4">
      <div className="col-span-2 row-span-8 col-start-1 row-start-1">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-10" />
            ))}
          </div>

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
        <Skeleton className="w-full h-full" />
      </div>
      <div className="col-span-2 row-span-4 col-start-5 row-start-5">
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
}
