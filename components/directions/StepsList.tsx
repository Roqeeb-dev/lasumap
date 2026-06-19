import { MapPin } from "lucide-react";
import type { RouteResult } from "@/lib/directions";
import { formatDistance } from "@/lib/directions";

interface StepsListProps {
  steps: RouteResult["steps"];
}

export default function StepsList({ steps }: StepsListProps) {
  return (
    <div className="overflow-y-auto flex-1">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-4 pt-4 pb-2">
        Step by step
      </p>
      <ul className="px-4 pb-6 space-y-4">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
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
  );
}
