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
      className="absolute bottom-20 right-4 z-[1000] flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white hover:bg-gray-50 border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 disabled:opacity-60"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
      ) : (
        <LocateFixed className="w-5 h-5 text-blue-500" />
      )}
    </button>
  );
}
