"use client";

import { MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-6 lg:px-16 py-6 border-t border-white/5 flex-col md:flex-row items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-blue-500 flex items-center justify-center">
          <MapPin size={10} fill="white" className="text-white" />
        </div>
        <span className="text-xs text-white/30">
          LASU Navigate · Final Year Project
        </span>
      </div>
      <span className="text-xs text-white/20">Lagos State University, Ojo</span>
    </footer>
  );
}
