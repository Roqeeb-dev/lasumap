export type RouteStep = {
  instruction: string;
  distance: number;
  maneuverLocation?: [number, number];
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

  const steps: RouteStep[] = route.legs
    .flatMap((leg: any) => leg.steps)
    .map((step: any) => ({
      instruction: step.maneuver.instruction,
      distance: step.distance,
      maneuverLocation: step.maneuver.location as [number, number],
    }));

  return {
    geometry: route.geometry,
    duration: route.duration,
    distance: route.distance,
    steps,
  };
}

// Exported so RouteLayer and useNavigation can both use it
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
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
