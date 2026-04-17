"use client";

import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 backdrop-blur-md bg-[#0a0f1e]/80">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
          <MapPin size={14} fill="white" className="text-white" />
        </div>
        <span
          className="font-semibold text-sm tracking-tight"
          style={{ fontFamily: "var(--font-syne, sans-serif)" }}
        >
          LASU Navigate
        </span>
      </div>
      <Link
        href="/map"
        prefetch
        className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-400 transition-colors"
      >
        Open Map <ArrowRight size={12} />
      </Link>
    </nav>
  );
}
