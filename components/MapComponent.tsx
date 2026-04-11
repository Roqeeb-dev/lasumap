"use client";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import buildings from "@/data/buildings.json";
import { useState, useRef } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import BuildingPopup from "@/components/BuildingPopup";
import LocateButton from "@/components/LocateButton";
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

// Blue dot icon for the user's position
const userIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 18px; height: 18px;
      background: #3b82f6;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(59,130,246,0.25);
    "></div>
  `,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function FlyToLocation({ target }: { target: LatLngExpression | null }) {
  const map = useMap();
  if (target) map.flyTo(target, 19, { duration: 1.2 });
  return null;
}

export default function MapComponent() {
  const [query, setQuery] = useState("");
  const [flyTarget, setFlyTarget] = useState<LatLngExpression | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [userPosition, setUserPosition] = useState<LatLngExpression | null>(
    null,
  );
  const [locating, setLocating] = useState(false);
  const markerRefs = useRef<Record<string, L.Marker>>({});

  const visibleFeatures = buildings.features.filter((f) =>
    activeCategory === "all" ? true : f.properties.category === activeCategory,
  );

  const results = query.trim()
    ? buildings.features.filter((f) =>
        f.properties.name.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  function handleSelect(feature: Feature) {
    const [lng, lat] = feature.geometry.coordinates;
    setFlyTarget([lat, lng]);
    setActiveCategory("all");
    setQuery("");
    setTimeout(() => {
      markerRefs.current[feature.properties.id]?.openPopup();
    }, 1300);
  }

  function handleLocate() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const latlng: LatLngExpression = [latitude, longitude];
        setUserPosition(latlng);
        setFlyTarget(latlng);
        setLocating(false);
      },
      (err) => {
        console.error("Geolocation error:", err.code, err.message);
        alert(
          "Could not get your location. Please allow location access and try again.",
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  return (
    <div className="relative h-full w-full">
      <SearchBar
        query={query}
        results={results}
        onChange={setQuery}
        onSelect={handleSelect}
      />
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      <LocateButton loading={locating} onClick={handleLocate} />
      <MapContainer
        center={[6.4666, 3.201]}
        zoom={16}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FlyToLocation target={flyTarget} />

        {/* User position */}
        {userPosition && (
          <>
            <Marker position={userPosition} icon={userIcon}>
              <Popup>
                <p className="text-sm font-medium text-gray-800">
                  You are here
                </p>
              </Popup>
            </Marker>
            <Circle
              center={userPosition}
              radius={30}
              pathOptions={{
                color: "#3b82f6",
                fillColor: "#3b82f6",
                fillOpacity: 0.1,
                weight: 1,
              }}
            />
          </>
        )}

        {/* Building markers */}
        {visibleFeatures.map((f) => (
          <Marker
            key={f.properties.id}
            position={[f.geometry.coordinates[1], f.geometry.coordinates[0]]}
            icon={defaultIcon}
            ref={(ref) => {
              if (ref) markerRefs.current[f.properties.id] = ref;
            }}
          >
            <Popup>
              <BuildingPopup
                name={f.properties.name}
                description={f.properties.description}
                category={f.properties.category}
              />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
