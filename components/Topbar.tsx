import Logo from "./ui/Logo";
import { Search, Layers, Info } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-16 flex-shrink-0 items-center gap-4 border-b border-border bg-card px-4 md:px-6">
      <Logo />

      <div className="flex-1" />

      <div className="hidden items-center gap-2 sm:flex">
        <button
          type="button"
          aria-label="Switch map style"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground-muted transition-colors hover:bg-background-subtle hover:text-foreground"
        >
          <Layers className="h-[18px] w-[18px]" strokeWidth={2} />
        </button>

        <button
          type="button"
          aria-label="About"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground-muted transition-colors hover:bg-background-subtle hover:text-foreground"
        >
          <Info className="h-[18px] w-[18px]" strokeWidth={2} />
        </button>
      </div>

      <div className="flex h-10 w-full max-w-[260px] flex-shrink items-center gap-2 rounded-full border border-border bg-background-subtle px-4">
        <Search
          className="h-4 w-4 flex-shrink-0 text-foreground-muted"
          strokeWidth={2}
        />
        <input
          type="text"
          placeholder="Search buildings, faculties..."
          className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground-muted focus:outline-none"
        />
      </div>
    </header>
  );
}
