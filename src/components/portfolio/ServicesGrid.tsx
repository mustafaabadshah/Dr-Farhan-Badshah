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
  ArrowRight,
  Filter,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCMS, type ServiceItem } from "@/lib/cms-store";
import type { ServiceIconName } from "@/data/portfolioData";

// Explicit static icon mapping
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

interface ServicesGridProps {
  onSelectService?: (serviceTitle: string) => void;
}

export function ServicesGrid({ onSelectService }: ServicesGridProps) {
  const { data } = useCMS();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Spine & Pain",
    "Sports Rehab",
    "Neuro & Geriatric",
    "Post-Surgery",
  ];

  const filteredServices =
    activeCategory === "All"
      ? data.services
      : data.services.filter((s) => s.category === activeCategory);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-24 bg-background py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Clinical Services & Specialties
            </p>
            <h2
              id="services-heading"
              className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              Comprehensive rehabilitation, tailored to you.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From acute sports injuries to post-surgical and neurological recovery — every treatment plan combines evidence-based manual therapy with targeted exercises.
            </p>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Showing <span className="font-bold text-foreground">{filteredServices.length}</span> specialties
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-border/40 pb-5">
          <span className="mr-2 hidden items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground sm:inline-flex">
            <Filter size={14} /> Filter:
          </span>
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? data.services.length
                : data.services.filter((s) => s.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setIsExpanded(true); // expand to show all matching category
                }}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/30"
                    : "border border-border/60 bg-muted/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Grid of Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service, index) => {
            const Icon = IconMap[service.icon] ?? Activity;
            // Responsive visibility: if not expanded and activeCategory is "All", show 3 on mobile, 6 on desktop
            const hideOnMobile = !isExpanded && activeCategory === "All" && index >= 3;
            const hideOnDesktop = !isExpanded && activeCategory === "All" && index >= 6;

            let visibilityClass = "";
            if (hideOnDesktop) {
              visibilityClass = "hidden";
            } else if (hideOnMobile) {
              visibilityClass = "hidden sm:flex";
            }

            return (
              <article
                key={service.id || service.title}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-border/50 bg-white p-7 transition-all duration-300 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-1.5 ${visibilityClass}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className="grid h-13 w-13 place-items-center rounded-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/30"
                      style={{ background: "var(--gradient-primary)" }}
                    >
                      <Icon size={24} strokeWidth={1.75} />
                    </div>
                    <span className="rounded-full bg-primary/5 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40">
                  <button
                    type="button"
                    onClick={() => onSelectService && onSelectService(service.title)}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:text-accent group/btn"
                  >
                    Book for this condition
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Expand/Collapse Button (only when "All" category has more items) */}
        {activeCategory === "All" && filteredServices.length > 6 && (
          <div className="mt-12 flex justify-center">
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              size="lg"
              className="rounded-full border-2 border-primary bg-background px-8 py-5 font-semibold text-primary transition-all hover:bg-primary hover:text-white hover:shadow-lg hover:-translate-y-0.5"
            >
              {isExpanded
                ? "Show Less Services"
                : `View All ${filteredServices.length} Specialty Treatments`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
