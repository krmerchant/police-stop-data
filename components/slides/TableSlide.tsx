"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const frameworks = [
  { name: "Next.js", language: "TypeScript", stars: "126k", routing: "App Router", ssr: true, rsc: true },
  { name: "Nuxt", language: "TypeScript", stars: "55k", routing: "File-based", ssr: true, rsc: false },
  { name: "SvelteKit", language: "TypeScript", stars: "19k", routing: "File-based", ssr: true, rsc: false },
  { name: "Remix", language: "TypeScript", stars: "30k", routing: "Nested", ssr: true, rsc: true },
  { name: "Astro", language: "TypeScript", stars: "48k", routing: "File-based", ssr: true, rsc: false },
  { name: "Angular", language: "TypeScript", stars: "96k", routing: "Module", ssr: true, rsc: false },
];

const Badge = ({ ok }: { ok: boolean }) => (
  <span
    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
      ok ? "bg-emerald-900 text-emerald-300" : "bg-zinc-800 text-zinc-500"
    }`}
  >
    {ok ? "Yes" : "No"}
  </span>
);

export default function TableSlide() {
  return (
    <div className="flex flex-col h-full px-12 py-8 gap-5">
      <div>
        <h2 className="text-3xl font-bold text-white">Structured Data</h2>
        <p className="text-zinc-400 mt-1">Framework comparison · shadcn/ui Table</p>
      </div>

      <div className="flex-1 rounded-xl border border-zinc-700 overflow-auto bg-zinc-900">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-700 hover:bg-zinc-800">
              <TableHead className="text-zinc-300 font-semibold">Framework</TableHead>
              <TableHead className="text-zinc-300 font-semibold">Language</TableHead>
              <TableHead className="text-zinc-300 font-semibold">GitHub Stars</TableHead>
              <TableHead className="text-zinc-300 font-semibold">Routing</TableHead>
              <TableHead className="text-zinc-300 font-semibold text-center">SSR</TableHead>
              <TableHead className="text-zinc-300 font-semibold text-center">RSC</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {frameworks.map((fw) => (
              <TableRow key={fw.name} className="border-zinc-800 hover:bg-zinc-800 transition-colors">
                <TableCell className="font-semibold text-white">{fw.name}</TableCell>
                <TableCell className="text-zinc-300">{fw.language}</TableCell>
                <TableCell className="text-zinc-300">{fw.stars}</TableCell>
                <TableCell className="text-zinc-400">{fw.routing}</TableCell>
                <TableCell className="text-center"><Badge ok={fw.ssr} /></TableCell>
                <TableCell className="text-center"><Badge ok={fw.rsc} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs text-zinc-600">Stars approximate as of 2025</p>
    </div>
  );
}
