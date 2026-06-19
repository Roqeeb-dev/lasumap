import { MapPin } from "lucide-react";
import type { RouteResult } from "@/lib/directions";
import { formatETA, formatDistance } from "@/lib/directions";

interface RouteSummaryCardProps {
  route: RouteResult;
}

export default function RouteSummaryCard({ route }: RouteSummaryCardProps) {
  return (
    <div className="px-4 py-3 bg-blue-50/80 rounded-2xl flex items-center justify-between border border-blue-100">
      <div className="flex items-center gap-3">
        <MapPin size={15} className="text-blue-500" />
        <div>
          <p className="text-sm font-semibold text-blue-700">
            {formatETA(route.duration)}
          </p>
          <p className="text-xs text-blue-400">
            {formatDistance(route.distance)}
          </p>
        </div>
      </div>
      <span className="text-xs font-medium text-blue-500 bg-white px-3 py-1 rounded-xl shadow-sm">
        {route.steps.length} steps
      </span>
    </div>
  );
}
