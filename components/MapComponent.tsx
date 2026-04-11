"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import buildings from "@/data/buildings.json";

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

export default function MapComponent() {
  return (
    <MapContainer
      center={[6.466600486821916, 3.2010087980515363]}
      zoom={16}
      className="h-full w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {buildings.features.map((f) => (
        <Marker
          key={f.properties.id}
          position={[f.geometry.coordinates[1], f.geometry.coordinates[0]]}
          icon={defaultIcon}
        >
          <Popup>
            <strong>{f.properties.name}</strong>
            <br />
            {f.properties.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
