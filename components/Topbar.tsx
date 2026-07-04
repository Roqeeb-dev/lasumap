import { MapPin, LocateFixed, Layers, Info } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Topbar() {
  return (
    <header className="flex h-14 flex-shrink-0 items-center gap-3 border-b border-border bg-card px-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
          <MapPin
            className="h-4 w-4 text-primary-foreground"
            strokeWidth={2.5}
          />
        </div>
        <span className="text-[15px] font-medium text-foreground">
          LASU Navigate
        </span>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Switch map style"
          className="flex h-9 w-9 items-center justify-center rounded-full text-foreground-muted transition-colors hover:bg-muted hover:text-foreground"
        >
          <Layers className="h-[18px] w-[18px]" strokeWidth={2} />
        </button>

        <button
          type="button"
          aria-label="Locate me"
          className="flex h-9 w-9 items-center justify-center rounded-full text-foreground-muted transition-colors hover:bg-muted hover:text-foreground"
        >
          <LocateFixed className="h-[18px] w-[18px]" strokeWidth={2} />
        </button>

        <button
          type="button"
          aria-label="About"
          className="flex h-9 w-9 items-center justify-center rounded-full text-foreground-muted transition-colors hover:bg-muted hover:text-foreground"
        >
          <Info className="h-[18px] w-[18px]" strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
