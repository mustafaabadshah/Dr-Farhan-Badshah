import React, { createContext, useContext, useEffect, useState } from "react";
import {
  HERO as DEFAULT_HERO,
  CONTACT as DEFAULT_CONTACT,
  BIO as DEFAULT_BIO,
  QUALIFICATIONS as DEFAULT_QUALIFICATIONS,
  CERTIFICATIONS as DEFAULT_CERTIFICATIONS,
  LICENSES as DEFAULT_LICENSES,
  SERVICES as DEFAULT_SERVICES,
  CLINICS as DEFAULT_CLINICS,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  type ServiceIconName,
} from "@/data/portfolioData";

export interface SEOConfig {
  pageTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  author: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  twitterHandle: string;
  medicalSpecialty: string;
  areaServed: string;
  robotsIndex: string;
}

export interface HeroConfig {
  name: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  locationBadge: string;
  avatarUrl: string;
  oladocUrl: string;
  marhamUrl: string;
}

export interface ContactConfig {
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  city: string;
  whatsappNumber: string;
  whatsappMessage: string;
  googleBusinessUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: ServiceIconName;
  category: "Spine & Pain" | "Sports Rehab" | "Neuro & Geriatric" | "Post-Surgery" | "General";
}

export interface ClinicItem {
  id: string;
  name: string;
  address: string;
  hours: string;
  mapsUrl: string;
  openHour: number; // 24-hr format (e.g. 9)
  closeHour: number; // 24-hr format (e.g. 14)
  days: string;
}

export interface QualificationItem {
  id: string;
  title: string;
  institution: string;
  year: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
}

export interface LicenseItem {
  id: string;
  code: string;
  region: string;
  fullName: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  initial: string;
  rating: number;
  date: string;
  reviewCount: string;
  quote: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  description: string;
}

export interface BookingInquiry {
  id: string;
  patientName: string;
  phone: string;
  clinic: string;
  service: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes?: string;
  status: "New" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
}

export interface CMSData {
  seo: SEOConfig;
  hero: HeroConfig;
  contact: ContactConfig;
  bio: string[];
  services: ServiceItem[];
  clinics: ClinicItem[];
  qualifications: QualificationItem[];
  certifications: CertificationItem[];
  licenses: LicenseItem[];
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
  stats: StatItem[];
  bookings: BookingInquiry[];
  lastUpdated: string;
}

const DEFAULT_SEO: SEOConfig = {
  pageTitle: "Dr. Farhan Badshah — Physiotherapist in Islamabad | Rehabilitation Specialist",
  metaDescription:
    "Evidence-based physiotherapy and rehabilitation in Islamabad by Dr. Farhan Badshah — DPT, internationally licensed (CORU Ireland, SCFHS KSA, AHPC Pakistan). Sports injuries, musculoskeletal care, pain relief, and neurological rehabilitation.",
  keywords:
    "physiotherapist Islamabad, Dr Farhan Badshah, sports injury rehabilitation Islamabad, back pain relief, sciatica treatment, stroke rehabilitation, physical therapy Pakistan, Ali Medical Center F-8",
  canonicalUrl: "https://drfarhanbadshah.com/",
  author: "Dr. Farhan Badshah",
  ogTitle: "Dr. Farhan Badshah — Expert Physiotherapist & Rehab Specialist in Islamabad",
  ogDescription:
    "Restoring movement, relieving pain, and helping you return to life with evidence-based physiotherapy across Islamabad clinics.",
  ogImage: "/doc-farhan.png",
  twitterCard: "summary_large_image",
  twitterHandle: "@thephysioclinic03",
  medicalSpecialty: "Physiotherapy & Rehabilitation",
  areaServed: "Islamabad & Rawalpindi",
  robotsIndex: "index, follow",
};

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Do I need a doctor's referral to consult Dr. Farhan Badshah?",
    answer:
      "No direct referral is mandatory. You can schedule an initial evaluation directly. However, if you have recent diagnostic imaging (X-rays, MRI, CT scans) or surgical reports, bringing them along helps formulate the most accurate rehabilitation plan.",
    category: "Appointments",
  },
  {
    id: "faq-2",
    question: "What should I wear to my physiotherapy session?",
    answer:
      "Wear comfortable, loose-fitting athletic clothing (such as shorts, tracksuits, or a t-shirt) that permits easy examination and movement of the affected joints, back, or limbs.",
    category: "Preparation",
  },
  {
    id: "faq-3",
    question: "How long is a typical consultation and treatment session?",
    answer:
      "An initial clinical consultation lasts between 45 to 60 minutes, including comprehensive functional assessment, diagnostic movement tests, and hands-on therapy. Follow-up sessions typically range from 30 to 45 minutes.",
    category: "Treatment",
  },
  {
    id: "faq-4",
    question: "Which clinics can I visit Dr. Farhan at in Islamabad?",
    answer:
      "Dr. Farhan consults at Ali Medical Center (F-8 Markaz) from 9:00 AM – 2:00 PM, General Practice Hospital (Pakland Tower 2, New Blue Area) from 2:00 PM – 6:00 PM, and Muhammad Medical Complex (G-8 Markaz) from 6:00 PM – 8:00 PM.",
    category: "Locations",
  },
  {
    id: "faq-5",
    question: "What conditions respond best to evidence-based physiotherapy?",
    answer:
      "We specialize in chronic lower back and neck pain, sciatica, disc herniations, sports injuries (ACL, meniscus, ankle sprains), post-operative recovery (joint replacements), frozen shoulder, postural dysfunction, and neurological rehabilitation (stroke, Parkinson's).",
    category: "Conditions",
  },
  {
    id: "faq-6",
    question: "How many sessions will I need before seeing improvements?",
    answer:
      "Many patients experience noticeable pain relief and increased range of motion within the first 2 to 4 sessions. Chronic or post-surgical conditions may require a structured 4 to 8 week rehabilitation program.",
    category: "Recovery",
  },
];

