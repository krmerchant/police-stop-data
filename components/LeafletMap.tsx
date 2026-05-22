"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import districtData from "@/public/data/stops_by_district.json";

const maxStops = Math.max(...districtData.map(d => d.stops));

export default function LeafletMap() {
  return (
    <MapContainer
      center={[38.9072, -77.0369]}
      zoom={11}
      style={{ height: "100%", width: "100%", borderRadius: "0.75rem" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {districtData.map(({ id, name, lat, lng, stops, pct }) => (
        <CircleMarker
          key={id}
          center={[lat, lng]}
          radius={10 + (stops / maxStops) * 28}
          pathOptions={{ color: "#6366f1", fillColor: "#818cf8", fillOpacity: 0.75, weight: 2 }}
        >
          <Popup>
            <div style={{ background: "#18181b", color: "#e4e4e7", borderRadius: 6, padding: "8px 12px", minWidth: 140 }}>
              <strong style={{ fontSize: 14 }}>{id} – {name}</strong>
              <br />
              <span style={{ color: "#a1a1aa" }}>{stops.toLocaleString()} stops</span>
              <br />
              <span style={{ color: "#818cf8" }}>{pct}% of all stops</span>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
