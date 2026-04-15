"use client";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  Source,
  Layer,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import buildings from "@/data/buildings.json";
import { useState, useRef } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import BuildingPopup from "@/components/BuildingPopup";
import LocateButton from "@/components/LocateButton";
import DirectionsPanel from "@/components/DirectionsPanel";
import type { Feature } from "@/types/buildings";
import type { MapRef } from "react-map-gl/mapbox";
import type { LayerProps } from "react-map-gl/mapbox";
import { MapPin, Navigation } from "lucide-react";
import { getRoute } from "@/lib/directions";
import type { RouteResult } from "@/lib/directions";

type SelectedBuilding = Feature | null;

const routeLayer: LayerProps = {
  id: "route",
  type: "line",
  layout: { "line-join": "round", "line-cap": "round" },
  paint: { "line-color": "#3b82f6", "line-width": 5, "line-opacity": 0.85 },
};

export default function MapComponent() {
  const mapRef = useRef<MapRef>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState<SelectedBuilding>(null);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null,
  );
  const [locating, setLocating] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);

  const visibleFeatures = buildings.features.filter((f) =>
    activeCategory === "all" ? true : f.properties.category === activeCategory,
  );

  const results = query.trim()
    ? buildings.features.filter((f) =>
        f.properties.name.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  function flyTo(lng: number, lat: number, zoom = 19) {
    mapRef.current?.flyTo({ center: [lng, lat], zoom, duration: 1200 });
  }

  function handleSelect(feature: Feature) {
    const [lng, lat] = feature.geometry.coordinates;
    setActiveCategory("all");
    setQuery("");
    flyTo(lng, lat);
    setTimeout(() => setSelected(feature), 1300);
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
        setUserPosition([longitude, latitude]);
        flyTo(longitude, latitude);
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

  async function handleGetDirections(origin: Feature, destination: Feature) {
    setRouteLoading(true);
    setRoute(null);

    const originCoords: [number, number] = [
      origin.geometry.coordinates[0],
      origin.geometry.coordinates[1],
    ];
    const destCoords: [number, number] = [
      destination.geometry.coordinates[0],
      destination.geometry.coordinates[1],
    ];

    const result = await getRoute(
      originCoords,
      destCoords,
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN!,
    );

    setRoute(result);
    setRouteLoading(false);

    // Fit map to show the full route
    if (result) {
      const coords = result.geometry.coordinates as [number, number][];
      const lngs = coords.map((c) => c[0]);
      const lats = coords.map((c) => c[1]);
      mapRef.current?.fitBounds(
        [
          [Math.min(...lngs), Math.min(...lats)],
          [Math.max(...lngs), Math.max(...lats)],
        ],
        { padding: 80, duration: 1200 },
      );
    }
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

      {/* Directions toggle button */}
      <button
        onClick={() => {
          setShowDirections((v) => !v);
          setRoute(null);
        }}
        className="absolute bottom-20 right-16 z-[1000] bg-white hover:bg-gray-50
          shadow-xl border border-gray-100 rounded-xl p-3 transition-all active:scale-95"
        title="Directions"
      >
        <Navigation size={18} className="text-blue-500" />
      </button>

      {showDirections && (
        <DirectionsPanel
          buildings={buildings.features as Feature[]}
          route={route}
          loading={routeLoading}
          onGetDirections={handleGetDirections}
          onClose={() => {
            setShowDirections(false);
            setRoute(null);
          }}
        />
      )}

      <Map
        ref={mapRef}
        initialViewState={{ longitude: 3.201, latitude: 6.4666, zoom: 16 }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        <NavigationControl position="bottom-right" />

        {/* Route line */}
        {route && (
          <Source
            id="route"
            type="geojson"
            data={{ type: "Feature", geometry: route.geometry, properties: {} }}
          >
            <Layer {...routeLayer} />
          </Source>
        )}

        {/* User position */}
        {userPosition && (
          <Marker
            longitude={userPosition[0]}
            latitude={userPosition[1]}
            anchor="center"
          >
            <div className="w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-lg ring-4 ring-blue-500/25" />
          </Marker>
        )}

        {/* Building markers */}
        {visibleFeatures.map((f) => (
          <Marker
            key={f.properties.id}
            longitude={f.geometry.coordinates[0]}
            latitude={f.geometry.coordinates[1]}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelected(f as Feature);
            }}
          >
            <MapPin
              size={28}
              className="text-blue-600 drop-shadow cursor-pointer hover:text-blue-800 hover:scale-110 transition-transform"
              fill="white"
            />
          </Marker>
        ))}

        {/* Popup */}
        {selected && (
          <Popup
            longitude={selected.geometry.coordinates[0]}
            latitude={selected.geometry.coordinates[1]}
            anchor="top"
            offset={10}
            onClose={() => setSelected(null)}
            closeButton={true}
            closeOnClick={false}
          >
            <BuildingPopup
              name={selected.properties.name}
              description={selected.properties.description}
              category={selected.properties.category}
            />
          </Popup>
        )}
      </Map>
    </div>
  );
}
