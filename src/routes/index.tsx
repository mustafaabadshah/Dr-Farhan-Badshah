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
import { SeoHead } from "@/components/portfolio/SeoHead";
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

  return (
    <div className="min-h-screen bg-background">
      {/* Dynamic SEO, Meta Tags & Schema.org Graph */}
      <SeoHead />

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
