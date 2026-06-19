import { Navigation, X } from "lucide-react";

interface PanelHeaderProps {
  onClose: () => void;
}

export default function PanelHeader({ onClose }: PanelHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 shrink-0">
      <div className="flex items-center gap-2">
        <Navigation size={16} className="text-blue-500" />
        <span className="text-sm font-semibold text-slate-900">Directions</span>
      </div>
      <button
        onClick={onClose}
        className="w-8 h-8 flex items-center justify-center rounded-2xl hover:bg-slate-100 active:bg-slate-200 transition-colors text-slate-400 hover:text-slate-600"
      >
        <X size={18} strokeWidth={3} />
      </button>
    </div>
  );
}
