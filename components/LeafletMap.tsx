"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";

const techHubs = [
  { name: "San Francisco", pos: [37.7749, -122.4194] as [number, number], companies: 1240 },
  { name: "New York", pos: [40.7128, -74.006] as [number, number], companies: 980 },
  { name: "London", pos: [51.5074, -0.1278] as [number, number], companies: 870 },
  { name: "Berlin", pos: [52.52, 13.405] as [number, number], companies: 540 },
  { name: "Tokyo", pos: [35.6762, 139.6503] as [number, number], companies: 710 },
  { name: "Singapore", pos: [1.3521, 103.8198] as [number, number], companies: 430 },
  { name: "Sydney", pos: [-33.8688, 151.2093] as [number, number], companies: 320 },
  { name: "Toronto", pos: [43.6532, -79.3832] as [number, number], companies: 460 },
];

export default function LeafletMap() {
  return (
    <MapContainer
      center={[20, 10]}
      zoom={2}
      style={{ height: "100%", width: "100%", borderRadius: "0.75rem" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {techHubs.map(({ name, pos, companies }) => (
        <CircleMarker
          key={name}
          center={pos}
          radius={Math.sqrt(companies) / 2}
          pathOptions={{ color: "#6366f1", fillColor: "#818cf8", fillOpacity: 0.7 }}
        >
          <Popup>
            <div style={{ background: "#18181b", color: "#e4e4e7", borderRadius: 6, padding: "6px 10px" }}>
              <strong>{name}</strong>
              <br />
              {companies.toLocaleString()} companies
            </div>
          </Popup>
        </CircleMarker>
      ))}
      {techHubs.map(({ name, pos }) => (
        <Marker key={`m-${name}`} position={pos}>
          <Popup>{name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
