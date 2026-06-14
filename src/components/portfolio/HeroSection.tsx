import { ArrowRight, CalendarClock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT, HERO } from "@/data/portfolioData";

export function HeroSection() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-background pt-8 pb-16 md:pt-16 md:pb-24"
    >
      <div className="absolute inset-x-0 -top-40 h-80 bg-gradient-to-b from-primary/8 to-transparent blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
        <div className="order-2 flex flex-col justify-center md:order-1">
          <div className="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 backdrop-blur-sm">
            <MapPin size={16} className="text-primary" /> Islamabad, Pakistan
          </div>

          <h1
            id="hero-heading"
            className="font-display text-4xl font-bold leading-none tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              {HERO.name}
            </span>
          </h1>

          <p className="mt-4 font-display text-lg font-semibold uppercase tracking-[0.15em] text-primary">
            {HERO.title}
          </p>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {HERO.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden rounded-full bg-primary px-8 py-3 text-white shadow-xl shadow-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 active:scale-95"
            >
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer">
                <CalendarClock className="mr-2 h-5 w-5" /> {HERO.ctaLabel}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-foreground/20 bg-background px-6 py-3 font-semibold text-foreground transition-all hover:border-primary hover:bg-primary/5"
            >
              <a href={HERO.oladocUrl} target="_blank" rel="noreferrer">
                View on Oladoc
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-foreground/20 bg-background px-6 py-3 font-semibold text-foreground transition-all hover:border-primary hover:bg-primary/5"
            >
              <a href={HERO.marhamUrl} target="_blank" rel="noreferrer">
                View on Marham
              </a>
            </Button>
          </div>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-sm md:order-2">
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-tr from-primary/15 via-accent/10 to-primary-glow/15 blur-3xl" />
          <div className="absolute -right-4 -top-4 hidden h-28 w-28 rounded-3xl border border-primary/20 bg-white/40 backdrop-blur-md md:block" />
          <div className="absolute -bottom-4 -left-4 hidden h-20 w-20 rounded-2xl border border-accent/20 bg-white/40 backdrop-blur-md md:block" />
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl">
            <img
              src="/doc-farhan.png"
              alt={`Headshot of ${HERO.name}`}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}