"use client";

import Link from "next/link";
import { Navigation, MapPin, Clock } from "lucide-react";

const perks = [
  { icon: MapPin, text: "No download required" },
  { icon: Clock, text: "Works on any browser" },
  { icon: Navigation, text: "Free, always" },
];

export default function CTA() {
  return (
    <section
      className="relative px-6 lg:px-8 py-28 overflow-hidden"
      style={{ borderTop: "1px solid var(--clr-border)" }}
    >
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[320px] rounded-full blur-4xl"
          style={{ background: "var(--glow-primary)" }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Pill */}
        <div className="badge mx-auto mb-6 w-fit">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
            style={{ background: "var(--clr-live)" }}
          />
          Ready to use right now
        </div>

        {/* Heading */}
        <h2 className="font-syne text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
          Your campus.
          <br />
          <span style={{ color: "var(--clr-primary)" }}>Finally mapped.</span>
        </h2>

        {/* Subtext */}
        <p
          className="text-base mb-10 max-w-sm mx-auto"
          style={{ color: "var(--clr-text-60)" }}
        >
          Open the map, find your building, and walk the route — in under 30
          seconds.
        </p>

        {/* CTA button */}
        <Link
          href="/map"
          className="btn-primary text-base px-8 py-4 mx-auto w-fit"
        >
          <Navigation size={16} />
          Launch the Map
        </Link>

        {/* Perks row */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-10 pt-8"
          style={{ borderTop: "1px solid var(--clr-border)" }}
        >
          {perks.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 text-sm"
              style={{ color: "var(--clr-text-40)" }}
            >
              <Icon size={14} style={{ color: "var(--clr-route)" }} />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
