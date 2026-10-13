import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { NotFound } from "@/components/errors/NotFound";
import { CMSProvider } from "@/lib/cms-store";
import { Toaster } from "@/components/ui/sonner";

function RootNotFoundComponent() {
  return <NotFound />;
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 px-4">
      {/* Decorative gradient blur */}
      <div className="absolute inset-0 -top-40 h-80 bg-gradient-to-b from-destructive/8 to-transparent blur-3xl" />

      <div className="relative z-10 max-w-md text-center">
        <div className="mb-8">
          <div className="font-display text-5xl font-black tracking-tighter text-foreground">
            ⚠️
          </div>
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-destructive">
            Something went wrong
          </p>
        </div>

        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops! An error occurred
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We encountered an unexpected problem. Please try again or return to the home page.
        </p>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 rounded-lg bg-destructive/10 p-4 text-left">
            <p className="text-xs font-mono text-destructive">{error.message}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary px-8 py-3 text-white font-semibold shadow-xl shadow-primary/30 transition-all hover:shadow-2xl hover:-translate-y-1"
          >
            Try Again
          </button>

          <a
            href="/"
            className="rounded-full border-2 border-foreground/20 bg-background px-8 py-3 font-semibold text-foreground transition-all hover:border-primary hover:bg-primary/5"
          >
            Go Home
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-center text-xs text-muted-foreground">
        <p>© 2026 Dr. Farhan Badshah</p>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dr. Farhan Badshah | Best Physiotherapist in Islamabad | Sports & MSK Rehab Specialist" },
      {
        name: "description",
        content:
          "Dr. Farhan Badshah (DPT, MS Sports Rehab) is an internationally licensed Consultant Physiotherapist in Islamabad (CORU, SCFHS, AHPC). Clinics at Ali Medical Center (F-8), Shahida Khaliq Hospital (G-8/4), and General Practice Hospital (Blue Area).",
      },
      {
        name: "keywords",
        content:
          "physiotherapist Islamabad, best physiotherapist in Islamabad, Dr Farhan Badshah, sports injury rehabilitation Islamabad, Shahida Khaliq Hospital physiotherapist, Ali Medical Center physiotherapist, General Practice Hospital physiotherapist, back pain specialist Islamabad, sciatica treatment Islamabad, physical therapy Pakistan",
      },
      { name: "author", content: "Dr. Farhan Badshah" },
      { name: "geo.region", content: "PK-IS" },
      { name: "geo.placename", content: "Islamabad" },
      { name: "geo.position", content: "33.7077;73.0498" },
      { name: "ICBM", content: "33.7077, 73.0498" },
      { property: "og:title", content: "Dr. Farhan Badshah | Best Physiotherapist in Islamabad" },
      {
        property: "og:description",
        content:
          "Evidence-based physiotherapy and rehabilitation in Islamabad. Clinics at Ali Medical Center (F-8), Shahida Khaliq Hospital (G-8/4), and General Practice Hospital (Blue Area).",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://drfarhanbadshah.com/" },
      { property: "og:image", content: "/doc-farhan.png" },
      { property: "og:site_name", content: "Dr. Farhan Badshah Physiotherapy" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@thephysioclinic03" },
      { name: "twitter:creator", content: "@thephysioclinic03" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: RootNotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CMSProvider>
        <Outlet />
        <Toaster position="top-right" richColors />
      </CMSProvider>
    </QueryClientProvider>
  );
}
