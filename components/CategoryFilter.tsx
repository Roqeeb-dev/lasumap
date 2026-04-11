import { categoryConfig, allCategories } from "@/lib/categories";

interface CategoryFilterProps {
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000]">
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-2xl shadow-xl border border-gray-100 overflow-x-auto max-w-[92vw]">
        {allCategories.map((cat) => {
          const isActive = active === cat;
          const config = categoryConfig[cat];

          return (
            <button
              key={cat}
              onClick={() => onChange(cat)}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all
                ${
                  isActive
                    ? cat === "all"
                      ? "bg-gray-800 text-white"
                      : `${config.bg} ${config.color}`
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                }`}
            >
              {cat === "all" ? "All" : config.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
