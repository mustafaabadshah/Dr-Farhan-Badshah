import { BadgeCheck, GraduationCap, MapPin, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/lib/cms-store";

export function AboutSection() {
  const { data } = useCMS();
  const { bio, qualifications, certifications, contact, stats } = data;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 bg-muted/40 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Stats Row */}
        {stats && stats.length > 0 && (
          <div className="mb-20 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl border border-border/50 bg-white/90 p-6 text-center shadow-sm backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="font-display text-3xl font-extrabold text-primary sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm font-semibold text-foreground">
                  {s.label}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {s.description}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid gap-16 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <div>
            <div className="mb-2 inline-block">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">About</span>
            </div>
            <h2
              id="about-heading"
              className="mb-8 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              Clinical care, grounded in evidence.
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              {bio.map((p, i) => (
                <p key={i} className="border-l-4 border-primary/20 pl-5 transition-colors hover:border-primary/60">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10">
              <Button
                asChild
                className="rounded-full bg-primary px-8 py-3 text-white shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <a href={contact.googleBusinessUrl} target="_blank" rel="noreferrer">
                  <MapPin className="mr-2 h-5 w-5" /> View Google Business Profile
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <GraduationCap className="text-primary" size={24} />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Qualifications
                </h3>
              </div>

              {/* Vertical Timeline */}
              <div className="border-l-2 border-primary/20 ml-3 space-y-8">
                {qualifications.map((q) => {
                  const hasDisplayableYear =
                    q.year &&
                    !["completed", "ongoing"].includes(
                      q.year.trim().toLowerCase()
                    );
                  return (
                    <div key={q.id || q.title} className="relative pl-8">
                      <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-primary shadow-md shadow-primary/30" />
                      <div className="rounded-2xl border-2 border-border/40 bg-white p-5 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/15">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-foreground">{q.title}</div>
                            <div className="mt-1 text-sm text-muted-foreground">
                              {q.institution}
                            </div>
                          </div>
                          {hasDisplayableYear && (
                            <div className="rounded-lg bg-primary/10 px-3 py-1 text-sm font-bold text-primary whitespace-nowrap shrink-0">
                              {q.year}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <BadgeCheck className="text-primary" size={24} />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Certifications
                </h3>
              </div>

              {/* Vertical Timeline */}
              <div className="border-l-2 border-primary/20 ml-3 space-y-6">
                {certifications.map((c) => (
                  <div key={c.id || c.title} className="relative pl-8">
                    <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-primary shadow-md shadow-primary/30" />
                    <div className="flex items-start gap-3 rounded-xl bg-white/60 px-4 py-3 backdrop-blur-sm transition-all hover:bg-white hover:shadow-md hover:shadow-primary/10">
                      <div className="mt-0.5 shrink-0">
                        <BadgeCheck size={18} className="text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-foreground">{c.title}</div>
                        <div className="text-sm text-muted-foreground">{c.issuer}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}