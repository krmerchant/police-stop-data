"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// P(TRAFFIC_ARREST | ETHNICITY) — all 182,490 stops
// "Multiple" excluded: it flags multi-person stops, not a true ethnicity group
// "Unknown" excluded: no demographic signal
const arrestRates = [
  { ethnicity: "Black",            stops: 131812, arrests: 7198, rate: 5.46 },
  { ethnicity: "Hispanic/Latino",  stops: 14650,  arrests: 1280, rate: 8.74 },
  { ethnicity: "White",            stops: 18416,  arrests: 337,  rate: 1.83 },
  { ethnicity: "Other",            stops: 771,    arrests: 52,   rate: 6.74 },
  { ethnicity: "Asian",            stops: 1902,   arrests: 20,   rate: 1.05 },
  { ethnicity: "Am. Indian",       stops: 64,     arrests: 2,    rate: 3.12 },
];

const BAR_COLORS: Record<string, string> = {
  "Black":           "#6366f1",
  "Hispanic/Latino": "#f59e0b",
  "White":           "#22d3ee",
  "Other":           "#a78bfa",
  "Asian":           "#34d399",
  "Am. Indian":      "#fb923c",
};

export default function TableSlide() {
  return (
    <div className="flex flex-col h-full px-12 py-8 gap-5">
      <div>
        <h2 className="text-3xl font-bold text-white">P(Traffic Arrest | Ethnicity)</h2>
        <p className="text-zinc-400 mt-1">
          All 182,490 stops · <span className="text-zinc-500 text-sm">"Multiple" and "Unknown" excluded — see notes</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 flex-1">
        {/* bar chart */}
        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800 flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-zinc-200">Arrest Rate (%)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={arrestRates}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis
                dataKey="ethnicity"
                stroke="#71717a"
                tick={{ fill: "#a1a1aa", fontSize: 11 }}
                interval={0}
              />
              <YAxis
                stroke="#71717a"
                tick={{ fill: "#a1a1aa" }}
                tickFormatter={(v) => `${v}%`}
                domain={[0, 10]}
              />
              <Tooltip
                contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: 8 }}
                labelStyle={{ color: "#e4e4e7" }}
                formatter={(v: unknown) => [`${(v as number).toFixed(2)}%`, "Arrest rate"]}
              />
              <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                {arrestRates.map((row) => (
                  <Cell key={row.ethnicity} fill={BAR_COLORS[row.ethnicity] ?? "#6366f1"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* summary table */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-700 overflow-auto flex flex-col p-5">
          <h3 className="text-lg font-semibold text-zinc-200 mb-4">Summary Table</h3>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-700 hover:bg-zinc-800">
                <TableHead className="text-zinc-300 font-semibold">Ethnicity</TableHead>
                <TableHead className="text-zinc-300 font-semibold text-right">Stops</TableHead>
                <TableHead className="text-zinc-300 font-semibold text-right">Arrests</TableHead>
                <TableHead className="text-zinc-300 font-semibold text-right">Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {arrestRates.map((row) => (
                <TableRow key={row.ethnicity} className="border-zinc-800 hover:bg-zinc-800">
                  <TableCell className="font-medium text-white">{row.ethnicity}</TableCell>
                  <TableCell className="text-zinc-300 text-right">{row.stops.toLocaleString()}</TableCell>
                  <TableCell className="text-zinc-300 text-right">{row.arrests.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className="font-semibold"
                      style={{ color: BAR_COLORS[row.ethnicity] ?? "#a1a1aa" }}
                    >
                      {row.rate.toFixed(2)}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-auto pt-4 text-xs text-zinc-600 space-y-1">
            <p><span className="text-zinc-500 font-medium">Excluded — "Multiple":</span> flags multi-person stops (n=2,067); not a demographic group. Inflated rate (26.95%) driven by group-incident charges.</p>
            <p><span className="text-zinc-500 font-medium">Excluded — "Unknown":</span> no demographic signal (n=12,790).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
