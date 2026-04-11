"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/MapComponent"), { ssr: false });

export default function Home() {
  return (
    <main className="h-screen w-full">
      <Map />
    </main>
  );
}