const DEFAULT_STATS: StatItem[] = [
  {
    id: "stat-1",
    label: "Clinical Experience",
    value: "8+ Years",
    description: "Dedicated rehabilitation and clinical physiotherapy practice",
  },
  {
    id: "stat-2",
    label: "Patients Treated",
    value: "5,000+",
    description: "Successful recoveries across sports, orthopedic, and neuro care",
  },
  {
    id: "stat-3",
    label: "International Licensures",
    value: "3 Regions",
    description: "Ireland (CORU), Saudi Arabia (SCFHS), Pakistan (AHPC)",
  },
  {
    id: "stat-4",
    label: "Islamabad Clinics",
    value: "3 Locations",
    description: "F-8 Markaz, New Blue Area, and G-8 Markaz",
  },
];

const DEFAULT_SERVICES_ENRICHED: ServiceItem[] = DEFAULT_SERVICES.map((s, idx) => {
  let category: ServiceItem["category"] = "General";
  if (s.title.includes("Sports") || s.title.includes("Strength") || s.title.includes("Performance")) {
    category = "Sports Rehab";
  } else if (s.title.includes("Pain") || s.title.includes("Musculoskeletal")) {
    category = "Spine & Pain";
  } else if (s.title.includes("Neurological") || s.title.includes("Geriatric")) {
    category = "Neuro & Geriatric";
  } else if (s.title.includes("Post-Surgical") || s.title.includes("Orthopedic")) {
    category = "Post-Surgery";
  }
  return {
    id: `srv-${idx + 1}`,
    title: s.title,
    description: s.description,
    icon: s.icon,
    category,
  };
});

const DEFAULT_CLINICS_ENRICHED: ClinicItem[] = [
  {
    id: "cl-1",
    name: DEFAULT_CLINICS[0].name,
    address: DEFAULT_CLINICS[0].address,
    hours: DEFAULT_CLINICS[0].hours,
    mapsUrl: DEFAULT_CLINICS[0].mapsUrl,
    openHour: 9,
    closeHour: 14,
    days: "Monday – Saturday",
  },
  {
    id: "cl-2",
    name: DEFAULT_CLINICS[1].name,
    address: DEFAULT_CLINICS[1].address,
    hours: DEFAULT_CLINICS[1].hours,
    mapsUrl: DEFAULT_CLINICS[1].mapsUrl,
    openHour: 14,
    closeHour: 18,
    days: "Monday – Saturday",
  },
  {
    id: "cl-3",
    name: DEFAULT_CLINICS[2].name,
    address: DEFAULT_CLINICS[2].address,
    hours: DEFAULT_CLINICS[2].hours,
    mapsUrl: DEFAULT_CLINICS[2].mapsUrl,
    openHour: 18,
    closeHour: 20,
    days: "Monday – Saturday",
  },
];

