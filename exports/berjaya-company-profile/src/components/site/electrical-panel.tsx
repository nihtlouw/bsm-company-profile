import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const INITIAL = [true, false, true, true, false, false, true, false, true, true];

export function ElectricalPanel() {
  const [switches, setSwitches] = useState(INITIAL);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setSwitches((prev) => {
        const next = [...prev];
        const i = Math.floor(Math.random() * next.length);
        next[i] = !next[i];
        return next;
      });
    }, 1100);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const touch = "ontouchstart" in window;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (touch || reduce) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateX(${-py * 20}deg) rotateY(${px * 20}deg) scale(1.01)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const live = switches.filter(Boolean).length;

  return (
    <div className="panel-float">
      <div
        ref={cardRef}
        className={cn(
          "relative rounded-lg bg-linear-to-br from-navy-bright to-navy-mid p-6",
          "ring-1 ring-paper/15 shadow-panel will-change-transform",
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="pointer-events-none absolute inset-2.5 -right-3.5 -bottom-4 -z-10 rounded-lg bg-linear-to-br from-navy-mid to-navy opacity-65"
          aria-hidden
        />
        <p className="text-xs font-bold tracking-wide text-on-navy-muted">
          PANEL UTAMA · 3 FASA
        </p>
        <p className="mt-1.5 font-sans text-2xl font-extrabold tabular-nums text-brand-mist">
          380.2 V
        </p>
        <div className="mt-5 grid grid-cols-5 gap-2.5">
          {switches.map((on, i) => (
            <div
              key={i}
              data-on={on ? "true" : "false"}
              className="aspect-square rounded-lg bg-navy-soft ring-1 ring-paper/10 transition-colors duration-500 data-[on=true]:bg-brand"
            />
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between text-xs font-semibold text-on-navy-muted">
          <span>PLN · GENSET · UPS</span>
          <span className="tabular-nums text-brand-mist">{live}/10 ON</span>
        </div>
      </div>
    </div>
  );
}
