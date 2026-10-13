import { useState, useEffect } from "react";
import { Clock, MapPin, Navigation as NavIcon, Calendar, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCMS, type ClinicItem } from "@/lib/cms-store";

interface LocationsProps {
  onSelectClinic?: (clinicName: string) => void;
}

function getClinicStatus(clinic: ClinicItem) {
  // Get current Pakistan hour (UTC + 5)
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const pakistanTime = new Date(utc + 3600000 * 5);
  const currentHour = pakistanTime.getHours() + pakistanTime.getMinutes() / 60;
  const dayOfWeek = pakistanTime.getDay(); // 0 is Sunday

  // If Sunday, clinics may be closed
  if (dayOfWeek === 0) {
    return {
      isOpen: false,
      badgeText: "Closed Sunday",
      colorClass: "bg-slate-100 text-slate-700 border-slate-300",
      dotClass: "bg-slate-400",
    };
  }

  if (currentHour >= clinic.openHour && currentHour < clinic.closeHour) {
    return {
      isOpen: true,
      badgeText: "Open Now",
      colorClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dotClass: "bg-emerald-500 animate-pulse",
    };
  } else if (currentHour < clinic.openHour) {
    const formattedOpen = clinic.openHour > 12 ? `${clinic.openHour - 12}:00 PM` : `${clinic.openHour}:00 AM`;
    return {
      isOpen: false,
      badgeText: `Opens at ${formattedOpen}`,
      colorClass: "bg-amber-50 text-amber-700 border-amber-200",
      dotClass: "bg-amber-500",
    };
  } else {
    return {
      isOpen: false,
      badgeText: "Closed for Today",
      colorClass: "bg-slate-100 text-slate-600 border-slate-200",
      dotClass: "bg-slate-400",
    };
  }
}

export function Locations({ onSelectClinic }: LocationsProps) {
  const { data } = useCMS();
  const [, setTicker] = useState(0);

  // Update live status every minute
  useEffect(() => {
    const interval = setInterval(() => setTicker((t) => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="locations"
      aria-labelledby="locations-heading"
      className="scroll-mt-24 bg-muted/30 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Clinic Locations & Timings
            </p>
            <h2
              id="locations-heading"
              className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              Three premier clinics across Islamabad.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Consult Dr. Farhan at your nearest Islamabad center during scheduled clinical hours. Live operating status updated in real-time.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-semibold text-foreground shadow-sm">
            <CheckCircle2 size={15} className="text-primary" /> Walk-in & Scheduled Appointments
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {data.clinics.map((clinic) => {
            const status = getClinicStatus(clinic);
            return (
              <article
                key={clinic.id || clinic.name}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-border/50 bg-white p-8 transition-all duration-300 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-2"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-white shadow-lg">
                      <MapPin size={24} />
                    </div>
                    {/* Live Open Status Badge */}
                    <div
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${status.colorClass}`}
                    >
                      <span className={`h-2 w-2 rounded-full ${status.dotClass}`} />
                      {status.badgeText}
                    </div>
                  </div>

                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                    {clinic.name}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {clinic.address}
                  </p>

                  <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-3 rounded-lg bg-primary/5 px-4 py-3 transition-colors group-hover:bg-primary/10">
                      <Clock size={18} className="text-primary shrink-0" />
                      <div className="leading-tight">
                        <div className="text-xs font-medium text-muted-foreground">{clinic.days}</div>
                        <div className="font-semibold text-foreground">{clinic.hours}</div>
                      </div>
                    </div>
                    {clinic.phone && (
                      <a
                        href={`tel:${clinic.phone}`}
                        className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200/60 px-4 py-2 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-100"
                      >
                        <Phone size={14} className="text-emerald-600 shrink-0" />
                        <span>Direct Clinic: {clinic.phone}</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-2.5">
                  {onSelectClinic && (
                    <Button
                      onClick={() => onSelectClinic(clinic.name)}
                      className="w-full rounded-full bg-primary font-semibold text-white shadow-md hover:bg-primary/90 hover:shadow-lg"
                    >
                      <Calendar size={16} className="mr-2" /> Book at this Clinic
                    </Button>
                  )}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-full border-border/60 font-semibold hover:border-primary hover:bg-primary/5"
                  >
                    <a href={clinic.mapsUrl} target="_blank" rel="noreferrer">
                      <NavIcon size={16} className="mr-2 text-primary" /> View Map & Directions
                    </a>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