const INITIAL_DATA: CMSData = {
  seo: DEFAULT_SEO,
  hero: {
    name: DEFAULT_HERO.name,
    title: DEFAULT_HERO.title,
    subtitle: DEFAULT_HERO.subtitle,
    ctaLabel: DEFAULT_HERO.ctaLabel,
    locationBadge: "Islamabad, Pakistan",
    avatarUrl: "/doc-farhan.png",
    oladocUrl: DEFAULT_HERO.oladocUrl,
    marhamUrl: DEFAULT_HERO.marhamUrl,
  },
  contact: {
    phone: DEFAULT_CONTACT.phone,
    phoneHref: DEFAULT_CONTACT.phoneHref,
    email: DEFAULT_CONTACT.email,
    emailHref: DEFAULT_CONTACT.emailHref,
    city: DEFAULT_CONTACT.city,
    whatsappNumber: "923329579368",
    whatsappMessage: "Hello Dr. Farhan, I would like to book an appointment.",
    googleBusinessUrl: DEFAULT_CONTACT.googleBusinessUrl,
    facebookUrl: DEFAULT_CONTACT.facebookUrl,
    instagramUrl: DEFAULT_CONTACT.instagramUrl,
    tiktokUrl: DEFAULT_CONTACT.tiktokUrl,
  },
  bio: [...DEFAULT_BIO],
  services: DEFAULT_SERVICES_ENRICHED,
  clinics: DEFAULT_CLINICS_ENRICHED,
  qualifications: DEFAULT_QUALIFICATIONS.map((q, i) => ({
    id: `qual-${i + 1}`,
    title: q.title,
    institution: q.institution,
    year: q.year,
  })),
  certifications: DEFAULT_CERTIFICATIONS.map((c, i) => ({
    id: `cert-${i + 1}`,
    title: c.title,
    issuer: c.issuer,
  })),
  licenses: DEFAULT_LICENSES.map((l, i) => ({
    id: `lic-${i + 1}`,
    code: l.code,
    region: l.region,
    fullName: l.fullName,
  })),
  testimonials: DEFAULT_TESTIMONIALS.map((t, i) => ({
    id: `test-${i + 1}`,
    name: t.name,
    initial: t.initial,
    rating: t.rating,
    date: t.date,
    reviewCount: t.reviewCount,
    quote: t.quote,
  })),
  faqs: DEFAULT_FAQS,
  stats: DEFAULT_STATS,
  bookings: [
    {
      id: "bk-1",
      patientName: "Kamran Shah",
      phone: "+92 333 5551234",
      clinic: "Ali Medical Center",
      service: "Sports Injury Rehab",
      preferredDate: "2026-10-15",
      preferredTimeSlot: "11:00 AM",
      notes: "Severe knee pain after football match",
      status: "Confirmed",
      createdAt: "2026-10-12 14:20",
    },
    {
      id: "bk-2",
      patientName: "Zainab Bibi",
      phone: "+92 300 9876543",
      clinic: "General Practice Hospital",
      service: "Musculoskeletal Physiotherapy",
      preferredDate: "2026-10-16",
      preferredTimeSlot: "03:30 PM",
      notes: "Lower back pain radiating down leg",
      status: "New",
      createdAt: "2026-10-13 10:15",
    },
  ],
  lastUpdated: new Date().toISOString(),
};

const STORAGE_KEY = "docfolio_cms_data_v1";

