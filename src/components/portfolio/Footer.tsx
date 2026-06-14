import { Mail, MapPin, MessageCircle, Phone, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT, HERO } from "@/data/portfolioData";

export function Footer() {
  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 text-background md:scroll-mt-24"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.18 0.04 220) 0%, oklch(0.24 0.06 210) 60%, oklch(0.30 0.08 200) 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary-glow">
              Get in touch
            </p>
            <h2
              id="contact-heading"
              className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
            >
              Ready to start your recovery?
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/75">
              Message on WhatsApp for the fastest response — typical reply within a few hours. We're here to support your journey.
            </p>

            <Button
              asChild
              size="lg"
              className="mt-10 group relative overflow-hidden rounded-full bg-[#25D366] px-10 py-7 text-lg font-bold text-white shadow-2xl shadow-[#25D366]/50 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1ebe5d] hover:shadow-2xl"
            >
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer">
                <span className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                  <span className="relative h-full w-8 bg-white/20" />
                </span>
                <MessageCircle className="mr-3" size={22} /> Chat on WhatsApp
              </a>
            </Button>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="space-y-4">
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center gap-4 rounded-lg px-3 py-2 transition hover:bg-white/10"
                >
                  <div className="rounded-lg bg-primary-glow/20 p-2.5">
                    <Phone size={18} className="text-primary-glow" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50">Phone</div>
                    <div className="font-semibold text-white">{CONTACT.phone}</div>
                  </div>
                </a>

                <a
                  href={CONTACT.emailHref}
                  className="flex items-center gap-4 rounded-lg px-3 py-2 transition hover:bg-white/10"
                >
                  <div className="rounded-lg bg-primary-glow/20 p-2.5">
                    <Mail size={18} className="text-primary-glow" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50">Email</div>
                    <div className="font-semibold text-white">{CONTACT.email}</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-lg px-3 py-2">
                  <div className="rounded-lg bg-primary-glow/20 p-2.5">
                    <MapPin size={18} className="text-primary-glow" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50">Location</div>
                    <div className="font-semibold text-white">{CONTACT.city}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 px-2">
              <span className="text-xs uppercase tracking-widest text-white/60">Follow</span>
              <div className="flex items-center gap-3">
                <a
                  href={CONTACT.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white/10 p-3 text-white/70 transition-all hover:bg-white/20 hover:text-white hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white/10 p-3 text-white/70 transition-all hover:bg-white/20 hover:text-white hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={CONTACT.tiktokUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white/10 p-3 text-white/70 transition-all hover:bg-white/20 hover:text-white hover:scale-110"
                  aria-label="TikTok"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a3 3 0 0 1-3-3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {HERO.name}. All rights reserved.
          </span>
          <span>Premium physiotherapy · Evidence-based rehabilitation · Islamabad</span>
        </div>
      </div>
    </footer>
  );
}
