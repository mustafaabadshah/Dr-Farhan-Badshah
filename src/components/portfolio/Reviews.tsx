import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/lib/cms-store";

export function Reviews() {
  const { data } = useCMS();
  const { testimonials, contact } = data;

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="scroll-mt-24 bg-background py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Patient Testimonials
            </p>
            <h2
              id="reviews-heading"
              className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              What patients are saying.
            </h2>
          </div>
          <Button
            asChild
            className="shrink-0 rounded-full bg-primary px-6 py-3 text-white transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <a href={contact.googleBusinessUrl} target="_blank" rel="noreferrer">
              View All Reviews <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.id || t.name}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-border/50 bg-white p-6 transition-all duration-300 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
            >
              <div>
                <header className="flex items-start gap-4">
                  <div
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-sm font-bold text-white transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    {t.initial || t.name[0]}
                  </div>
                  <div className="flex-1 leading-tight">
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {t.name}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {t.reviewCount}
                    </div>
                  </div>
                </header>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < t.rating ? "fill-[#fbbc04] text-[#fbbc04]" : "text-muted-foreground/20"}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground/70">
                    {t.date}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-muted-foreground italic group-hover:text-foreground/90 transition-colors">
                  "{t.quote}"
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}