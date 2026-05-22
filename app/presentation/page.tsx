"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { slides } from "@/slides/registry";

function PresentationInner() {
  const params = useSearchParams();
  const router = useRouter();
  const idx = Math.max(0, Math.min(Number(params.get("slide") ?? 0), slides.length - 1));
  const Slide = slides[idx];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        if (idx < slides.length - 1) router.push(`?slide=${idx + 1}`);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (idx > 0) router.push(`?slide=${idx - 1}`);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [idx, router]);

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-white">
      {/* slide area */}
      <div className="flex-1 overflow-hidden">
        <Slide />
      </div>

      {/* nav bar */}
      <div className="flex items-center justify-between px-8 py-3 bg-zinc-900 border-t border-zinc-800 text-sm text-zinc-400">
        <button
          onClick={() => router.push(`?slide=${idx - 1}`)}
          disabled={idx === 0}
          className="px-4 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Prev
        </button>

        <div className="flex gap-2 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => router.push(`?slide=${i}`)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === idx ? "bg-white" : "bg-zinc-600 hover:bg-zinc-400"
              }`}
            />
          ))}
          <span className="ml-3 text-zinc-500">
            {idx + 1} / {slides.length}
          </span>
        </div>

        <button
          onClick={() => router.push(`?slide=${idx + 1}`)}
          disabled={idx === slides.length - 1}
          className="px-4 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default function PresentationPage() {
  return (
    <Suspense>
      <PresentationInner />
    </Suspense>
  );
}
