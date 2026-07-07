"use client";

import {
  MapPin,
  ChevronRight,
  Route,
  Building2,
  UtensilsCrossed,
  GraduationCap,
  Landmark,
  BookOpen,
  Cpu,
  Tag,
  Layers,
  Info,
  Locate,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────
interface Building {
  id: string;
  name: string;
  category: string;
  lat?: number;
  lng?: number;
}

interface SidebarProps {
  selectedBuilding?: Building | null;
  nearbyBuildings?: Building[];
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
  onNavigate?: (building: Building) => void;
  onBuildingSelect?: (building: Building) => void;
}

// ── Category config ──────────────────────────────────────────
const categories = [
  { label: "All", value: "all" },
  { label: "Faculty", value: "faculty" },
  { label: "Facility", value: "facility" },
  { label: "Landmark", value: "landmark" },
  { label: "Restaurant", value: "restaurant" },
  { label: "School", value: "school" },
];

const categoryIcons: Record<string, React.ElementType> = {
  faculty: GraduationCap,
  facility: Cpu,
  landmark: Landmark,
  restaurant: UtensilsCrossed,
  school: BookOpen,
  default: MapPin,
};

function CategoryIcon({ category }: { category: string }) {
  const Icon = categoryIcons[category.toLowerCase()] ?? categoryIcons.default;
  return <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={1.75} />;
}

// ── Quick tips (shown when nothing is selected) ───────────────
const tips = [
  {
    icon: Tag,
    number: "01",
    title: "Filter by Category",
    desc: "Tap the filter chips above to highlight specific building types on the map.",
  },
  {
    icon: Layers,
    number: "02",
    title: "Switch Map Style",
    desc: "Use the layers button in the top bar to toggle between map styles.",
  },
  {
    icon: Locate,
    number: "03",
    title: "Find Your Location",
    desc: "Tap the locate button to centre the map on your current position.",
  },
];

// ── Sidebar ──────────────────────────────────────────────────
export default function Sidebar({
  selectedBuilding,
  nearbyBuildings = [],
  activeCategory = "all",
  onCategoryChange,
  onNavigate,
  onBuildingSelect,
}: SidebarProps) {
  return (
    <aside
      className="
        fixed inset-x-0 bottom-0 z-10 flex max-h-[60vh] flex-col
        rounded-t-2xl shadow-2xl
        md:static md:z-auto md:h-full md:max-h-none md:w-72 md:flex-shrink-0
        md:flex-col md:rounded-none md:shadow-none
      "
      style={{
        background: "var(--card)",
        borderTop: "1px solid var(--border)",
        // desktop
      }}
    >
      {/* Mobile drag handle */}
      <div
        className="mx-auto mt-3 h-1 w-10 flex-shrink-0 rounded-full md:hidden"
        style={{ background: "var(--border)" }}
      />

      {/* ── Header ── */}
      <div
        className="flex-shrink-0 px-4 pt-4 pb-3"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {/* Branding row — desktop */}
        <div className="hidden md:flex items-center gap-2 mb-3">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            <Route className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "var(--primary)" }}
            >
              LASU Navigate
            </p>
            <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
              Campus Guide
            </p>
          </div>
        </div>

        {/* Category filter chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => onCategoryChange?.(cat.value)}
                className="flex-shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-all"
                style={{
                  background: isActive ? "var(--primary)" : "transparent",
                  color: isActive
                    ? "var(--primary-foreground)"
                    : "var(--foreground-muted)",
                  border: isActive
                    ? "1px solid transparent"
                    : "1px solid var(--border)",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto">
        {/* Selected building card */}
        {selectedBuilding ? (
          <div
            className="p-4"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div
              className="rounded-xl p-4"
              style={{
                background: "var(--background-subtle)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Icon + name */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: "rgba(59, 130, 246, 0.12)",
                    border: "1px solid var(--border-accent)",
                    color: "var(--primary)",
                  }}
                >
                  <Building2 className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="truncate text-sm font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {selectedBuilding.name}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {selectedBuilding.category.charAt(0).toUpperCase() +
                      selectedBuilding.category.slice(1)}
                    {selectedBuilding.lat && selectedBuilding.lng && (
                      <span className="ml-2 font-mono opacity-60">
                        {selectedBuilding.lat.toFixed(4)}°N,{" "}
                        {selectedBuilding.lng.toFixed(4)}°E
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Navigate CTA */}
              <button
                type="button"
                onClick={() => onNavigate?.(selectedBuilding)}
                className="flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}
              >
                <Route className="h-4 w-4" strokeWidth={2.5} />
                Navigate
              </button>
            </div>
          </div>
        ) : (
          /* ── Quick tips (nothing selected) ── */
          <div
            className="p-4"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div className="hidden md:block mb-4">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: "var(--foreground-muted)" }}
              >
                Find your way
              </p>
              <p
                className="text-base font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                Search, navigate{" "}
                <span style={{ color: "var(--accent)" }}>&amp; explore</span>{" "}
                all landmarks.
              </p>
            </div>

            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-3"
              style={{ color: "var(--foreground-muted)" }}
            >
              Quick tips
            </p>

            <div className="space-y-2">
              {tips.map((tip) => {
                const Icon = tip.icon;
                return (
                  <div
                    key={tip.number}
                    className="flex items-start gap-3 rounded-xl p-3"
                    style={{
                      background: "var(--background-subtle)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <div
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{
                        background: "rgba(34, 211, 238, 0.10)",
                        border: "1px solid var(--border-route)",
                        color: "var(--accent)",
                      }}
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-xs font-semibold"
                        style={{ color: "var(--foreground)" }}
                      >
                        <span
                          className="mr-1.5 font-mono text-[10px]"
                          style={{ color: "var(--foreground-muted)" }}
                        >
                          {tip.number}
                        </span>
                        {tip.title}
                      </p>
                      <p
                        className="mt-0.5 text-xs leading-relaxed"
                        style={{ color: "var(--foreground-muted)" }}
                      >
                        {tip.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Nearby buildings list ── */}
        {nearbyBuildings.length > 0 && (
          <>
            <p
              className="px-4 pt-4 pb-2 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "var(--foreground-muted)" }}
            >
              Nearby buildings
            </p>
            <ul>
              {nearbyBuildings.map((building, i) => {
                const isLast = i === nearbyBuildings.length - 1;
                return (
                  <li key={building.id}>
                    <button
                      type="button"
                      onClick={() => onBuildingSelect?.(building)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors"
                      style={{
                        borderBottom: isLast
                          ? "none"
                          : "1px solid var(--border-subtle)",
                        color: "var(--foreground-muted)",
                      }}
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.background = "var(--background-subtle)";
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.background = "transparent";
                      }}
                    >
                      <CategoryIcon category={building.category} />
                      <span
                        className="min-w-0 flex-1 truncate text-sm"
                        style={{ color: "var(--foreground)" }}
                      >
                        {building.name}
                      </span>
                      <ChevronRight
                        className="h-4 w-4 flex-shrink-0"
                        strokeWidth={2}
                        style={{ color: "var(--foreground-muted)" }}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {/* Empty state when no nearby buildings */}
        {nearbyBuildings.length === 0 && !selectedBuilding && (
          <div className="px-4 pt-6 pb-4 text-center">
            <MapPin
              className="mx-auto mb-2 h-8 w-8 opacity-20"
              style={{ color: "var(--foreground)" }}
              strokeWidth={1.5}
            />
            <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
              Tap a marker on the map to see building details
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
