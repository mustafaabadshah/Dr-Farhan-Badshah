import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search } from "lucide-react";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 px-4">
      {/* Decorative gradient blur */}
      <div className="absolute inset-0 -top-40 h-80 bg-gradient-to-b from-primary/8 to-transparent blur-3xl" />

      <div className="relative z-10 text-center max-w-md">
        {/* 404 Text */}
        <div className="mb-8">
          <div className="font-display text-7xl font-black tracking-tighter text-foreground sm:text-8xl">
            <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              404
            </span>
          </div>
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-primary">
            Page Not Found
          </p>
        </div>

        {/* Message */}
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops! This page doesn't exist.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The page you're looking for might have been moved or removed. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary px-8 py-3 text-white shadow-xl shadow-primary/30 transition-all hover:shadow-2xl hover:-translate-y-1"
            onClick={() => navigate({ to: "/" })}
          >
            <button>
              <Home className="mr-2 h-5 w-5" /> Back to Home
            </button>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-2 border-foreground/20 bg-background px-8 py-3 font-semibold text-foreground transition-all hover:border-primary hover:bg-primary/5"
            onClick={() => navigate({ to: "/#about" })}
          >
            <Search className="mr-2 h-5 w-5" /> Explore Services
          </Button>
        </div>

        {/* Additional help */}
        <div className="mt-16 rounded-2xl border border-border/40 bg-white/40 p-6 backdrop-blur-sm">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Need help?</span><br />
            Visit our main page or contact us for assistance.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-center text-xs text-muted-foreground">
        <p>© 2026 Dr. Farhan Badshah</p>
      </div>
    </div>
  );
}
