import { ArrowRight, Pencil } from "lucide-react";
import type { RouteResult } from "@/lib/directions";
import RouteSummaryCard from "./RouteSummaryCard";

interface RouteHeaderCompactProps {
  originName?: string;
  destinationName?: string;
  route: RouteResult | null;
  onEdit: () => void;
}

export default function RouteHeader({
  originName,
  destinationName,
  route,
  onEdit,
}: RouteHeaderCompactProps) {
  return (
    <div className="px-4 py-3 flex flex-col gap-3 shrink-0 border-b border-slate-100">
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

      {route && <RouteSummaryCard route={route} />}
    </div>
  );
}
