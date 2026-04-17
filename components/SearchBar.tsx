import type { Feature } from "@/types/buildings";
import { Search, MapPin, X } from "lucide-react";

const categoryColors: Record<string, string> = {
  faculty: "bg-blue-600/10 text-blue-700 border border-blue-200",
  facility: "bg-emerald-600/10 text-emerald-700 border border-emerald-200",
  landmark: "bg-amber-600/10 text-amber-700 border border-amber-200",
  department: "bg-purple-600/10 text-purple-700 border border-purple-200",
  restaurant: "bg-rose-600/10 text-rose-700 border border-rose-200",
  school: "bg-sky-600/10 text-sky-700 border border-sky-200",
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
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-[94%] sm:w-[90%] md:w-[80%] max-w-xl">
      {/* Input */}
      <div
        className={`flex items-center gap-3 px-5 py-3.5 bg-white/75 backdrop-blur-2xl border border-white/70 shadow-xl shadow-black/10 transition-all duration-300
          ${showResults ? "rounded-t-3xl border-b-0" : "rounded-3xl"}
          focus-within:ring-2 focus-within:ring-blue-500/40 focus-within:border-blue-500/30`}
      >
        <Search size={18} className="text-slate-500 shrink-0" />

        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search buildings, faculties, facilities…"
          className="flex-1 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
        />

        {query && (
          <button
            onClick={() => onChange("")}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {showResults && (
        <ul
          className="bg-white/80 
                     backdrop-blur-2xl border border-white/70 border-t-0 rounded-b-3xl shadow-2xl shadow-black/15 overflow-hidden max-h-72 overflow-y-auto divide-y divide-slate-200/80 transition-all duration-200"
        >
          {results.map((f) => (
            <li
              key={f.properties.id}
              onClick={() => onSelect(f)}
              className="flex items-start gap-3 px-5 py-3.5 cursor-pointer hover:bg-slate-100/80 active:bg-slate-200/70 transition-all duration-150 group"
            >
              {/* Icon */}
              <div className="mt-0.5 text-slate-400 group-hover:text-blue-500 transition-colors shrink-0">
                <MapPin size={18} />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-medium text-slate-900 truncate">
                  {f.properties.name}
                </p>
                <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                  {f.properties.description}
                </p>
              </div>

              {/* Category */}
              <span
                className={`shrink-0 mt-0.5 text-[10px] font-semibold px-3 py-1 rounded-full capitalize border
                  ${
                    categoryColors[f.properties.category] ??
                    "bg-slate-100 text-slate-700 border-slate-300"
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
