import { ArrowRight, Pencil, Navigation } from "lucide-react";
import type { RouteResult } from "@/lib/directions";
import RouteSummaryCard from "./RouteSummaryCard";

interface RouteHeaderProps {
  originName?: string;
  destinationName?: string;
  route: RouteResult | null;
  onEdit: () => void;
  onStartNavigation?: () => void;
}

export default function RouteHeader({
  originName,
  destinationName,
  route,
  onEdit,
  onStartNavigation,
}: RouteHeaderProps) {
  return (
    <div className="px-4 py-3 flex flex-col gap-3 shrink-0 border-b border-slate-100">
      {/* Origin → Destination summary + edit button */}
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-800 truncate">
            {originName}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
            <ArrowRight size={11} className="shrink-0" />
            <p className="truncate">{destinationName}</p>
          </div>
        </div>
        <button
          onClick={onEdit}
          title="Edit route"
          className="w-8 h-8 shrink-0 flex items-center justify-center rounded-2xl hover:bg-slate-100 active:bg-slate-200 transition-colors text-slate-400 hover:text-slate-600"
        >
          <Pencil size={14} />
        </button>
      </div>

      {/* ETA / distance badge */}
      {route && <RouteSummaryCard route={route} />}

      {/* Start Navigation — only shown when a route is ready */}
      {route && onStartNavigation && (
        <button
          onClick={onStartNavigation}
          className="w-full py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <Navigation size={15} />
          Start Navigation
        </button>
      )}
    </div>
  );
}
