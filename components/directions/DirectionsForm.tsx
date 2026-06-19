import { Navigation, Loader2, ArrowRight } from "lucide-react";
import type { Feature } from "@/types/buildings";

interface DirectionsFormProps {
  buildings: Feature[];
  origin: string;
  destination: string;
  loading: boolean;
  onOriginChange: (id: string) => void;
  onDestinationChange: (id: string) => void;
  onSubmit: () => void;
}

export default function DirectionsForm({
  buildings,
  origin,
  destination,
  loading,
  onOriginChange,
  onDestinationChange,
  onSubmit,
}: DirectionsFormProps) {
  return (
    <div className="p-4 flex flex-col gap-4 shrink-0">
      {/* From */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-500">From</label>
        <select
          value={origin}
          onChange={(e) => onOriginChange(e.target.value)}
          className="w-full text-sm px-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all"
        >
          <option value="">Select origin building...</option>
          {buildings.map((b) => (
            <option key={b.properties.id} value={b.properties.id}>
              {b.properties.name}
            </option>
          ))}
        </select>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-slate-100" />
        <ArrowRight size={14} className="text-slate-400" />
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      {/* To */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-500">To</label>
        <select
          value={destination}
          onChange={(e) => onDestinationChange(e.target.value)}
          className="w-full text-sm px-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all"
        >
          <option value="">Select destination building...</option>
          {buildings.map((b) => (
            <option key={b.properties.id} value={b.properties.id}>
              {b.properties.name}
            </option>
          ))}
        </select>
      </div>

      {/* Get Directions Button */}
      <button
        onClick={onSubmit}
        disabled={!origin || !destination || loading}
        className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Calculating route...
          </>
        ) : (
          <>
            <Navigation size={16} />
            Get Directions
          </>
        )}
      </button>
    </div>
  );
}
