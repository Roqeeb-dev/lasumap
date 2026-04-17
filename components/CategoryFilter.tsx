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
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-2xl shadow-xl shadow-black/10 border border-white/70 overflow-x-auto max-w-[92vw]">
        {allCategories.map((cat) => {
          const isActive = active === cat;
          const config = categoryConfig[cat];

          return (
            <button
              key={cat}
              onClick={() => onChange(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all duration-200
                ${
                  isActive
                    ? cat === "all"
                      ? "bg-slate-900 text-white shadow-sm"
                      : `${config.bg} ${config.color} shadow-sm`
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/80 active:bg-slate-200/70"
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
