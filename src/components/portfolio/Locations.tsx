import { Clock, MapPin, Navigation as NavIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLINICS } from "@/data/portfolioData";

export function Locations() {
  return (
    <section
      id="locations"
      aria-labelledby="locations-heading"
      className="scroll-mt-24 bg-muted/30 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Locations
          </p>
          <h2
            id="locations-heading"
            className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Three clinics across Islamabad.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Conveniently located clinics with flexible hours to fit your schedule.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {CLINICS.map((clinic, idx) => (
            <article
              key={clinic.name}
              className="group flex flex-col overflow-hidden rounded-2xl border-2 border-border/50 bg-white p-8 transition-all duration-300 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-2"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-white shadow-lg">
                <MapPin size={24} />
              </div>
              
              <h3 className="font-display text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                {clinic.name}
              </h3>
              
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {clinic.address}
              </p>

              <div className="mt-6 flex items-center gap-3 rounded-lg bg-primary/5 px-4 py-3 transition-all duration-300 group-hover:bg-primary/10">
                <Clock size={18} className="text-primary" />
                <span className="font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {clinic.hours}
                </span>
              </div>

              <div className="mt-6 flex-1" />

              <Button
                asChild
                className="mt-4 w-full rounded-full bg-primary/10 py-3 text-primary font-semibold transition-all hover:bg-primary hover:text-white"
              >
                <a href={clinic.mapsUrl} target="_blank" rel="noreferrer">
                  <NavIcon size={18} className="mr-2" /> Get Directions
                </a>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
