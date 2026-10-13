import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/portfolio/Navigation";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { TrustBar } from "@/components/portfolio/TrustBar";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { ServicesGrid } from "@/components/portfolio/ServicesGrid";
import { Locations } from "@/components/portfolio/Locations";
import { Reviews } from "@/components/portfolio/Reviews";
import { FaqSection } from "@/components/portfolio/FaqSection";
import { Footer } from "@/components/portfolio/Footer";
import { BookingModal } from "@/components/portfolio/BookingModal";
import { FloatingActionBar } from "@/components/portfolio/FloatingActionBar";
import { useCMS } from "@/lib/cms-store";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data } = useCMS();
  const { hero, contact, services, clinics, seo } = data;

  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<string | undefined>();
  const [selectedService, setSelectedService] = useState<string | undefined>();

  const handleOpenBooking = () => {
    setSelectedClinic(undefined);
    setSelectedService(undefined);
    setBookingOpen(true);
  };

  const handleSelectClinic = (clinicName: string) => {
    setSelectedClinic(clinicName);
    setSelectedService(undefined);
    setBookingOpen(true);
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setSelectedClinic(undefined);
    setBookingOpen(true);
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: hero.name,
    jobTitle: hero.title,
    worksFor: { "@type": "Organization", name: `${hero.name} Physiotherapy` },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Islamabad",
      addressCountry: "PK",
    },
    telephone: contact.phone,
    email: contact.email,
    sameAs: [hero.oladocUrl, hero.marhamUrl, contact.googleBusinessUrl].filter(Boolean),
  };

  const medicalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: `${hero.name} — Physiotherapy & Rehabilitation`,
    description: seo.metaDescription,
    medicalSpecialty: seo.medicalSpecialty || "Physiotherapy",
    areaServed: seo.areaServed || "Islamabad",
    telephone: contact.phone,
    email: contact.email,
    url: seo.canonicalUrl || "/",
    availableService: services.map((s) => ({
      "@type": "MedicalTherapy",
      name: s.title,
      description: s.description,
    })),
    location: clinics.map((c) => ({
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

  return (
    <div className="min-h-screen bg-background">
      {/* Schema.org SEO Script injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
      />

      <Navigation onOpenBooking={handleOpenBooking} />
      <main>
        <HeroSection onOpenBooking={handleOpenBooking} />
        <TrustBar />
        <AboutSection />
        <ServicesGrid onSelectService={handleSelectService} />
        <Locations onSelectClinic={handleSelectClinic} />
        <Reviews />
        <FaqSection onOpenBooking={handleOpenBooking} />
      </main>
      <Footer onOpenBooking={handleOpenBooking} />

      <FloatingActionBar onOpenBooking={handleOpenBooking} />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedClinic={selectedClinic}
        preselectedService={selectedService}
      />
    </div>
  );
}
