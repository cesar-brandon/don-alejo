import { BarChartMultiple } from "@/modules/auth/components/chart/bar-chart-multiple";
import { RadialChatText } from "@/modules/auth/components/chart/radial-chart-text";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <RadialChatText />
        <BarChartMultiple />
        <div className="w-full h-full aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
