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
} from "recharts";

// Stops by year and ethnicity — pedestrian stops (PEDESTRIAN=1)
const stopsByYear = [
  { year: "2023", Black: 19, White: 14, "Hispanic/Latino": 4 },
  { year: "2024", Black: 43, White: 7,  "Hispanic/Latino": 3 },
  { year: "2025", Black: 18, White: 5,  "Hispanic/Latino": 1 },
];

// Stops by district — count and proportion
const districtData = [
  { district: "1D", stops: 11341, pct: 16.3 },
  { district: "2D", stops: 9293,  pct: 13.3 },
  { district: "3D", stops: 11177, pct: 16.0 },
  { district: "4D", stops: 8097,  pct: 11.6 },
  { district: "5D", stops: 11636, pct: 16.7 },
  { district: "6D", stops: 9019,  pct: 12.9 },
  { district: "7D", stops: 9227,  pct: 13.2 },
];

const TOOLTIP_STYLE = {
  contentStyle: { background: "#18181b", border: "1px solid #3f3f46", borderRadius: 8 },
  labelStyle: { color: "#e4e4e7" },
};

export default function ChartSlide() {
  return (
    <div className="flex flex-col h-full px-12 py-8 gap-6">
      <div>
        <h2 className="text-3xl font-bold text-white">Pedestrian Stops by Race & Year</h2>
        <p className="text-zinc-400 mt-1">
          Where PEDESTRIAN=1 · counts by ethnicity per year
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 flex-1">
        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800 flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-zinc-200">Stop Count by Ethnicity & Year</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stopsByYear}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="year" stroke="#71717a" tick={{ fill: "#a1a1aa" }} />
              <YAxis stroke="#71717a" tick={{ fill: "#a1a1aa" }} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ color: "#a1a1aa" }} />
              <Bar dataKey="Black"           fill="#6366f1" radius={[4,4,0,0]} />
              <Bar dataKey="White"           fill="#22d3ee" radius={[4,4,0,0]} />
              <Bar dataKey="Hispanic/Latino" fill="#f59e0b" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800 flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-zinc-200">Stop Volume by Police District</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={districtData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis type="number" stroke="#71717a" tick={{ fill: "#a1a1aa" }} />
              <YAxis dataKey="district" type="category" stroke="#71717a" tick={{ fill: "#a1a1aa" }} width={32} />
              <Tooltip {...TOOLTIP_STYLE} formatter={(v: number) => v.toLocaleString()} />
              <Bar dataKey="stops" name="Stops" fill="#8b5cf6" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
