import { useEffect, useState } from "react";
import { useCMS } from "@/lib/cms-store";
import { Calendar, Phone, Settings } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "@tanstack/react-router";

interface FloatingActionBarProps {
  onOpenBooking: () => void;
}

export function FloatingActionBar({ onOpenBooking }: FloatingActionBarProps) {
  const { data } = useCMS();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <aside
      aria-label="Quick contact actions"
      className="fixed bottom-5 right-4 z-40 flex items-center gap-2.5 transition-all duration-300 sm:bottom-6 sm:right-6 animate-in fade-in slide-in-from-bottom-4"
    >
      {/* Quick Call */}
      <a
        href={data.contact.phoneHref}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-white text-foreground shadow-lg shadow-black/10 transition-transform duration-200 hover:scale-110 hover:text-primary active:scale-95"
        title={`Call Dr. Farhan (${data.contact.phone})`}
        aria-label="Call clinic"
      >
        <Phone size={18} />
      </a>

      {/* WhatsApp Quick Chat */}
      <a
        href={data.contact.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition-transform duration-200 hover:scale-110 hover:bg-[#1ebe5d] active:scale-95"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={24} />
      </a>

      {/* Quick Booking CTA */}
      <button
        type="button"
        onClick={onOpenBooking}
        className="hidden items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-xl shadow-primary/35 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-primary/45 sm:flex"
      >
        <Calendar size={16} /> Book Appointment
      </button>

      {/* Admin Dashboard Quick Link */}
      <Link
        to="/admin"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-white/80 text-muted-foreground shadow-sm backdrop-blur transition hover:text-foreground hover:scale-105"
        title="WordPress-like Admin CMS Dashboard"
        aria-label="Admin Dashboard"
      >
        <Settings size={15} />
      </Link>
    </aside>
  );
}
