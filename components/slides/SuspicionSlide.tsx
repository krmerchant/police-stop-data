"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// P(ETHNICITY | suspicion stop) vs P(ETHNICITY | all stops)
// Suspicion defined as STOP_REASON_NONTICKET contains "Sus" — matches R script grepl("Sus", ...)
// n=7,646 suspicion stops out of 182,490 total
// "Unknown" excluded (no demographic signal)
const data = [
  { ethnicity: "Black",           pSuspicion: 89.28, pAll: 72.23 },
  { ethnicity: "Hispanic/Latino", pSuspicion:  3.35, pAll:  8.03 },
  { ethnicity: "White",           pSuspicion:  2.30, pAll: 10.09 },
  { ethnicity: "Multiple",        pSuspicion:  1.23, pAll:  1.13 },
  { ethnicity: "Asian",           pSuspicion:  0.29, pAll:  1.04 },
  { ethnicity: "Other",           pSuspicion:  0.20, pAll:  0.42 },
];

const TOOLTIP_STYLE = {
  contentStyle: { background: "#18181b", border: "1px solid #3f3f46", borderRadius: 8 },
  labelStyle: { color: "#e4e4e7" },
  formatter: (v: unknown, name: unknown) => [
    `${(v as number).toFixed(2)}%`,
    name === "pSuspicion" ? "P(E | Suspicion)" : "P(E | All stops)",
  ],
};

export default function SuspicionSlide() {
  return (
    <div className="flex flex-col h-full px-12 py-8 gap-5">
      <div>
        <h2 className="text-3xl font-bold text-white">
          P(Ethnicity | Pulled Over for Suspicion*)
        </h2>
        <p className="text-zinc-400 mt-1">
          7,646 suspicion stops vs 182,490 total
        </p>
      </div>

      <div className="flex-1 bg-zinc-900 rounded-xl p-6 border border-zinc-800 flex flex-col gap-3">
        <div className="flex gap-6 text-sm mb-2">
          <span className="flex items-center gap-2 text-zinc-300">
            <span className="inline-block w-3 h-3 rounded-sm bg-indigo-500" />
            P(E | Suspicion stop)
          </span>
          <span className="flex items-center gap-2 text-zinc-300">
            <span className="inline-block w-3 h-3 rounded-sm bg-cyan-400" />
            P(E | All stops) — baseline
          </span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="25%" barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
            <XAxis
              dataKey="ethnicity"
              stroke="#71717a"
              tick={{ fill: "#a1a1aa", fontSize: 12 }}
            />
            <YAxis
              stroke="#71717a"
              tick={{ fill: "#a1a1aa" }}
              tickFormatter={(v) => `${v}%`}
              domain={[0, 95]}
            />
            <Tooltip {...TOOLTIP_STYLE} />
            <Bar dataKey="pSuspicion" name="pSuspicion" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pAll"       name="pAll"       fill="#22d3ee" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-1 text-xs text-zinc-500">
        <div className="flex gap-6">
          <p>
            <span className="text-indigo-400 font-semibold">Black: 89.3% of suspicion stops</span>{" "}
            vs 72.2% baseline — <span className="text-indigo-300">1.24× overrepresented</span>
          </p>
          <p>
            <span className="text-cyan-400 font-semibold">White: 2.3% of suspicion stops</span>{" "}
            vs 10.1% baseline — <span className="text-cyan-300">0.23× underrepresented</span>
          </p>
        </div>
        <p className="text-zinc-600">
          * "Suspicion stop" = <code className="text-zinc-500">STOP_REASON_NONTICKET</code> contains the substring{" "}
          <code className="text-zinc-500">"Sus"</code> — captures{" "}
          <em>"Suspicion of criminal activity (self-initiated)"</em> and any multi-reason entry including it.
        </p>
      </div>
    </div>
  );
}
