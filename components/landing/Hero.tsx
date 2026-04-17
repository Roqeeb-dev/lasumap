"use client";

import { Navigation } from "lucide-react";
import LandingMap from "../LandingMap";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center pt-24 lg:pt-22">
      {/* Background blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-52 md:w-64 h-52 md:h-64 bg-indigo-600/15 rounded-full blur-[100px]" />
      </div>

      {/* Left */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-10 lg:px-16 py-12 md:py-16 lg:py-0 max-w-2xl w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium mb-6 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Lagos State University · Ojo Campus
        </div>

        {/* Heading */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-5"
          style={{ fontFamily: "var(--font-syne, sans-serif)" }}
        >
          Find your way
          <br />
          <span className="text-blue-400">around LASU</span>
          <br />
          instantly.
        </h1>

        {/* Description */}
        <p className="text-white/60 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-md">
          An interactive campus navigation system for students, staff, and
          visitors. Search buildings, explore faculties, and get walking
          directions — all in one place.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Link
            href="/map"
            prefetch
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-400 font-semibold text-sm transition-all hover:scale-105 active:scale-95"
          >
            <Navigation size={15} />
            Launch Navigation
          </Link>

          <a
            href="#how-it-works"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full border border-white/10 hover:border-white/20 text-white/60 hover:text-white font-semibold text-sm transition-all"
          >
            See how it works
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-10 pt-6 border-t border-white/5">
          {[
            { value: "52+", label: "Locations mapped" },
            { value: "6", label: "Categories" },
            { value: "Free", label: "No signup needed" },
          ].map((s) => (
            <div key={s.label} className="min-w-[100px]">
              <p
                className="text-lg sm:text-xl font-bold"
                style={{ fontFamily: "var(--font-syne, sans-serif)" }}
              >
                {s.value}
              </p>
              <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right — map */}
      <div className="relative z-10 flex-1 w-full flex items-center justify-center px-6 md:px-10 lg:px-10 pb-16 lg:pb-0">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-950/50">
          <LandingMap />
        </div>

        {/* Floating badge */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-10 lg:bottom-16 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs text-white/70">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live campus map
        </div>
      </div>
    </section>
  );
}
