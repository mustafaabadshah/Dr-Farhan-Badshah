import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/portfolio/Navigation";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { TrustBar } from "@/components/portfolio/TrustBar";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { ServicesGrid } from "@/components/portfolio/ServicesGrid";
import { Locations } from "@/components/portfolio/Locations";
import { Reviews } from "@/components/portfolio/Reviews";
import { Footer } from "@/components/portfolio/Footer";
import {
  CLINICS,
  CONTACT,
  HERO,
  SERVICES,
} from "@/data/portfolioData";

const PAGE_TITLE =
  "Dr. Farhan Badshah — Physiotherapist in Islamabad";
const PAGE_DESCRIPTION =
  "Evidence-based physiotherapy and rehabilitation in Islamabad by Dr. Farhan Badshah — DPT, internationally licensed (CORU, SCFHS, AHPC). Sports, MSK, neurological, and post-surgical care.";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: HERO.name,
  jobTitle: HERO.title,
  worksFor: { "@type": "Organization", name: "Dr. Farhan Badshah Physiotherapy" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Islamabad",
    addressCountry: "PK",
  },
  telephone: CONTACT.phone,
  email: CONTACT.email,
  sameAs: [HERO.oladocUrl, HERO.marhamUrl],
};

const medicalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: `${HERO.name} — Physiotherapy`,
  description: PAGE_DESCRIPTION,
  medicalSpecialty: "Physiotherapy",
  areaServed: "Islamabad",
  telephone: CONTACT.phone,
  email: CONTACT.email,
  url: "/",
  availableService: SERVICES.map((s) => ({
    "@type": "MedicalTherapy",
    name: s.title,
    description: s.description,
  })),
  location: CLINICS.map((c) => ({
    "@type": "Place",
    name: c.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.address,
      addressLocality: "Islamabad",
      addressCountry: "PK",
    },
    hasMap: c.mapsUrl,
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(personSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(medicalBusinessSchema),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <TrustBar />
        <AboutSection />
        <ServicesGrid />
        <Locations />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}
