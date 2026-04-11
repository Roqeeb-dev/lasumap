import type { Feature } from "@/types/buildings";

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
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for a building..."
        className="w-full px-4 py-2 rounded-xl shadow-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {results.length > 0 && (
        <ul className="mt-1 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {results.map((f) => (
            <li
              key={f.properties.id}
              onClick={() => onSelect(f)}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 border-b border-gray-50 last:border-0"
            >
              <span className="font-medium">{f.properties.name}</span>
              <span className="ml-2 text-xs text-gray-400 capitalize">
                {f.properties.category}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
