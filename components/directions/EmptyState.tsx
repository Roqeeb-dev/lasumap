import { MapPin } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-2 border-t border-slate-100">
      <MapPin size={28} className="text-slate-300" />
      <p className="text-sm text-slate-400">
        Choose a starting point and destination to see your route
      </p>
    </div>
  );
}
