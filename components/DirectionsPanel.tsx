import { useState } from "react";
import { Navigation, X, Loader2, MapPin, ArrowRight } from "lucide-react";
import type { Feature } from "@/types/buildings";
import type { RouteResult } from "@/lib/directions";
import { formatETA, formatDistance } from "@/lib/directions";

interface DirectionsPanelProps {
  buildings: Feature[];
  route: RouteResult | null;
  loading: boolean;
  onGetDirections: (origin: Feature, destination: Feature) => void;
  onClose: () => void;
}

export default function DirectionsPanel({
  buildings,
  route,
  loading,
  onGetDirections,
  onClose,
}: DirectionsPanelProps) {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

  const originFeature = buildings.find((b) => b.properties.id === origin);
  const destinationFeature = buildings.find(
    (b) => b.properties.id === destination,
  );

  return (
    <div className="absolute top-4 right-4 z-[1000] w-72 bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl shadow-black/10 border border-white/70 overflow-hidden flex flex-col max-h-[85vh]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-2">
          <Navigation size={16} className="text-blue-500" />
          <span className="text-sm font-semibold text-slate-900">
            Directions
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-2xl hover:bg-slate-100 active:bg-slate-200 transition-colors text-slate-400 hover:text-slate-600"
        >
          <X size={18} strokeWidth={3} />
        </button>
      </div>

      {/* Inputs */}
      <div className="p-4 flex flex-col gap-4 shrink-0">
        {/* From */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">From</label>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
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
            onChange={(e) => setDestination(e.target.value)}
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
          onClick={() => {
            if (originFeature && destinationFeature) {
              onGetDirections(originFeature, destinationFeature);
            }
          }}
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

        {/* Route Summary */}
        {route && (
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
        )}
      </div>

      {/* Steps List */}
      {route && route.steps.length > 0 && (
        <div className="overflow-y-auto flex-1 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-4 pt-4 pb-2">
            Step by step
          </p>
          <ul className="px-4 pb-6 space-y-4">
            {route.steps.map((step, i) => {
              const isLast = i === route.steps.length - 1;
              return (
                <li key={i} className="flex items-start gap-3">
                  {/* Step indicator */}
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className={`w-6 h-6 rounded-2xl flex items-center justify-center text-xs font-semibold transition-all
                        ${
                          isLast
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                    >
                      {isLast ? <MapPin size={13} /> : i + 1}
                    </div>
                    {!isLast && <div className="w-px h-5 bg-slate-200 mt-1" />}
                  </div>

                  {/* Instruction */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="text-sm text-slate-700 leading-snug">
                      {step.instruction}
                    </p>
                    {step.distance > 0 && (
                      <p className="text-xs text-slate-400 mt-1">
                        {formatDistance(step.distance)}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
