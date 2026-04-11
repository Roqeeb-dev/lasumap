"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import buildings from "@/data/buildings.json";

export default function MapComponent() {
  return (
    <MapContainer center={[6.5123, 3.3456]} zoom={16} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {buildings.features.map((f) => (
        <Marker
          key={f.properties.id}
          position={[f.geometry.coordinates[1], f.geometry.coordinates[0]]}
        >
          <Popup>{f.properties.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
