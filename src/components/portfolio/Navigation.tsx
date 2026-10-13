import { useState } from "react";
import { Menu, X, Shield, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCMS } from "@/lib/cms-store";
import { Link } from "@tanstack/react-router";

interface NavigationProps {
  onOpenBooking?: () => void;
}

export function Navigation({ onOpenBooking }: NavigationProps) {
  const { data } = useCMS();
  const { hero, contact } = data;
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Locations", href: "#locations" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQs", href: "#faqs" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span
            className="grid h-9 w-9 place-items-center rounded-xl text-sm font-bold text-primary-foreground shadow-md shadow-primary/25"
            style={{ background: "var(--gradient-primary)" }}
          >
            FB
          </span>
          <span className="font-display text-base font-bold tracking-tight text-foreground sm:text-lg">
            {hero.name}
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {onOpenBooking ? (
            <Button
              onClick={onOpenBooking}
              size="sm"
              className="rounded-full px-5 font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
            >
              Book Appointment
            </Button>
          ) : (
            <Button asChild size="sm" className="rounded-full px-5 font-semibold">
              <a href={contact.whatsappUrl} target="_blank" rel="noreferrer">
                Book Appointment
              </a>
            </Button>
          )}

          <Link
            to="/admin"
            className="flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/30 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-all hover:border-primary/40 hover:bg-white hover:text-foreground"
            title="Custom WordPress-like CMS Dashboard"
          >
            <Settings size={13} />
            <span>CMS</span>
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-md text-foreground md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border/60 bg-background md:hidden",
          open ? "max-h-96" : "max-h-0",
          "transition-[max-height] duration-300 ease-out",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            {onOpenBooking ? (
              <Button
                onClick={() => {
                  setOpen(false);
                  onOpenBooking();
                }}
                size="sm"
                className="w-full rounded-full"
              >
                Book Appointment
              </Button>
            ) : (
              <Button asChild size="sm" className="w-full rounded-full">
                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                >
                  Book Appointment
                </a>
              </Button>
            )}
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-full border border-border/60 bg-muted/40 py-2 text-xs font-semibold text-foreground"
            >
              <Settings size={13} />
              <span>WordPress-like CMS Dashboard</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
