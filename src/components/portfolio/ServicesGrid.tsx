import { useState } from "react";
import {
  Activity,
  Bone,
  Brain,
  Dumbbell,
  Hand,
  HeartPulse,
  ShieldPlus,
  Stethoscope,
  UserRound,
  Zap,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES, type ServiceIconName } from "@/data/portfolioData";

// Explicit, static mapping — no dynamic imports, bundler-safe.
const IconMap: Record<ServiceIconName, LucideIcon> = {
  Activity,
  Bone,
  Brain,
  UserRound,
  Stethoscope,
  ShieldPlus,
  HeartPulse,
  Dumbbell,
  Hand,
  Zap,
  Target,
};

export function ServicesGrid() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-24 bg-background py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Services
          </p>
          <h2
            id="services-heading"
            className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Comprehensive rehabilitation, tailored to you.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            From acute sports injuries to long-term neurological recovery — each
            program is built around your goals and condition.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = IconMap[service.icon] ?? Activity;
            // Responsive visibility: hide if not expanded and index >= 3 on mobile, or index >= 6 on desktop
            const isHidden = !isExpanded && (index >= 3) || (!isExpanded && index >= 6 && "md:hidden");
            return (
              <article
                key={service.title}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 border-border/50 bg-white p-8 transition-all duration-300 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-2 ${
                  !isExpanded && index >= 3 ? "hidden" : ""
                } ${!isExpanded && index >= 6 ? "md:hidden" : ""}`}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-primary/10 to-accent/5 blur-3xl" />
                </div>
                
                <div
                  className="relative grid h-14 w-14 place-items-center rounded-xl text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-primary/40"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <Icon size={26} strokeWidth={1.5} />
                </div>
                
                <h3 className="relative mt-7 font-display text-xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                  {service.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                  {service.description}
                </p>
                
                <div className="relative mt-6 h-1 w-12 bg-gradient-to-r from-primary/40 to-transparent transition-all duration-300 group-hover:w-full group-hover:from-primary/80" />
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            size="lg"
            className="rounded-full border-2 border-primary bg-background px-8 py-6 font-semibold text-primary transition-all hover:bg-primary hover:text-white hover:shadow-lg hover:-translate-y-1"
          >
            {isExpanded ? "Show Less Services" : "View More Services"}
          </Button>
        </div>
      </div>
    </section>
  );
}
