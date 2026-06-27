import { useState, useRef, useEffect } from "react";
import type { Feature } from "@/types/buildings";
import type { RouteResult } from "@/lib/directions";
import { haversineDistance } from "@/lib/directions";

interface UseNavigationOptions {
  onPositionUpdate: (lng: number, lat: number) => void;
  onArrival: () => void;
}

export function useNavigation({
  onPositionUpdate,
  onArrival,
}: UseNavigationOptions) {
  const [navigating, setNavigating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [navDestination, setNavDestination] = useState<Feature | null>(null);

  // Refs so the watchPosition callback always sees current values
  // without stale closure issues
  const watchIdRef = useRef<number | null>(null);
  const routeRef = useRef<RouteResult | null>(null);
  const currentStepRef = useRef(0);
  const destRef = useRef<Feature | null>(null);

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  function startNavigation(dest: Feature, route: RouteResult) {
    if (!navigator.geolocation) return;

    routeRef.current = route;
    destRef.current = dest;
    setNavDestination(dest);
    setNavigating(true);
    setCurrentStep(0);
    currentStepRef.current = 0;

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        onPositionUpdate(longitude, latitude);

        const dest = destRef.current;
        if (!dest) return;

        const [destLng, destLat] = dest.geometry.coordinates;

        // Arrival check — within 15 metres of destination
        if (haversineDistance(latitude, longitude, destLat, destLng) < 15) {
          stopNavigation();
          onArrival();
          return;
        }

        // Step advancement — advance when within 20m of the next maneuver point
        const steps = routeRef.current?.steps ?? [];
        const nextStep = steps[currentStepRef.current + 1];
        if (nextStep?.maneuverLocation) {
          const [nLng, nLat] = nextStep.maneuverLocation;
          const distToNext = haversineDistance(latitude, longitude, nLat, nLng);
          if (distToNext < 20) {
            const next = Math.min(currentStepRef.current + 1, steps.length - 1);
            setCurrentStep(next);
            currentStepRef.current = next;
          }
        }
      },
      (err) => {
        if (err.code === 1) {
          console.error("Location permission denied — stopping navigation");
          stopNavigation();
          return;
        }
        console.warn(`GPS warning (code ${err.code}): ${err.message}`);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 3000,
        timeout: Infinity,
      },
    );

    watchIdRef.current = id;
  }

  function stopNavigation() {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    routeRef.current = null;
    destRef.current = null;
    setNavigating(false);
    setCurrentStep(0);
    setNavDestination(null);
  }

  return {
    navigating,
    currentStep,
    navDestination,
    startNavigation,
    stopNavigation,
  };
}
