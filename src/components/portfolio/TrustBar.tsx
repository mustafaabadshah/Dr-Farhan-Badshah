import { ShieldCheck } from "lucide-react";
import { LICENSES } from "@/data/portfolioData";

export function TrustBar() {
  return (
    <section
      aria-label="Professional licenses"
      className="relative z-10 mx-auto -mt-6 max-w-5xl px-4 sm:-mt-8 sm:px-6"
    >
      <div className="flex items-center gap-6 overflow-x-auto rounded-3xl border border-white/40 bg-white/80 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl md:justify-center md:gap-10 md:p-6">
        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Internationally Licensed
        </span>
        <span className="hidden h-8 w-px bg-border/60 md:block" />
        {LICENSES.map((l) => (
          <div
            key={l.code}
            className="flex shrink-0 items-center gap-3 rounded-2xl px-2 py-1 transition-transform hover:-translate-y-0.5"
          >
            <ShieldCheck size={20} className="shrink-0 text-primary-glow" />
            <div className="leading-tight">
              <div className="text-sm font-bold tracking-tight text-foreground">
                {l.code}
              </div>
              <div className="text-[11px] font-medium text-muted-foreground/80">
                {l.region}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
