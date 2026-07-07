"use client";

import Logo from "./ui/Logo";
import { Search, Layers, Info, Locate } from "lucide-react";

interface TopbarProps {
  gpsStatus?: "active" | "weak" | "off";
  onLocate?: () => void;
}

export default function Topbar({
  gpsStatus = "active",
  onLocate,
}: TopbarProps) {
  const gpsConfig = {
    active: {
      label: "GPS Active",
      color: "var(--success)",
      bg: "rgba(52, 211, 153, 0.10)",
      border: "rgba(52, 211, 153, 0.20)",
    },
    weak: {
      label: "Weak GPS",
      color: "var(--warning, #ffb347)",
      bg: "rgba(255, 179, 71, 0.10)",
      border: "rgba(255, 179, 71, 0.20)",
    },
    off: {
      label: "GPS Off",
      color: "var(--foreground-muted)",
      bg: "rgba(255,255,255,0.04)",
      border: "var(--border)",
    },
  }[gpsStatus];

  return (
    <header
      className="flex h-16 flex-shrink-0 items-center gap-3 px-4 md:px-6"
      style={{
        background: "var(--card)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Logo */}
      <Logo />

      {/* GPS status pill — desktop only */}
      <div
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0"
        style={{
          background: gpsConfig.bg,
          border: `1px solid ${gpsConfig.border}`,
          color: gpsConfig.color,
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{
            background: gpsConfig.color,
            animation:
              gpsStatus === "active"
                ? "pulse-dot 2s ease-in-out infinite"
                : "none",
          }}
        />
        {gpsConfig.label}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search bar */}
      <div
        className="flex h-10 w-full max-w-xs flex-shrink items-center gap-2 rounded-full px-4 transition-all duration-150 focus-within:ring-1"
        style={{
          background: "var(--background-subtle)",
          border: "1px solid var(--border)",
          // focus-within handled via inline ring below
        }}
        onFocus={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor =
            "var(--border-accent)";
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor =
            "var(--border)";
        }}
      >
        <Search
          className="h-4 w-4 flex-shrink-0"
          strokeWidth={2}
          style={{ color: "var(--foreground-muted)" }}
        />
        <input
          type="text"
          placeholder="Search buildings, faculties..."
          className="w-full bg-transparent text-sm focus:outline-none"
          style={{
            color: "var(--foreground)",
          }}
        />
      </div>

      {/* Action buttons */}
      <div className="hidden sm:flex items-center gap-1.5">
        {/* Locate me */}
        <button
          type="button"
          aria-label="Find my location"
          onClick={onLocate}
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
          style={{
            border: "1px solid var(--border)",
            color: "var(--foreground-muted)",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "var(--background-subtle)";
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--primary)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--foreground-muted)";
          }}
        >
          <Locate className="h-[17px] w-[17px]" strokeWidth={2} />
        </button>

        {/* Map style switcher */}
        <button
          type="button"
          aria-label="Switch map style"
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
          style={{
            border: "1px solid var(--border)",
            color: "var(--foreground-muted)",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "var(--background-subtle)";
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--foreground)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--foreground-muted)";
          }}
        >
          <Layers className="h-[17px] w-[17px]" strokeWidth={2} />
        </button>

        {/* Info */}
        <button
          type="button"
          aria-label="About"
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
          style={{
            border: "1px solid var(--border)",
            color: "var(--foreground-muted)",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "var(--background-subtle)";
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--foreground)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--foreground-muted)";
          }}
        >
          <Info className="h-[17px] w-[17px]" strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
