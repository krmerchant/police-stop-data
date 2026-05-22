"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

const districts = [
  { id: "1D", name: "First District",   pos: [38.8941, -77.0020] as [number,number], stops: 11341, pct: 16.3 },
  { id: "2D", name: "Second District",  pos: [38.9205, -77.0494] as [number,number], stops: 9293,  pct: 13.3 },
  { id: "3D", name: "Third District",   pos: [38.9283, -77.0373] as [number,number], stops: 11177, pct: 16.0 },
  { id: "4D", name: "Fourth District",  pos: [38.9493, -77.0213] as [number,number], stops: 8097,  pct: 11.6 },
  { id: "5D", name: "Fifth District",   pos: [38.9131, -76.9835] as [number,number], stops: 11636, pct: 16.7 },
  { id: "6D", name: "Sixth District",   pos: [38.8718, -76.9816] as [number,number], stops: 9019,  pct: 12.9 },
  { id: "7D", name: "Seventh District", pos: [38.8518, -76.9563] as [number,number], stops: 9227,  pct: 13.2 },
];

const maxStops = Math.max(...districts.map(d => d.stops));

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
      {districts.map(({ id, name, pos, stops, pct }) => (
        <CircleMarker
          key={id}
          center={pos}
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
