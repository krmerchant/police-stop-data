"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-zinc-500">
      Loading map…
    </div>
  ),
});

export default function MapSlide() {
  return (
    <div className="flex flex-col h-full px-12 py-8 gap-5">
      <div>
        <h2 className="text-3xl font-bold text-white">Geographic Data</h2>
        <p className="text-zinc-400 mt-1">
          Global tech hubs — circle size proportional to company count · React-Leaflet
        </p>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border border-zinc-700">
        <LeafletMap />
      </div>
    </div>
  );
}
