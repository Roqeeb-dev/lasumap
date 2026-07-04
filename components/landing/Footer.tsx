"use client";

import { MapPin, Book, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="py-6"
      style={{ borderTop: "1px solid var(--clr-border)" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded flex items-center justify-center"
            style={{ background: "var(--clr-primary)" }}
          >
            <MapPin size={10} fill="white" className="text-white" />
          </div>
          <span className="text-xs" style={{ color: "var(--clr-text-40)" }}>
            LASU Navigate · Final Year Project · 2026
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/Roqeeb-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs transition-colors"
            style={{ color: "var(--clr-text-40)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color =
                "var(--clr-text-100)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color =
                "var(--clr-text-40)")
            }
          >
            <Book size={13} />
            GitHub
          </a>
          <Link
            href="/map"
            className="flex items-center gap-1.5 text-xs transition-colors"
            style={{ color: "var(--clr-text-40)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color =
                "var(--clr-text-100)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color =
                "var(--clr-text-40)")
            }
          >
            <ExternalLink size={13} />
            Open Map
          </Link>
          <span className="text-xs" style={{ color: "var(--clr-text-20)" }}>
            Lagos State University, Ojo
          </span>
        </div>
      </div>
    </footer>
  );
}
