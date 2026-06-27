import { useMemo } from "react";
import { Source, Layer } from "react-map-gl/mapbox";
import type { LayerProps } from "react-map-gl/mapbox";
import { haversineDistance } from "@/lib/directions";

interface RouteLayerProps {
  coordinates: [number, number][];
  userPosition: [number, number] | null;
  navigating: boolean;
}

const remainingLayer: LayerProps = {
  id: "route-remaining",
  type: "line",
  layout: { "line-join": "round", "line-cap": "round" },
  paint: { "line-color": "#3b82f6", "line-width": 5, "line-opacity": 0.9 },
};

const travelledLayer: LayerProps = {
  id: "route-travelled",
  type: "line",
  layout: { "line-join": "round", "line-cap": "round" },
  paint: { "line-color": "#94a3b8", "line-width": 4, "line-opacity": 0.6 },
};

function makeGeoJSON(coords: [number, number][]) {
  return {
    type: "Feature" as const,
    geometry: { type: "LineString" as const, coordinates: coords },
    properties: {},
  };
}

export default function RouteLayer({
  coordinates,
  userPosition,
  navigating,
}: RouteLayerProps) {
  // Find which coordinate in the route is closest to the user's position.
  // Only computed while navigating — otherwise just show the full line.
  const closestIndex = useMemo(() => {
    if (!navigating || !userPosition || coordinates.length === 0) return 0;
    let minDist = Infinity;
    let idx = 0;
    coordinates.forEach(([lng, lat], i) => {
      const d = haversineDistance(userPosition[1], userPosition[0], lat, lng);
      if (d < minDist) {
        minDist = d;
        idx = i;
      }
    });
    return idx;
  }, [userPosition, coordinates, navigating]);

  const travelledCoords = coordinates.slice(0, closestIndex + 1);
  const remainingCoords = navigating
    ? coordinates.slice(closestIndex)
    : coordinates;

  return (
    <>
      {/* Grey line for the part already walked — only shown during navigation */}
      {navigating && travelledCoords.length > 1 && (
        <Source
          id="route-travelled"
          type="geojson"
          data={makeGeoJSON(travelledCoords)}
        >
          <Layer {...travelledLayer} />
        </Source>
      )}

      {/* Blue line for the remaining route — always shown when a route exists */}
      {remainingCoords.length > 1 && (
        <Source
          id="route-remaining"
          type="geojson"
          data={makeGeoJSON(remainingCoords)}
        >
          <Layer {...remainingLayer} />
        </Source>
      )}
    </>
  );
}
