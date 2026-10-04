import { useState } from "react";
import { Reveal } from "@/components/site/reveal";
import { FAQ } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [open, setOpen] = useState<string | null>(FAQ[0]?.id ?? null);

  return (
    <section id="faq" className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="text-2xl md:text-[1.9rem]">Pertanyaan umum</h2>
        <p className="mt-1.5 text-sm text-muted">
          Jawaban singkat sebelum tender, onboarding vendor, atau survey lapangan.
        </p>
        <Reveal className="mt-7 divide-y divide-line rounded-lg border border-line bg-card">
          {FAQ.map((item) => {
            const expanded = open === item.id;
            return (
              <div key={item.id}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold"
                    onClick={() => setOpen(expanded ? null : item.id)}
                  >
                    {item.q}
                    <span className={cn("text-lg font-medium text-muted", expanded && "text-brand")}>
                      {expanded ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  className={cn(
                    "overflow-hidden px-5 text-sm leading-relaxed text-muted transition-[max-height] duration-200",
                    expanded ? "max-h-40 pb-4" : "max-h-0",
                  )}
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
