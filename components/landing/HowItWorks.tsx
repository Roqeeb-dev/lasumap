"use client";

import { Search, MapPin, Navigation } from "lucide-react";

export const steps = [
  {
    icon: <Search size={20} />,
    title: "Search any location",
    desc: "Type a building, faculty, or facility name and find it instantly.",
  },
  {
    icon: <MapPin size={20} />,
    title: "See it on the map",
    desc: "The map flies directly to your result and opens its details.",
  },
  {
    icon: <Navigation size={20} />,
    title: "Get walking directions",
    desc: "Pick an origin and destination — get a step-by-step walking route.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-6 lg:px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">
          How it works
        </p>
        <h2
          className="text-3xl lg:text-4xl font-bold mb-12 max-w-lg"
          style={{ fontFamily: "var(--font-syne, sans-serif)" }}
        >
          Navigate LASU without confusion
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-blue-500/20 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-500/20 transition-colors">
                {step.icon}
              </div>
              <p
                className="font-semibold text-base mb-2"
                style={{ fontFamily: "var(--font-syne, sans-serif)" }}
              >
                {step.title}
              </p>
              <p className="text-white/40 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
