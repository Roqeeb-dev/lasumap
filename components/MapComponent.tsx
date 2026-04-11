"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import buildings from "@/data/buildings.json";
import { useState, useRef } from "react";
import SearchBar from "@/components/SearchBar";
import type { Feature } from "@/types/buildings";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function FlyToLocation({ target }: { target: LatLngExpression | null }) {
  const map = useMap();
  if (target) map.flyTo(target, 19, { duration: 1.2 });
  return null;
}

export default function MapComponent() {
  const [query, setQuery] = useState("");
  const [flyTarget, setFlyTarget] = useState<LatLngExpression | null>(null);
  const markerRefs = useRef<Record<string, L.Marker>>({});

  const results = query.trim()
    ? buildings.features.filter((f) =>
        f.properties.name.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  function handleSelect(feature: Feature) {
    const [lng, lat] = feature.geometry.coordinates;
    setFlyTarget([lat, lng]);
    setQuery("");
    setTimeout(() => {
      markerRefs.current[feature.properties.id]?.openPopup();
    }, 1300);
  }

  return (
    <div className="relative h-full w-full">
      <SearchBar
        query={query}
        results={results}
        onChange={setQuery}
        onSelect={handleSelect}
      />
      <MapContainer
        center={[6.4666, 3.201]}
        zoom={16}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FlyToLocation target={flyTarget} />
        {buildings.features.map((f) => (
          <Marker
            key={f.properties.id}
            position={[f.geometry.coordinates[1], f.geometry.coordinates[0]]}
            icon={defaultIcon}
            ref={(ref) => {
              if (ref) markerRefs.current[f.properties.id] = ref;
            }}
          >
            <Popup>
              <strong>{f.properties.name}</strong>
              <br />
              {f.properties.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
