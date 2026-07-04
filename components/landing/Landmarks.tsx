"use client";

import Link from "next/link";
import {
  ArrowRight,
  Landmark,
  BookOpen,
  Cpu,
  Monitor,
  Trophy,
  Building2,
} from "lucide-react";

const featured = {
  name: "Senate Building",
  category: "Landmark",
  icon: Building2,
  desc: "The administrative heart of LASU — home to the Vice-Chancellor's office and major university functions.",
};

const landmarks = [
  { name: "Buba Marwa Auditorium", category: "Landmark", icon: Landmark },
  { name: "Fatiu Akesode Library", category: "Facility", icon: BookOpen },
  { name: "Faculty of Engineering", category: "Faculty", icon: Cpu },
  { name: "LASU ICT Centre", category: "Facility", icon: Monitor },
  { name: "Sports Centre", category: "Facility", icon: Trophy },
];

export default function Landmarks() {
  const FeaturedIcon = featured.icon;

  return (
    <section
      className="px-6 lg:px-8 py-20"
      style={{ borderTop: "1px solid var(--clr-border)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow">Key locations</p>
            <h2 className="font-syne text-3xl lg:text-4xl font-bold">
              Explore the campus
            </h2>
          </div>
          <Link
            href="/map"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: "var(--clr-primary)" }}
          >
            View all locations
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Featured card */}
        <Link
          href="/map"
          className="group flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 rounded-2xl mb-4 transition-all"
          style={{
            background: "var(--clr-primary-subtle)",
            border: "1px solid var(--clr-border-primary)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "var(--clr-primary-subtle-hover)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "var(--clr-primary-subtle)";
          }}
        >
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "var(--clr-primary)",
              color: "#fff",
            }}
          >
            <FeaturedIcon size={26} strokeWidth={1.5} />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p
                className="font-syne font-bold text-lg"
                style={{ color: "var(--clr-text-100)" }}
              >
                {featured.name}
              </p>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{
                  background: "var(--clr-primary-subtle)",
                  color: "var(--clr-primary-hover)",
                }}
              >
                {featured.category}
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--clr-text-60)" }}
            >
              {featured.desc}
            </p>
          </div>

          {/* Arrow */}
          <ArrowRight
            size={18}
            className="shrink-0 transition-transform group-hover:translate-x-1"
            style={{ color: "var(--clr-primary)" }}
          />
        </Link>

        {/* Grid of other landmarks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {landmarks.map((l) => {
            const Icon = l.icon;
            return (
              <Link
                key={l.name}
                href="/map"
                className="group flex items-center gap-3 p-4 rounded-xl transition-all"
                style={{
                  background: "var(--clr-bg-surface)",
                  border: "1px solid var(--clr-border)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "var(--clr-border-primary)";
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "var(--clr-bg-elevated)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "var(--clr-border)";
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "var(--clr-bg-surface)";
                }}
              >
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                  style={{
                    background: "var(--clr-primary-subtle)",
                    border: "1px solid var(--clr-border-primary)",
                    color: "var(--clr-primary)",
                  }}
                >
                  <Icon size={16} strokeWidth={1.75} />
                </div>

                {/* Name + category */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium truncate"
                    style={{ color: "var(--clr-text-100)" }}
                  >
                    {l.name}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--clr-text-40)" }}
                  >
                    {l.category}
                  </p>
                </div>

                <ArrowRight
                  size={13}
                  className="ml-auto shrink-0 transition-all group-hover:translate-x-0.5"
                  style={{ color: "var(--clr-text-20)" }}
                />
              </Link>
            );
          })}
        </div>

        {/* View all — mobile only */}
        <Link
          href="/map"
          className="sm:hidden flex items-center justify-center gap-1.5 mt-5 text-sm font-medium"
          style={{ color: "var(--clr-primary)" }}
        >
          View all locations
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
