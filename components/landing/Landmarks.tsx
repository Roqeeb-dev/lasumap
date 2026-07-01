"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const landmarks = [
  { name: "Buba Marwa Auditorium", category: "Landmark", emoji: "🎭" },
  { name: "Fatiu Akesode Library", category: "Facility", emoji: "📚" },
  { name: "Faculty of Engineering", category: "Faculty", emoji: "⚙️" },
  { name: "LASU ICT Centre", category: "Facility", emoji: "💻" },
  { name: "Senate Building", category: "Landmark", emoji: "🏛️" },
  { name: "Sports Centre", category: "Facility", emoji: "⚽" },
];

export default function Landmarks() {
  return (
    <section className="px-6 lg:px-8 py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">
          Key locations
        </p>
        <h2
          className="text-3xl lg:text-4xl font-bold mb-10"
          style={{ fontFamily: "var(--font-syne, sans-serif)" }}
        >
          Explore the campus
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {landmarks.map((l) => (
            <Link
              key={l.name}
              href="/map"
              className="group flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-blue-500/20 transition-all"
            >
              <span className="text-2xl">{l.emoji}</span>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{l.name}</p>
                <p className="text-xs text-white/30 mt-0.5">{l.category}</p>
              </div>
              <ArrowRight
                size={13}
                className="ml-auto text-white/20 group-hover:text-blue-400 shrink-0 transition-colors"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
