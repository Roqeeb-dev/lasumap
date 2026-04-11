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
    color: "text-gray-600",
    bg: "bg-gray-100",
    label: category,
  };

  return (
    <div className="min-w-[180px] max-w-[220px]">
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-sm font-semibold text-gray-800 leading-snug">
          {name}
        </p>
        <span
          className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${config.bg} ${config.color}`}
        >
          {config.label}
        </span>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
      <div className="flex items-center gap-1 mt-3 pt-2 border-t border-gray-100">
        <MapPin size={11} className="text-gray-300" />
        <span className="text-[10px] text-gray-400">LASU Campus, Ojo</span>
      </div>
    </div>
  );
}
