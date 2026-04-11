import type { Feature } from "@/types/buildings";
import { Search, MapPin, X } from "lucide-react";

const categoryColors: Record<string, string> = {
  faculty: "bg-blue-100 text-blue-700",
  facility: "bg-emerald-100 text-emerald-700",
  landmark: "bg-amber-100 text-amber-700",
  department: "bg-purple-100 text-purple-700",
  restaurant: "bg-rose-100 text-rose-700",
  school: "bg-sky-100 text-sky-700",
};

interface SearchBarProps {
  query: string;
  results: Feature[];
  onChange: (value: string) => void;
  onSelect: (feature: Feature) => void;
}

export default function SearchBar({
  query,
  results,
  onChange,
  onSelect,
}: SearchBarProps) {
  const showResults = results.length > 0;

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-[92%] max-w-lg">
      {/* Input */}
      <div
        className={`flex items-center gap-3 bg-white px-4 py-3 shadow-xl border border-gray-100
          ${showResults ? "rounded-t-2xl border-b-0" : "rounded-2xl"}`}
      >
        <Search size={16} className="text-gray-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search buildings, faculties, facilities…"
          className="flex-1 text-sm text-gray-800 placeholder:text-gray-400 bg-transparent focus:outline-none"
        />
        {query && (
          <button
            onClick={() => onChange("")}
            className="text-gray-300 hover:text-gray-500 transition-colors"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showResults && (
        <ul className="bg-white border border-gray-100 border-t-0 rounded-b-2xl shadow-xl overflow-hidden max-h-72 overflow-y-auto divide-y divide-gray-50">
          {results.map((f) => (
            <li
              key={f.properties.id}
              onClick={() => onSelect(f)}
              className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors group"
            >
              <div className="mt-0.5 text-gray-300 group-hover:text-blue-400 transition-colors shrink-0">
                <MapPin size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {f.properties.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                  {f.properties.description}
                </p>
              </div>
              <span
                className={`shrink-0 mt-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                  categoryColors[f.properties.category] ??
                  "bg-gray-100 text-gray-500"
                }`}
              >
                {f.properties.category}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
