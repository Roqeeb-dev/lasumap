import {
  MapPin,
  ChevronRight,
  Route,
  Building2,
  UtensilsCrossed,
  GraduationCap,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside
      className="
        fixed inset-x-0 bottom-0 z-10 flex max-h-[50vh] flex-col
        rounded-t-2xl border-t border-border bg-card shadow-lg
        md:static md:z-auto md:h-full md:max-h-none md:w-72 md:flex-shrink-0
        md:flex-col md:rounded-none md:border-t-0 md:border-r md:shadow-none
      "
    >
      <div className="mx-auto mt-2 h-1 w-10 flex-shrink-0 rounded-full bg-border md:hidden" />

      <div className="flex-shrink-0 space-y-3 border-b border-border p-4">
        <div className="flex gap-2 overflow-x-auto">
          <span className="flex-shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            All
          </span>
          <span className="flex-shrink-0 rounded-full border border-border px-3 py-1 text-xs text-foreground-muted">
            Faculty
          </span>
          <span className="flex-shrink-0 rounded-full border border-border px-3 py-1 text-xs text-foreground-muted">
            Restaurant
          </span>
          <span className="flex-shrink-0 rounded-full border border-border px-3 py-1 text-xs text-foreground-muted">
            School
          </span>
        </div>

        <div className="rounded-xl border border-border bg-background-subtle p-3">
          <div className="flex items-start gap-2">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-subtle">
              <Building2 className="h-4 w-4 text-primary" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                Faculty of Engineering
              </p>
              <p className="text-xs text-foreground-muted">
                6.5158&deg; N, 3.2946&deg; E
              </p>
            </div>
          </div>
          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2 text-sm font-semibold text-primary-foreground"
          >
            <Route className="h-4 w-4" strokeWidth={2.5} />
            Navigate
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <p className="px-4 pt-3 text-xs font-medium uppercase tracking-wide text-foreground-muted">
          Nearby buildings
        </p>

        <ul>
          <li>
            <button
              type="button"
              className="flex w-full items-center gap-3 border-b border-border-subtle px-4 py-3 text-left hover:bg-background-subtle"
            >
              <GraduationCap
                className="h-4 w-4 flex-shrink-0 text-foreground-muted"
                strokeWidth={2}
              />
              <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                Faculty of Science
              </span>
              <ChevronRight
                className="h-4 w-4 flex-shrink-0 text-foreground-muted"
                strokeWidth={2}
              />
            </button>
          </li>

          <li>
            <button
              type="button"
              className="flex w-full items-center gap-3 border-b border-border-subtle px-4 py-3 text-left hover:bg-background-subtle"
            >
              <UtensilsCrossed
                className="h-4 w-4 flex-shrink-0 text-foreground-muted"
                strokeWidth={2}
              />
              <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                Cafeteria
              </span>
              <ChevronRight
                className="h-4 w-4 flex-shrink-0 text-foreground-muted"
                strokeWidth={2}
              />
            </button>
          </li>

          <li>
            <button
              type="button"
              className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-background-subtle"
            >
              <MapPin
                className="h-4 w-4 flex-shrink-0 text-foreground-muted"
                strokeWidth={2}
              />
              <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                Admin Block 1
              </span>
              <ChevronRight
                className="h-4 w-4 flex-shrink-0 text-foreground-muted"
                strokeWidth={2}
              />
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
