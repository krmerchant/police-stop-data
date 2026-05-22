export default function TitleSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-12 text-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl font-bold tracking-tight text-white">
          Tech Slideshow
        </h1>
        <p className="text-2xl text-zinc-400">
          Built with Next.js · Recharts · React-Leaflet · shadcn/ui
        </p>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-6 text-sm">
        {[
          { label: "Charts", icon: "📊", desc: "Recharts" },
          { label: "Maps", icon: "🗺️", desc: "React-Leaflet" },
          { label: "Tables", icon: "📋", desc: "shadcn/ui" },
          { label: "Routing", icon: "⚡", desc: "Next.js App Router" },
        ].map(({ label, icon, desc }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 p-5 rounded-xl bg-zinc-800 border border-zinc-700"
          >
            <span className="text-3xl">{icon}</span>
            <span className="font-semibold text-white">{label}</span>
            <span className="text-zinc-400">{desc}</span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-zinc-500 text-sm">
        Use ← → arrow keys or Space to navigate
      </p>
    </div>
  );
}
