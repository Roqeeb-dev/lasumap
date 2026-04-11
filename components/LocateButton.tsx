import { LocateFixed, Loader2 } from "lucide-react";

interface LocateButtonProps {
  loading: boolean;
  onClick: () => void;
}

export default function LocateButton({ loading, onClick }: LocateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      title="Find my location"
      className="absolute bottom-20 right-4 z-[1000] bg-white hover:bg-gray-50 disabled:opacity-60
        shadow-xl border border-gray-100 rounded-xl p-3 transition-all active:scale-95"
    >
      {loading ? (
        <Loader2 size={18} className="text-blue-500 animate-spin" />
      ) : (
        <LocateFixed size={18} className="text-blue-500" />
      )}
    </button>
  );
}
