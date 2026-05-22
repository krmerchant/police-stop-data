"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
} from "recharts";

// P(TRAFFIC_ARREST | suspicion stop, ETHNICITY)
// Suspicion = STOP_REASON_NONTICKET contains "Sus" (n=7,646 total, 406 arrests)
// "Unknown" and "Multiple" excluded
const data = [
  { ethnicity: "Hispanic/Latino", stops: 256,   arrests: 31,  rate: 12.11 },
  { ethnicity: "Asian",           stops: 22,    arrests: 2,   rate:  9.09 },
  { ethnicity: "Other",           stops: 15,    arrests: 1,   rate:  6.67 },
  { ethnicity: "White",           stops: 176,   arrests: 10,  rate:  5.68 },
  { ethnicity: "Black",           stops: 6826,  arrests: 352, rate:  5.16 },
];

const OVERALL_RATE = 5.31;

const BAR_COLORS: Record<string, string> = {
  "Hispanic/Latino": "#f59e0b",
  "Asian":           "#34d399",
  "Other":           "#a78bfa",
  "White":           "#22d3ee",
  "Black":           "#6366f1",
};

const CustomLabel = ({ x, y, width, value }: { x?: number; y?: number; width?: number; value?: number }) => {
  if (!value || !x || !y || !width) return null;
  return (
    <text x={x + width / 2} y={y - 6} fill="#a1a1aa" textAnchor="middle" fontSize={12}>
      {`${value.toFixed(1)}%`}
    </text>
  );
};

export default function ArrestBySuspicionSlide() {
  return (
    <div className="flex flex-col h-full px-12 py-8 gap-5">
      <div>
        <h2 className="text-3xl font-bold text-white">
          P(Traffic Arrest | Suspicion Stop*)
        </h2>
        <p className="text-zinc-400 mt-1">
          406 arrests across 7,646 suspicion stops · overall rate{" "}
          <span className="text-zinc-200 font-semibold">{OVERALL_RATE}%</span>
        </p>
      </div>

      <div className="flex-1 bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="35%">
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
              domain={[0, 15]}
            />
            <Tooltip
              contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: 8 }}
              labelStyle={{ color: "#e4e4e7" }}
              formatter={(v, _name, props) => {
                const rate = typeof v === "number" ? v.toFixed(2) : String(v);
                const payload = props?.payload as { stops?: number; arrests?: number } | undefined;
                return [
                  <span key="rate">
                    {rate}%
                    <span style={{ color: "#71717a", marginLeft: 8, fontSize: 11 }}>
                      ({payload?.arrests} / {payload?.stops} stops)
                    </span>
                  </span>,
                  "Arrest rate",
                ];
              }}
            />
            <ReferenceLine
              y={OVERALL_RATE}
              stroke="#f43f5e"
              strokeDasharray="5 4"
              label={{ value: `Overall ${OVERALL_RATE}%`, fill: "#f43f5e", fontSize: 11, position: "insideTopRight" }}
            />
            <Bar dataKey="rate" radius={[4, 4, 0, 0]} label={<CustomLabel />}>
              {data.map((row) => (
                <Cell key={row.ethnicity} fill={BAR_COLORS[row.ethnicity] ?? "#6366f1"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-1 text-xs text-zinc-500">
        <div className="flex gap-6">
          <p>
            <span className="text-amber-400 font-semibold">Hispanic/Latino: 12.11%</span>
            {" "}— 2.3× the Black rate and 2.1× the White rate among suspicion stops
          </p>
          <p className="text-zinc-600">
            Asian (n=22) and Other (n=15) — small samples; interpret with caution
          </p>
        </div>
        <p className="text-zinc-600">
          * Suspicion stop = <code className="text-zinc-500">STOP_REASON_NONTICKET</code> contains{" "}
          <code className="text-zinc-500">"Sus"</code> · "Unknown" (n=255) and "Multiple" (n=94) excluded
        </p>
      </div>
    </div>
  );
}
