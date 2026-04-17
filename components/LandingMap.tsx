"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import buildings from "@/data/buildings.json";

export default function LandingMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [3.201, 6.4666],
      zoom: 15,
      interactive: false,
      attributionControl: false,
    });

    map.on("load", () => {
      const featured = buildings.features.filter((f) =>
        ["landmark", "faculty"].includes(f.properties.category),
      );

      featured.forEach((f) => {
        const el = document.createElement("div");
        el.style.cssText = `
          width: 8px; height: 8px;
          background: #60a5fa;
          border-radius: 50%;
          border: 2px solid rgba(96,165,250,0.4);
          box-shadow: 0 0 6px rgba(96,165,250,0.6);
        `;
        new mapboxgl.Marker({ element: el })
          .setLngLat([f.geometry.coordinates[0], f.geometry.coordinates[1]])
          .addTo(map);
      });
    });

    return () => map.remove();
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
