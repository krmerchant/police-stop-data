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

// Pedestrian stops (PEDESTRIAN=1) by year + ethnicity — n=131 total
const pedestrianByYear = [
  { year: "2023", Black: 19, White: 14, "Hispanic/Latino": 4 },
  { year: "2024", Black: 43, White: 7,  "Hispanic/Latino": 3 },
  { year: "2025", Black: 18, White: 5,  "Hispanic/Latino": 1 },
];

// Traffic stops (VEHICLE=1) by year + ethnicity — n=96,526 total
// 2025 is partial-year data
const trafficByYear = [
  { year: "2023", Black: 23865, White: 6741, "Hispanic/Latino": 3682, Asian: 780 },
  { year: "2024", Black: 22424, White: 4916, "Hispanic/Latino": 3814, Asian: 503 },
  { year: "2025", Black: 13475, White: 2664, "Hispanic/Latino": 2067, Asian: 256 },
];

const TOOLTIP_STYLE = {
  contentStyle: { background: "#18181b", border: "1px solid #3f3f46", borderRadius: 8 },
  labelStyle: { color: "#e4e4e7" },
};

const BARS = (
  <>
    <Bar dataKey="Black"           fill="#6366f1" radius={[4,4,0,0]} />
    <Bar dataKey="White"           fill="#22d3ee" radius={[4,4,0,0]} />
    <Bar dataKey="Hispanic/Latino" fill="#f59e0b" radius={[4,4,0,0]} />
    <Bar dataKey="Asian"           fill="#34d399" radius={[4,4,0,0]} />
  </>
);

export default function ChartSlide() {
  return (
    <div className="flex flex-col h-full px-12 py-8 gap-6">
      <div>
        <h2 className="text-3xl font-bold text-white">Stops by Race & Year</h2>
        <p className="text-zinc-400 mt-1">
          Pedestrian (PEDESTRIAN=1, n=131) vs Traffic (VEHICLE=1, n=96,526) · counts by ethnicity
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 flex-1">
        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800 flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-zinc-200">Pedestrian Stops</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pedestrianByYear}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="year" stroke="#71717a" tick={{ fill: "#a1a1aa" }} />
              <YAxis stroke="#71717a" tick={{ fill: "#a1a1aa" }} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ color: "#a1a1aa" }} />
              {BARS}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800 flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-zinc-200">
            Traffic Stops
            <span className="ml-2 text-xs font-normal text-zinc-500">* 2025 partial year</span>
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trafficByYear}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="year" stroke="#71717a" tick={{ fill: "#a1a1aa" }} />
              <YAxis stroke="#71717a" tick={{ fill: "#a1a1aa" }} tickFormatter={(v) => v >= 1000 ? `${v/1000}k` : v} />
              <Tooltip {...TOOLTIP_STYLE} formatter={(v: number) => v.toLocaleString()} />
              <Legend wrapperStyle={{ color: "#a1a1aa" }} />
              {BARS}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