interface CMSContextType {
  data: CMSData;
  updateSEO: (seo: Partial<SEOConfig>) => void;
  updateHero: (hero: Partial<HeroConfig>) => void;
  updateContact: (contact: Partial<ContactConfig>) => void;
  updateBio: (bio: string[]) => void;
  addService: (service: Omit<ServiceItem, "id">) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  addClinic: (clinic: Omit<ClinicItem, "id">) => void;
  updateClinic: (id: string, clinic: Partial<ClinicItem>) => void;
  deleteClinic: (id: string) => void;
  addQualification: (item: Omit<QualificationItem, "id">) => void;
  updateQualification: (id: string, item: Partial<QualificationItem>) => void;
  deleteQualification: (id: string) => void;
  addCertification: (item: Omit<CertificationItem, "id">) => void;
  updateCertification: (id: string, item: Partial<CertificationItem>) => void;
  deleteCertification: (id: string) => void;
  addLicense: (item: Omit<LicenseItem, "id">) => void;
  updateLicense: (id: string, item: Partial<LicenseItem>) => void;
  deleteLicense: (id: string) => void;
  addTestimonial: (item: Omit<TestimonialItem, "id">) => void;
  updateTestimonial: (id: string, item: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;
  addFAQ: (item: Omit<FAQItem, "id">) => void;
  updateFAQ: (id: string, item: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;
  addBooking: (booking: Omit<BookingInquiry, "id" | "createdAt" | "status">) => BookingInquiry;
  updateBookingStatus: (id: string, status: BookingInquiry["status"]) => void;
  deleteBooking: (id: string) => void;
  resetToDefaults: () => void;
  exportJSON: () => string;
  importJSON: (jsonStr: string) => boolean;
  generateExportCode: () => string;
}

const CMSContext = createContext<CMSContextType | null>(null);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<CMSData>(() => {
    if (typeof window === "undefined") return INITIAL_DATA;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_DATA, ...parsed };
      }
    } catch (e) {
      console.warn("Could not load CMS data from localStorage", e);
    }
    return INITIAL_DATA;
  });

  const saveState = (updated: CMSData) => {
    const withTimestamp = {
      ...updated,
      lastUpdated: new Date().toISOString(),
    };
    setData(withTimestamp);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(withTimestamp));
      } catch (e) {
        console.error("Failed to save to localStorage", e);
      }
    }
  };

  const updateSEO = (seoUpdates: Partial<SEOConfig>) => {
    saveState({
      ...data,
      seo: { ...data.seo, ...seoUpdates },
    });
  };

  const updateHero = (heroUpdates: Partial<HeroConfig>) => {
    saveState({
      ...data,
      hero: { ...data.hero, ...heroUpdates },
    });
  };

  const updateContact = (contactUpdates: Partial<ContactConfig>) => {
    saveState({
      ...data,
      contact: { ...data.contact, ...contactUpdates },
    });
  };

  const updateBio = (bio: string[]) => {
    saveState({ ...data, bio });
  };

  const addService = (srv: Omit<ServiceItem, "id">) => {
    const newService: ServiceItem = {
      ...srv,
      id: `srv-${Date.now()}`,
    };
    saveState({ ...data, services: [...data.services, newService] });
  };

  const updateService = (id: string, srvUpdates: Partial<ServiceItem>) => {
    saveState({
      ...data,
      services: data.services.map((s) => (s.id === id ? { ...s, ...srvUpdates } : s)),
    });
  };

  const deleteService = (id: string) => {
    saveState({
      ...data,
      services: data.services.filter((s) => s.id !== id),
    });
  };

  const addClinic = (c: Omit<ClinicItem, "id">) => {
    const newClinic: ClinicItem = { ...c, id: `cl-${Date.now()}` };
    saveState({ ...data, clinics: [...data.clinics, newClinic] });
  };

  const updateClinic = (id: string, updates: Partial<ClinicItem>) => {
    saveState({
      ...data,
      clinics: data.clinics.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    });
  };

  const deleteClinic = (id: string) => {
    saveState({
      ...data,
      clinics: data.clinics.filter((c) => c.id !== id),
    });
  };

  const addQualification = (item: Omit<QualificationItem, "id">) => {
    const newItem: QualificationItem = { ...item, id: `qual-${Date.now()}` };
    saveState({ ...data, qualifications: [...data.qualifications, newItem] });
  };

  const updateQualification = (id: string, updates: Partial<QualificationItem>) => {
    saveState({
      ...data,
      qualifications: data.qualifications.map((q) => (q.id === id ? { ...q, ...updates } : q)),
    });
  };

  const deleteQualification = (id: string) => {
    saveState({
      ...data,
      qualifications: data.qualifications.filter((q) => q.id !== id),
    });
  };

  const addCertification = (item: Omit<CertificationItem, "id">) => {
    const newItem: CertificationItem = { ...item, id: `cert-${Date.now()}` };
    saveState({ ...data, certifications: [...data.certifications, newItem] });
  };

  const updateCertification = (id: string, updates: Partial<CertificationItem>) => {
    saveState({
      ...data,
      certifications: data.certifications.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    });
  };

  const deleteCertification = (id: string) => {
    saveState({
      ...data,
      certifications: data.certifications.filter((c) => c.id !== id),
    });
  };

  const addLicense = (item: Omit<LicenseItem, "id">) => {
    const newItem: LicenseItem = { ...item, id: `lic-${Date.now()}` };
    saveState({ ...data, licenses: [...data.licenses, newItem] });
  };

  const updateLicense = (id: string, updates: Partial<LicenseItem>) => {
    saveState({
      ...data,
      licenses: data.licenses.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    });
  };

  const deleteLicense = (id: string) => {
    saveState({
      ...data,
      licenses: data.licenses.filter((l) => l.id !== id),
    });
  };

  const addTestimonial = (item: Omit<TestimonialItem, "id">) => {
    const newItem: TestimonialItem = { ...item, id: `test-${Date.now()}` };
    saveState({ ...data, testimonials: [...data.testimonials, newItem] });
  };

  const updateTestimonial = (id: string, updates: Partial<TestimonialItem>) => {
    saveState({
      ...data,
      testimonials: data.testimonials.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    });
  };

  const deleteTestimonial = (id: string) => {
    saveState({
      ...data,
      testimonials: data.testimonials.filter((t) => t.id !== id),
    });
  };

  const addFAQ = (item: Omit<FAQItem, "id">) => {
    const newItem: FAQItem = { ...item, id: `faq-${Date.now()}` };
    saveState({ ...data, faqs: [...data.faqs, newItem] });
  };

  const updateFAQ = (id: string, updates: Partial<FAQItem>) => {
    saveState({
      ...data,
      faqs: data.faqs.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    });
  };

  const deleteFAQ = (id: string) => {
    saveState({
      ...data,
      faqs: data.faqs.filter((f) => f.id !== id),
    });
  };

  const addBooking = (bookingData: Omit<BookingInquiry, "id" | "createdAt" | "status">) => {
    const newBooking: BookingInquiry = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      status: "New",
      createdAt: new Date().toLocaleString(),
    };
    saveState({
      ...data,
      bookings: [newBooking, ...data.bookings],
    });
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingInquiry["status"]) => {
    saveState({
      ...data,
      bookings: data.bookings.map((b) => (b.id === id ? { ...b, status } : b)),
    });
  };

  const deleteBooking = (id: string) => {
    saveState({
      ...data,
      bookings: data.bookings.filter((b) => b.id !== id),
    });
  };

  const resetToDefaults = () => {
    saveState(INITIAL_DATA);
  };

  const exportJSON = () => {
    return JSON.stringify(data, null, 2);
  };

  const importJSON = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && parsed.hero && parsed.contact && parsed.services) {
        saveState({ ...INITIAL_DATA, ...parsed });
        return true;
      }
    } catch (e) {
      console.error("Invalid JSON import", e);
    }
    return false;
  };

  const generateExportCode = () => {
    return `// Exported from DocFolio Custom CMS (${new Date().toLocaleDateString()})
export const HERO = ${JSON.stringify(data.hero, null, 2)} as const;

export const CONTACT = ${JSON.stringify(data.contact, null, 2)} as const;

export const BIO = ${JSON.stringify(data.bio, null, 2)};

export const SERVICES = ${JSON.stringify(
      data.services.map((s) => ({ title: s.title, description: s.description, icon: s.icon })),
      null,
      2
    )};

export const CLINICS = ${JSON.stringify(
      data.clinics.map((c) => ({
        name: c.name,
        address: c.address,
        hours: c.hours,
        mapsUrl: c.mapsUrl,
      })),
      null,
      2
    )} as const;

export const TESTIMONIALS = ${JSON.stringify(
      data.testimonials.map((t) => ({
        name: t.name,
        initial: t.initial,
        rating: t.rating,
        date: t.date,
        reviewCount: t.reviewCount,
        quote: t.quote,
      })),
      null,
      2
    )} as const;
`;
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        updateSEO,
        updateHero,
        updateContact,
        updateBio,
        addService,
        updateService,
        deleteService,
        addClinic,
        updateClinic,
        deleteClinic,
        addQualification,
        updateQualification,
        deleteQualification,
        addCertification,
        updateCertification,
        deleteCertification,
        addLicense,
        updateLicense,
        deleteLicense,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        resetToDefaults,
        exportJSON,
        importJSON,
        generateExportCode,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}
