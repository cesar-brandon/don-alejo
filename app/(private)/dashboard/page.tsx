import { BarChartMultiple } from "@/modules/core/components/chart/bar-chart-multiple";
import { RadialChatText } from "@/modules/core/components/chart/radial-chart-text";
import { Skeleton } from "@/modules/core/components/ui/skeleton";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <RadialChatText />
        <BarChartMultiple />
        <Skeleton />
      </div>
      <Skeleton className="h-full" />
    </div>
  );
}
