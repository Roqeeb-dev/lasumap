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

  const selectClass =
    "w-full text-sm px-3 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700";

  return (
    <div className="absolute top-4 right-4 z-[1000] w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col max-h-[85vh]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2">
          <Navigation size={15} className="text-blue-500" />
          <span className="text-sm font-semibold text-gray-800">
            Directions
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-gray-500 transition-colors"
        >
          <X size={15} />
        </button>
      </div>

      {/* Inputs */}
      <div className="p-4 flex flex-col gap-3 shrink-0">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 font-medium">From</label>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className={selectClass}
          >
            <option value="">Select origin...</option>
            {buildings.map((b) => (
              <option key={b.properties.id} value={b.properties.id}>
                {b.properties.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-100" />
          <ArrowRight size={12} className="text-gray-300" />
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 font-medium">To</label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={selectClass}
          >
            <option value="">Select destination...</option>
            {buildings.map((b) => (
              <option key={b.properties.id} value={b.properties.id}>
                {b.properties.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            if (originFeature && destinationFeature) {
              onGetDirections(originFeature, destinationFeature);
            }
          }}
          disabled={!origin || !destination || loading}
          className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50
            disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors
            flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Getting route...
            </>
          ) : (
            <>
              <Navigation size={14} />
              Get Directions
            </>
          )}
        </button>

        {/* Summary bar */}
        {route && (
          <div className="p-3 bg-blue-50 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-blue-500" />
              <div>
                <p className="text-xs font-semibold text-blue-700">
                  {formatETA(route.duration)}
                </p>
                <p className="text-[10px] text-blue-400">
                  {formatDistance(route.distance)}
                </p>
              </div>
            </div>
            <span className="text-[10px] text-blue-400">
              {route.steps.length} steps
            </span>
          </div>
        )}
      </div>

      {/* Steps list — scrollable */}
      {route && route.steps.length > 0 && (
        <div className="overflow-y-auto flex-1 border-t border-gray-100">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide px-4 pt-3 pb-1">
            Step by step
          </p>
          <ul className="pb-4">
            {route.steps.map((step, i) => {
              const isLast = i === route.steps.length - 1;
              return (
                <li key={i} className="flex items-start gap-3 px-4 py-2">
                  {/* Step indicator */}
                  <div className="flex flex-col items-center shrink-0 mt-0.5">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold
                        ${
                          isLast
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                    >
                      {isLast ? <MapPin size={10} /> : i + 1}
                    </div>
                    {!isLast && <div className="w-px h-4 bg-gray-200 mt-1" />}
                  </div>

                  {/* Instruction */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 leading-snug">
                      {step.instruction}
                    </p>
                    {step.distance > 0 && (
                      <p className="text-[10px] text-gray-400 mt-0.5">
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
