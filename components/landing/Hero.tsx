"use client";

import { Navigation } from "lucide-react";
import LandingMap from "../LandingMap";
import Link from "next/link";

const stats = [
  { value: "52+", label: "Locations mapped" },
  { value: "6", label: "Categories" },
  { value: "Free", label: "No signup needed" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] pt-20 overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-1/3 left-1/4 w-80 md:w-[28rem] h-80 md:h-[28rem] rounded-full blur-4xl"
          style={{ background: "var(--glow-primary)" }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-56 md:w-72 h-56 md:h-72 rounded-full blur-3xl"
          style={{ background: "var(--glow-route)" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* ── Left: copy ── */}
        <div className="flex-1 flex flex-col max-w-xl w-full">
          {/* Pill badge */}
          <div className="badge w-fit mb-7">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
              style={{ background: "var(--clr-primary)" }}
            />
            Lagos State University · Ojo Campus
          </div>

          {/* Heading */}
          <h1 className="font-syne text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight mb-5">
            Find your way
            <br />
            <span style={{ color: "var(--clr-primary)" }}>around LASU</span>
            <br />
            instantly.
          </h1>

          {/* Subtext */}
          <p
            className="text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-md"
            style={{ color: "var(--clr-text-60)" }}
          >
            An interactive campus navigation system for students, staff, and
            visitors. Search buildings, get walking directions, and navigate
            LASU in real time.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link href="/map" prefetch className="btn-primary">
              <Navigation size={15} />
              Launch Navigation
            </Link>
            <a href="#how-it-works" className="btn-ghost">
              See how it works
            </a>
          </div>

          {/* Stats */}
          <div
            className="flex flex-wrap gap-x-8 gap-y-4 mt-10 pt-8"
            style={{ borderTop: "1px solid var(--clr-border)" }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p
                  className="font-syne text-xl font-bold"
                  style={{ color: "var(--clr-text-100)" }}
                >
                  {s.value}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--clr-text-40)" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 w-full flex items-center justify-center relative">
          <div
            className="w-full max-w-md sm:max-w-lg lg:max-w-none aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl animate-float"
            style={{
              border: "1px solid var(--clr-border)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
            }}
          >
            <LandingMap />
          </div>

          <div
            className="absolute bottom-[-16px] sm:bottom-[-20px] left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-4 lg:bottom-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md"
            style={{
              background: "rgba(12,21,39,0.85)",
              border: "1px solid var(--clr-border)",
              color: "var(--clr-text-60)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse-dot"
              style={{ background: "var(--clr-live)" }}
            />
            Live campus map
          </div>
        </div>
      </div>
    </section>
  );
}
