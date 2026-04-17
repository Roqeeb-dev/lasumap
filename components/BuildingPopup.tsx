import { categoryConfig } from "@/lib/categories";
import { MapPin } from "lucide-react";

interface PopupProps {
  name: string;
  description: string;
  category: string;
}

export default function BuildingPopup({
  name,
  description,
  category,
}: PopupProps) {
  const config = categoryConfig[category] ?? {
    color: "text-slate-700",
    bg: "bg-slate-100",
    label: category,
  };

  return (
    <div className="min-w-[180px] max-w-[240px] bg-white rounded-3xl shadow-xl shadow-black/10 border border-white/70 overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-4 pt-3 pb-2 border-b border-slate-100">
        <p className="text-sm font-semibold text-slate-900 leading-tight flex-1 pr-2">
          {name}
        </p>

        <span
          className={`shrink-0 text-[10px] font-semibold px-2.5 py-0.5 rounded-full capitalize 
                     ${config.bg} ${config.color} border border-slate-200`}
        >
          {config.label}
        </span>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Location Footer */}
        <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-100">
          <MapPin size={13} className="text-slate-400" />
          <span className="text-[10px] text-slate-500">LASU Campus, Ojo</span>
        </div>
      </div>
    </div>
  );
}
