"use client";

import Link from "next/link";
import { Navigation } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative px-6 lg:px-16 py-28 text-center overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/15 rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10 max-w-xl mx-auto">
        <h2
          className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight"
          style={{ fontFamily: "var(--font-syne, sans-serif)" }}
        >
          Start navigating LASU smarter
        </h2>
        <p className="text-white/40 mb-8 text-base">
          Built for students. Designed for clarity.
        </p>
        <Link
          href="/map"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-500 hover:bg-blue-400 font-bold text-sm transition-all hover:scale-105 active:scale-95"
        >
          <Navigation size={16} />
          Launch the Map
        </Link>
      </div>
    </section>
  );
}
