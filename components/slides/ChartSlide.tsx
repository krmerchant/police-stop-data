"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const monthlyData = [
  { month: "Jan", revenue: 42000, users: 1200 },
  { month: "Feb", revenue: 53000, users: 1800 },
  { month: "Mar", revenue: 61000, users: 2400 },
  { month: "Apr", revenue: 58000, users: 2100 },
  { month: "May", revenue: 74000, users: 3100 },
  { month: "Jun", revenue: 89000, users: 3800 },
  { month: "Jul", revenue: 95000, users: 4200 },
  { month: "Aug", revenue: 103000, users: 4900 },
];

const categoryData = [
  { category: "Web", q1: 40, q2: 55, q3: 70 },
  { category: "Mobile", q1: 30, q2: 45, q3: 60 },
  { category: "API", q1: 20, q2: 30, q3: 50 },
  { category: "Desktop", q1: 10, q2: 15, q3: 20 },
];

export default function ChartSlide() {
  return (
    <div className="flex flex-col h-full px-12 py-8 gap-6">
      <div>
        <h2 className="text-3xl font-bold text-white">Data Visualization</h2>
        <p className="text-zinc-400 mt-1">Powered by Recharts</p>
      </div>

      <div className="grid grid-cols-2 gap-6 flex-1">
        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800 flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-zinc-200">Monthly Revenue & Users</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="month" stroke="#71717a" tick={{ fill: "#a1a1aa" }} />
              <YAxis yAxisId="left" stroke="#71717a" tick={{ fill: "#a1a1aa" }} />
              <YAxis yAxisId="right" orientation="right" stroke="#71717a" tick={{ fill: "#a1a1aa" }} />
              <Tooltip
                contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: 8 }}
                labelStyle={{ color: "#e4e4e7" }}
              />
              <Legend wrapperStyle={{ color: "#a1a1aa" }} />
              <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="users" stroke="#22d3ee" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800 flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-zinc-200">Quarterly Growth by Category</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="category" stroke="#71717a" tick={{ fill: "#a1a1aa" }} />
              <YAxis stroke="#71717a" tick={{ fill: "#a1a1aa" }} />
              <Tooltip
                contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: 8 }}
                labelStyle={{ color: "#e4e4e7" }}
              />
              <Legend wrapperStyle={{ color: "#a1a1aa" }} />
              <Bar dataKey="q1" name="Q1" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="q2" name="Q2" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="q3" name="Q3" fill="#a78bfa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
