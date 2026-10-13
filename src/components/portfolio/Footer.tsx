import { Mail, MapPin, Phone, Facebook, Instagram, Calendar } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/lib/cms-store";
import { Link } from "@tanstack/react-router";

interface FooterProps {
  onOpenBooking?: () => void;
}

export function Footer({ onOpenBooking }: FooterProps) {
  const { data } = useCMS();
  const { contact, hero } = data;

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
              Message on WhatsApp for the fastest response — typical reply within a few hours. We're here to support your rehabilitation journey.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#25D366] px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-[#25D366]/50 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1ebe5d] hover:shadow-md"
              >
                <span className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(100%)]">
                  <span className="relative h-full w-8 bg-white/20" />
                </span>
                <FaWhatsapp className="h-7 w-7 shrink-0" />
                Chat on WhatsApp
              </a>

              {onOpenBooking && (
                <Button
                  onClick={onOpenBooking}
                  variant="outline"
                  size="lg"
                  className="rounded-full border-2 border-white/20 bg-white/10 px-6 py-4 text-base font-semibold text-white backdrop-blur hover:bg-white hover:text-foreground"
                >
                  <Calendar className="mr-2 h-5 w-5" /> Online Booking
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="space-y-4">
                <a
                  href={contact.phoneHref}
                  className="flex items-center gap-4 rounded-lg px-3 py-2 transition hover:bg-white/10"
                >
                  <div className="rounded-lg bg-primary-glow/20 p-2.5">
                    <Phone size={18} className="text-primary-glow" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50">Phone</div>
                    <div className="font-semibold text-white">{contact.phone}</div>
                  </div>
                </a>

                <a
                  href={contact.emailHref}
                  className="flex items-center gap-4 rounded-lg px-3 py-2 transition hover:bg-white/10"
                >
                  <div className="rounded-lg bg-primary-glow/20 p-2.5">
                    <Mail size={18} className="text-primary-glow" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50">Email</div>
                    <div className="font-semibold text-white">{contact.email}</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-lg px-3 py-2">
                  <div className="rounded-lg bg-primary-glow/20 p-2.5">
                    <MapPin size={18} className="text-primary-glow" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50">Location</div>
                    <div className="font-semibold text-white">{contact.city}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center px-2">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-widest text-white/60">Follow</span>
                <div className="flex items-center gap-3">
                  {contact.facebookUrl && (
                    <a
                      href={contact.facebookUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-white/10 p-3 text-white/70 transition-all hover:bg-white/20 hover:text-white hover:scale-110"
                      aria-label="Facebook"
                    >
                      <Facebook size={18} />
                    </a>
                  )}
                  {contact.instagramUrl && (
                    <a
                      href={contact.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-white/10 p-3 text-white/70 transition-all hover:bg-white/20 hover:text-white hover:scale-110"
                      aria-label="Instagram"
                    >
                      <Instagram size={18} />
                    </a>
                  )}
                  {contact.tiktokUrl && (
                    <a
                      href={contact.tiktokUrl}
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {hero.name}. All rights reserved.
          </span>
          <span>Premium Physiotherapy · Evidence-based Rehabilitation · Islamabad</span>
        </div>
      </div>
    </footer>
  );
}
