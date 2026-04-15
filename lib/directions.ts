export type RouteStep = {
  instruction: string;
  distance: number; // metres
};

export type RouteResult = {
  geometry: GeoJSON.LineString;
  duration: number;
  distance: number;
  steps: RouteStep[];
};

export async function getRoute(
  origin: [number, number],
  destination: [number, number],
  token: string,
): Promise<RouteResult | null> {
  const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?geometries=geojson&steps=true&banner_instructions=true&access_token=${token}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.routes || data.routes.length === 0) return null;

  const route = data.routes[0];

  // Flatten all steps from all legs into one array
  const steps: RouteStep[] = route.legs
    .flatMap((leg: any) => leg.steps)
    .map((step: any) => ({
      instruction: step.maneuver.instruction,
      distance: step.distance,
    }));

  return {
    geometry: route.geometry,
    duration: route.duration,
    distance: route.distance,
    steps,
  };
}

export function formatETA(seconds: number): string {
  const mins = Math.round(seconds / 60);
  if (mins < 1) return "Less than a minute";
  return `${mins} min${mins !== 1 ? "s" : ""} walking`;
}

export function formatDistance(metres: number): string {
  if (metres < 1000) return `${Math.round(metres)}m`;
  return `${(metres / 1000).toFixed(1)}km`;
}
