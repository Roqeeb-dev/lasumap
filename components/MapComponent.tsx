"use client";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import buildings from "@/data/buildings.json";
import { useState, useRef, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import BuildingPopup from "@/components/BuildingPopup";
import LocateButton from "@/components/LocateButton";
import DirectionsPanel from "@/components/DirectionsPanel";
import RouteLayer from "./RouteLayer";
import NavigationBanner from "./NavigationBanner";
import { useNavigation } from "./hooks/useNavigation";
import type { Feature } from "@/types/buildings";
import type { MapRef } from "react-map-gl/mapbox";
import { MapPin, Navigation } from "lucide-react";
import { getRoute } from "@/lib/directions";
import { useMapStore } from "@/store/mapStore";

export default function MapComponent() {
  const mapRef = useRef<MapRef>(null);
  const [query, setQuery] = useState("");
  const [locating, setLocating] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);

  const {
    selectedBuilding,
    activeCategory,
    userPosition,
    route,
    navigating: storeNavigating,
    setSelectedBuilding,
    setActiveCategory,
    setUserPosition,
    setRoute,
    setNavigating,
    setGpsStatus,
    setLocateFn,
    setStartNavigationFn,
  } = useMapStore();

  const {
    navigating: hookNavigating,
    currentStep,
    navDestination,
    startNavigation,
    stopNavigation,
  } = useNavigation({
    onPositionUpdate: (lng, lat) => {
      setUserPosition([lng, lat]);
      mapRef.current?.easeTo({ center: [lng, lat], duration: 500 });
    },
    onArrival: () => {
      setRoute(null);
    },
  });

  useEffect(() => {
    setNavigating(hookNavigating);
  }, [hookNavigating, setNavigating]);

  useEffect(() => {
    setLocateFn(() => handleLocate);
    setStartNavigationFn((destination: Feature) =>
      handleStartNavigation(destination),
    );
  }, [setLocateFn, setStartNavigationFn]);

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
    setTimeout(() => setSelectedBuilding(feature), 1300);
  }

  function handleLocate() {
    if (!navigator.geolocation) {
      setGpsStatus("off");
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setGpsStatus("active");
        setUserPosition([longitude, latitude]);
        flyTo(longitude, latitude);
        setLocating(false);
      },
      (err) => {
        setGpsStatus("weak");
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

  function handleStartNavigation(destination: Feature) {
    const currentRoute = useMapStore.getState().route;
    if (!currentRoute) return;
    setShowDirections(false);

    const currentUserPosition = useMapStore.getState().userPosition;
    if (currentUserPosition) {
      mapRef.current?.flyTo({
        center: currentUserPosition,
        zoom: 18,
        duration: 800,
      });
    }

    startNavigation(destination, currentRoute);
  }

  function handleStopNavigation() {
    stopNavigation();
    setRoute(null);
  }

  const activeNavigation = hookNavigating || storeNavigating;
  const routeCoordinates = route
    ? (route.geometry.coordinates as [number, number][])
    : [];

  return (
    <div className="relative h-full w-full">
      {/* Hide search / filter / buttons during active navigation to keep UI clean */}
      {!activeNavigation && (
        <>
          <SearchBar
            query={query}
            results={results}
            onChange={setQuery}
            onSelect={handleSelect}
          />
          <CategoryFilter
            active={activeCategory}
            onChange={setActiveCategory}
          />
          <LocateButton loading={locating} onClick={handleLocate} />

          <button
            onClick={() => {
              setShowDirections((v) => !v);
              setRoute(null);
            }}
            title="Directions"
            className="absolute bottom-20 right-20 md:right-24 z-[1000] flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white hover:bg-gray-50 border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          >
            <Navigation className="w-5 h-5 text-blue-500" />
          </button>
        </>
      )}

      {/* Directions panel — hidden once navigation starts */}
      {showDirections && !activeNavigation && (
        <DirectionsPanel
          buildings={buildings.features as Feature[]}
          route={route}
          loading={routeLoading}
          onGetDirections={handleGetDirections}
          onStartNavigation={handleStartNavigation}
          onClose={() => {
            setShowDirections(false);
            setRoute(null);
          }}
        />
      )}

      {/* Floating instruction banner — only shown during navigation */}
      {activeNavigation && route && navDestination && (
        <NavigationBanner
          steps={route.steps}
          currentStep={currentStep}
          destinationName={navDestination.properties.name}
          onStop={handleStopNavigation}
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

        {/* Route line — splits into grey (walked) + blue (remaining) when navigating */}
        {route && (
          <RouteLayer
            coordinates={routeCoordinates}
            userPosition={userPosition}
            navigating={activeNavigation}
          />
        )}

        {/* User position dot */}
        {userPosition && (
          <Marker
            longitude={userPosition[0]}
            latitude={userPosition[1]}
            anchor="center"
          >
            <div className="w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-lg ring-4 ring-blue-500/25" />
          </Marker>
        )}

        {/* Building markers — hidden during navigation to reduce clutter */}
        {!activeNavigation &&
          visibleFeatures.map((f) => (
            <Marker
              key={f.properties.id}
              longitude={f.geometry.coordinates[0]}
              latitude={f.geometry.coordinates[1]}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setSelectedBuilding(f as Feature);
              }}
            >
              <MapPin
                size={28}
                className="text-blue-600 drop-shadow cursor-pointer hover:text-blue-800 hover:scale-110 transition-transform"
                fill="white"
              />
            </Marker>
          ))}

        {/* Building popup */}
        {selectedBuilding && (
          <Popup
            longitude={selectedBuilding.geometry.coordinates[0]}
            latitude={selectedBuilding.geometry.coordinates[1]}
            anchor="top"
            offset={10}
            onClose={() => setSelectedBuilding(null)}
            closeButton={true}
            closeOnClick={false}
          >
            <BuildingPopup
              name={selectedBuilding.properties.name}
              description={selectedBuilding.properties.description}
              category={selectedBuilding.properties.category}
            />
          </Popup>
        )}
      </Map>
    </div>
  );
}
