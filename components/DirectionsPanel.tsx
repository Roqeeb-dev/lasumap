import { useState, useEffect } from "react";
import type { Feature } from "@/types/buildings";
import type { RouteResult } from "@/lib/directions";
import PanelHeader from "./directions/PanelHeader";
import RouteHeader from "./directions/RouteHeader";
import DirectionsForm from "./directions/DirectionsForm";
import EmptyState from "./directions/EmptyState";
import StepsList from "./directions/StepsList";

interface DirectionsPanelProps {
  buildings: Feature[];
  route: RouteResult | null;
  loading: boolean;
  onGetDirections: (origin: Feature, destination: Feature) => void;
  onClose: () => void;
  onStartNavigation?: (destination: Feature) => void;
}

export default function DirectionsPanel({
  buildings,
  route,
  loading,
  onGetDirections,
  onClose,
  onStartNavigation,
}: DirectionsPanelProps) {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [editing, setEditing] = useState(true);

  const originFeature = buildings.find((b) => b.properties.id === origin);
  const destinationFeature = buildings.find(
    (b) => b.properties.id === destination,
  );

  useEffect(() => {
    if (route) setEditing(false);
  }, [route]);

  function handleSubmit() {
    if (originFeature && destinationFeature) {
      onGetDirections(originFeature, destinationFeature);
    }
  }

  // Called when the user taps Start Navigation.
  // Passes the resolved destination Feature up to MapComponent.
  function handleStartNavigation() {
    if (destinationFeature && onStartNavigation) {
      onStartNavigation(destinationFeature);
    }
  }

  return (
    <div className="absolute top-4 right-4 bottom-4 z-[1000] w-96 bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl shadow-black/10 border border-white/70 overflow-hidden flex flex-col">
      <PanelHeader onClose={onClose} />

      {editing ? (
        <DirectionsForm
          buildings={buildings}
          origin={origin}
          destination={destination}
          loading={loading}
          onOriginChange={setOrigin}
          onDestinationChange={setDestination}
          onSubmit={handleSubmit}
        />
      ) : (
        <RouteHeader
          originName={originFeature?.properties.name}
          destinationName={destinationFeature?.properties.name}
          route={route}
          onEdit={() => setEditing(true)}
          onStartNavigation={
            onStartNavigation && destinationFeature
              ? handleStartNavigation
              : undefined
          }
        />
      )}

      {editing && !route && !loading && <EmptyState />}

      {route && route.steps.length > 0 && <StepsList steps={route.steps} />}
    </div>
  );
}
