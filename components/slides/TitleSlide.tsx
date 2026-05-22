export default function TitleSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-12 text-center">
      <div className="flex flex-col gap-4">
        <p className="text-zinc-500 text-sm font-semibold uppercase tracking-widest">
          DC Metropolitan Police Department
        </p>
        <h1 className="text-6xl font-extrabold tracking-tight text-white">
          Stop Data Analysis
        </h1>
        <p className="text-2xl text-zinc-400 font-light">
          2023 – 2025 · 182,490 stops
        </p>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-6 text-sm">
        {[
          { label: "Total Stops", value: "182,490" },
          { label: "Pedestrian Stops", value: "131" },
          { label: "Districts", value: "7" },
          { label: "Years Covered", value: "3" },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1 p-5 rounded-xl bg-zinc-800 border border-zinc-700"
          >
            <span className="text-3xl font-bold text-indigo-400">{value}</span>
            <span className="text-zinc-400">{label}</span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-zinc-500 text-sm">
        Use ← → arrow keys or Space to navigate
      </p>
    </div>
  );
}
