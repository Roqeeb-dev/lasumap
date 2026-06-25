import { Navigation, ArrowRight, X } from "lucide-react";
import type { RouteResult } from "@/lib/directions";
import { formatDistance } from "@/lib/directions";

interface NavigationBannerProps {
  steps: RouteResult["steps"];
  currentStep: number;
  destinationName: string;
  onStop: () => void;
}

export default function NavigationBanner({
  steps,
  currentStep,
  destinationName,
  onStop,
}: NavigationBannerProps) {
  const step = steps[currentStep];
  const nextStep = steps[currentStep + 1];
  const isLast = currentStep >= steps.length - 1;

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-2rem)] max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      {/* Current instruction */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
          <Navigation size={18} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 leading-snug">
            {isLast ? `Arriving at ${destinationName}` : step?.instruction}
          </p>
          {step?.distance > 0 && !isLast && (
            <p className="text-xs text-slate-400 mt-0.5">
              in {formatDistance(step.distance)}
            </p>
          )}
        </div>
        <button
          onClick={onStop}
          title="Stop navigation"
          className="w-8 h-8 shrink-0 flex items-center justify-center rounded-xl hover:bg-red-50 transition-colors text-slate-400 hover:text-red-500"
        >
          <X size={16} />
        </button>
      </div>

      {/* Next step preview */}
      {!isLast && nextStep && (
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
          <ArrowRight size={12} className="text-slate-400 shrink-0" />
          <p className="text-xs text-slate-500 truncate">
            Then: {nextStep.instruction}
          </p>
        </div>
      )}
    </div>
  );
}
