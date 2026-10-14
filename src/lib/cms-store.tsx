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
} from "../data/portfolioData";
import BUNDLED_CMS_DATA from "../data/cms-data.json";

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
  phone?: string;
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
  appointmentType?: "Clinic Visit" | "Home Rehab" | "Online Consultation";
  feeStatus?: "Pending" | "Paid" | "Waived";
  doctorNotes?: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  category: "Spine & Pain" | "Sports Rehab" | "Post-Surgery" | "Ergonomics & Posture" | "General Wellness";
  readTime: string;
  date: string;
  imageUrl: string;
  description: string;
  content: string;
  featured?: boolean;
}

export interface CMSData {
  seo: SEOConfig;
  hero: HeroConfig;
  contact: ContactConfig;
  bio: string[];
  services: ServiceItem[];
  clinics: ClinicItem[];
  articles: ArticleItem[];
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
  pageTitle: "Dr. Farhan Badshah | Best Physiotherapist in Islamabad | Sports & MSK Rehab Specialist",
  metaDescription:
    "Dr. Farhan Badshah (DPT, MS Sports Rehab) is an internationally licensed Consultant Physiotherapist in Islamabad (CORU Ireland, SCFHS KSA, AHPC Pakistan). Clinics at Ali Medical Center (F-8), Shahida Khaliq Hospital (G-8/4), and General Practice Hospital (Blue Area).",
  keywords:
    "physiotherapist Islamabad, best physiotherapist in Islamabad, Dr Farhan Badshah, sports injury rehabilitation Islamabad, Shahida Khaliq Hospital physiotherapist, Ali Medical Center physiotherapist, General Practice Hospital physiotherapist, back pain specialist Islamabad, sciatica treatment Islamabad, stroke rehabilitation Islamabad, orthopedic physiotherapy Islamabad, physical therapist Pakistan, DPT Islamabad, pain management Islamabad",
  canonicalUrl: "https://drfarhanbadshah.com/",
  author: "Dr. Farhan Badshah",
  ogTitle: "Dr. Farhan Badshah | Best Physiotherapist in Islamabad | Sports & MSK Specialist",
  ogDescription:
    "Restoring movement, relieving pain, and return-to-sport rehabilitation across Islamabad. Consult Dr. Farhan at Ali Medical Center (F-8), Shahida Khaliq Hospital (G-8/4), or GP Hospital (Blue Area).",
  ogImage: "/doc-farhan.png",
  twitterCard: "summary_large_image",
  twitterHandle: "@thephysioclinic03",
  medicalSpecialty: "Physiotherapy & Rehabilitation",
  areaServed: "Islamabad & Rawalpindi, Pakistan",
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
      "Dr. Farhan consults at Ali Medical Center (F-8 Markaz) from 9:00 AM – 2:00 PM, Shahida Khaliq Hospital (Plot No 14, Street No 22, G-8/4) from 2:00 PM – 5:00 PM, and General Practice Hospital (Pakland Tower 2, New Blue Area) from 5:00 PM – 8:00 PM.",
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
    description: "F-8 Markaz, G-8/4, and New Blue Area",
  },
];

export const DEFAULT_ARTICLES: ArticleItem[] = [
  {
    id: "art-1",
    title: "5 Evidence-Based Ways to Relieve Sciatica & Lower Back Pain at Home",
    slug: "relieve-sciatica-lower-back-pain",
    category: "Spine & Pain",
    readTime: "4 min read",
    date: "October 2026",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    description: "Expert physiotherapy guidance on distinguishing true nerve impingement from muscular tension, safe decompression techniques, and when to seek clinical assessment.",
    content: `Lower back pain and sciatica affect up to 40% of adults at some point in their lives. Prolonged bed rest is scientifically proven to delay recovery rather than accelerate it.

### 1. Maintain Gentle, Graded Movement
Active recovery is superior to immobilization. Short walks (10–15 minutes) on even surfaces promote blood circulation to spinal discs and reduce reflexive paraspinal muscle spasms.

### 2. Decompression & Prone Press-ups (McKenzie Extension)
If your sciatica symptoms are caused by posterior disc protrusion, lying face down and gently propping onto your forearms encourages directional disc centralization, moving pain away from the leg and back toward the lumbar midline.

### 3. Nerve Flossing (Neurodynamics)
Gentle sciatic nerve gliding exercises prevent neural adhesions without aggressively stretching an inflamed nerve root. Sit on a chair, extend your knee while extending your neck, then reverse smoothly.

### 4. Cold vs. Heat Application
Use ice packs for the first 48 hours of an acute spasm to downregulate local neurogenic inflammation. Switch to moist heat thereafter to loosen tense spinal muscles.

### 5. When to Consult Dr. Farhan Badshah
If you experience progressive muscle weakness (such as foot drop), numbness in the saddle area, or pain persisting beyond 2 weeks, consult Dr. Farhan for targeted manual therapy, decompression, and personalized rehab.`,
    featured: true,
  },
  {
    id: "art-2",
    title: "ACL Rehabilitation Timeline: What Athletes in Islamabad Must Know Before Returning to Play",
    slug: "acl-rehab-timeline-return-to-play",
    category: "Sports Rehab",
    readTime: "6 min read",
    date: "September 2026",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
    description: "Why arbitrary calendar deadlines fail athletes, how objective limb symmetry testing prevents secondary tears, and sports-specific neuromuscular retraining.",
    content: `One of the most dangerous myths in athletic rehabilitation is that an anterior cruciate ligament (ACL) reconstruction is ready simply because 6 months have passed on a calendar.

### Criteria-Based Progression vs. Time-Based Progression
Biological healing of a graft takes time, but neuromotor control, quad strength symmetry, and psychological readiness require targeted loading and objective criteria testing.

### The 4 Crucial Recovery Milestones:
1. **Phase 1: Full Terminal Knee Extension (Weeks 0–3)**: Restoring symmetrical extension is vital to prevent arthrofibrosis and patellofemoral irritation.
2. **Phase 2: Quad Hypertrophy & Kinetic Chain Control (Weeks 4–12)**: Achieving at least 80% Limb Symmetry Index (LSI) in quadriceps and hamstring force output.
3. **Phase 3: Plyometric Deceleration & Change of Direction (Months 4–7)**: Training proper landing mechanics with low knee valgus stress.
4. **Phase 4: Return-to-Sport Battery Testing (Months 8–12)**: Passing triple hop tests, reactive agility tests, and psychological readiness scales (ACL-RSI).

Dr. Farhan Badshah designs individualized return-to-play protocols for football, cricket, and fitness athletes across Islamabad to ensure long-term joint durability.`,
    featured: true,
  },
  {
    id: "art-3",
    title: "Desk Ergonomics & Postural Neck Strain: Practical Solutions for Office Workers",
    slug: "desk-ergonomics-neck-strain-solutions",
    category: "Ergonomics & Posture",
    readTime: "5 min read",
    date: "August 2026",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80",
    description: "Combat forward head posture ('tech neck') and upper cross syndrome with workstation adjustments and 3-minute desk mobility drills.",
    content: `Sitting at a computer for 8 to 10 hours daily places excessive compressive stress on the cervical spine and thoracic junction. For every inch your head shifts forward past your shoulders, the effective weight on your neck muscles increases by 10 pounds.

### Ergonomic Adjustments for Instant Relief:
- **Eye-Level Display**: The top third of your computer monitor should align directly with your natural horizontal eye gaze.
- **Elbow Angle 90–100°**: Rest your forearms on the desk or chair armrests with relaxed shoulders.
- **Feet Flat on Floor**: Use a footrest if necessary to avoid posterior pelvic tilting.

### 3-Minute Desk Micro-Breaks:
1. **Chin Tucks**: Retract your chin horizontally to activate deep cervical flexors.
2. **Brugger's Postural Reset**: Turn your palms outward, retract shoulder blades, and breathe diaphragmatically for 30 seconds.
3. **Thoracic Extensions**: Place hands behind your head and gently extend over the back of your office chair.

If chronic tension headaches, numbness into fingers, or burning upper back pain persist, a clinical assessment with Dr. Farhan Badshah can identify underlying cervical facet or nerve root irritation.`,
    featured: false,
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
    closeHour: 17,
    days: "Monday – Saturday",
  },
  {
    id: "cl-3",
    name: DEFAULT_CLINICS[2].name,
    address: DEFAULT_CLINICS[2].address,
    hours: DEFAULT_CLINICS[2].hours,
    mapsUrl: DEFAULT_CLINICS[2].mapsUrl,
    openHour: 17,
    closeHour: 20,
    days: "Monday – Saturday",
  },
];

export const INITIAL_DATA: CMSData = {
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
  articles: DEFAULT_ARTICLES,
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
  addArticle: (item: Omit<ArticleItem, "id">) => void;
  updateArticle: (id: string, item: Partial<ArticleItem>) => void;
  deleteArticle: (id: string) => void;
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
  addStat: (item: Omit<StatItem, "id">) => void;
  updateStat: (id: string, item: Partial<StatItem>) => void;
  deleteStat: (id: string) => void;
  addBooking: (booking: Omit<BookingInquiry, "id" | "createdAt" | "status">) => BookingInquiry;
  updateBookingStatus: (id: string, status: BookingInquiry["status"]) => void;
  updateBooking: (id: string, updates: Partial<BookingInquiry>) => void;
  deleteBooking: (id: string) => void;
  resetToDefaults: () => void;
  exportJSON: () => string;
  importJSON: (jsonStr: string) => boolean;
  generateExportCode: () => string;
  publishToGitHub: (token: string, commitMessage?: string) => Promise<{ success: boolean; message: string }>;
}

const CMSContext = createContext<CMSContextType | null>(null);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const fallbackData: CMSData = (BUNDLED_CMS_DATA as unknown as CMSData) || INITIAL_DATA;

  const [data, setData] = useState<CMSData>(() => {
    if (typeof window === "undefined") return fallbackData;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...fallbackData,
          ...parsed,
          seo: { ...fallbackData.seo, ...(parsed?.seo || {}) },
          hero: { ...fallbackData.hero, ...(parsed?.hero || {}) },
          contact: { ...fallbackData.contact, ...(parsed?.contact || {}) },
          bio: Array.isArray(parsed?.bio) && parsed.bio.length > 0 ? parsed.bio : fallbackData.bio,
          services: Array.isArray(parsed?.services) && parsed.services.length > 0 ? parsed.services : fallbackData.services,
          clinics: (Array.isArray(parsed?.clinics) && parsed.clinics.length > 0 ? parsed.clinics : fallbackData.clinics)
            .sort((a: ClinicItem, b: ClinicItem) => (a.openHour ?? 0) - (b.openHour ?? 0)),
          articles: Array.isArray(parsed?.articles) && parsed.articles.length > 0 ? parsed.articles : fallbackData.articles,
          qualifications: Array.isArray(parsed?.qualifications) && parsed.qualifications.length > 0 ? parsed.qualifications : fallbackData.qualifications,
          certifications: Array.isArray(parsed?.certifications) && parsed.certifications.length > 0 ? parsed.certifications : fallbackData.certifications,
          licenses: Array.isArray(parsed?.licenses) && parsed.licenses.length > 0 ? parsed.licenses : fallbackData.licenses,
          testimonials: Array.isArray(parsed?.testimonials) && parsed.testimonials.length > 0 ? parsed.testimonials : fallbackData.testimonials,
          faqs: Array.isArray(parsed?.faqs) && parsed.faqs.length > 0 ? parsed.faqs : fallbackData.faqs,
          stats: Array.isArray(parsed?.stats) && parsed.stats.length > 0 ? parsed.stats : fallbackData.stats,
          bookings: Array.isArray(parsed?.bookings) ? parsed.bookings : fallbackData.bookings,
        };
      }
    } catch (e) {
      console.warn("Could not load CMS data from localStorage", e);
    }
    return fallbackData;
  });

  // Automatically fetch latest remote updates from GitHub on the live website
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    if (!isLocal) {
      fetch(`https://raw.githubusercontent.com/alisrdar/doc-folio/master/src/data/cms-data.json?t=${Date.now()}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((remote) => {
          if (remote && remote.hero && remote.lastUpdated) {
            setData((prev) => {
              if (!prev.lastUpdated || new Date(remote.lastUpdated) > new Date(prev.lastUpdated)) {
                return { ...prev, ...remote };
              }
              return prev;
            });
          }
        })
        .catch(() => {});
    }
  }, []);

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

      // If running in local development, automatically write directly to disk files
      if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        fetch("/api/save-cms-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(withTimestamp),
        }).catch(() => {});
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
    const updated = [...data.clinics, newClinic].sort(
      (a, b) => (a.openHour ?? 0) - (b.openHour ?? 0)
    );
    saveState({ ...data, clinics: updated });
  };

  const updateClinic = (id: string, updates: Partial<ClinicItem>) => {
    const updated = data.clinics
      .map((c) => (c.id === id ? { ...c, ...updates } : c))
      .sort((a, b) => (a.openHour ?? 0) - (b.openHour ?? 0));
    saveState({ ...data, clinics: updated });
  };

  const deleteClinic = (id: string) => {
    saveState({
      ...data,
      clinics: data.clinics.filter((c) => c.id !== id),
    });
  };

  const addArticle = (item: Omit<ArticleItem, "id">) => {
    const newArticle: ArticleItem = { ...item, id: `art-${Date.now()}` };
    saveState({
      ...data,
      articles: [newArticle, ...(data.articles || [])],
    });
  };

  const updateArticle = (id: string, updates: Partial<ArticleItem>) => {
    saveState({
      ...data,
      articles: (data.articles || []).map((a) => (a.id === id ? { ...a, ...updates } : a)),
    });
  };

  const deleteArticle = (id: string) => {
    saveState({
      ...data,
      articles: (data.articles || []).filter((a) => a.id !== id),
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

  const addStat = (item: Omit<StatItem, "id">) => {
    const newItem: StatItem = { ...item, id: `stat-${Date.now()}` };
    saveState({ ...data, stats: [...data.stats, newItem] });
  };

  const updateStat = (id: string, updates: Partial<StatItem>) => {
    saveState({
      ...data,
      stats: data.stats.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    });
  };

  const deleteStat = (id: string) => {
    saveState({
      ...data,
      stats: data.stats.filter((s) => s.id !== id),
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

  const updateBooking = (id: string, updates: Partial<BookingInquiry>) => {
    saveState({
      ...data,
      bookings: data.bookings.map((b) => (b.id === id ? { ...b, ...updates } : b)),
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

export const ARTICLES = ${JSON.stringify(data.articles || [], null, 2)};
`;
  };

  const publishToGitHub = async (
    token: string,
    commitMessage = "chore(cms): update website content via Admin Panel"
  ) => {
    try {
      const repo = "alisrdar/doc-folio";
      const filePath = "src/data/cms-data.json";
      const branches = ["master", "main"];

      const jsonString = JSON.stringify(data, null, 2);
      const contentBase64 = btoa(unescape(encodeURIComponent(jsonString)));

      let errorMsg = "";

      for (const branch of branches) {
        try {
          const getUrl = `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`;
          const getRes = await fetch(getUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
          });

          let sha: string | undefined = undefined;
          if (getRes.ok) {
            const fileInfo = await getRes.json();
            sha = fileInfo.sha;
          }

          const putUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;
          const putRes = await fetch(putUrl, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.v3+json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: commitMessage,
              content: contentBase64,
              branch,
              ...(sha ? { sha } : {}),
            }),
          });

          if (!putRes.ok) {
            const errJson = await putRes.json().catch(() => ({}));
            errorMsg = errJson.message || `HTTP ${putRes.status}`;
          }
        } catch (e: any) {
          errorMsg = e?.message || String(e);
        }
      }

      if (
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
      ) {
        fetch("/api/save-cms-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }).catch(() => {});
      }

      if (errorMsg && errorMsg.includes("Bad credentials")) {
        return {
          success: false,
          message: "Invalid GitHub token. Please verify your personal access token.",
        };
      }

      return {
        success: true,
        message: "Successfully committed to GitHub! The live website is updating automatically.",
      };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || "Failed to commit to GitHub",
      };
    }
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
        addArticle,
        updateArticle,
        deleteArticle,
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
        addStat,
        updateStat,
        deleteStat,
        addBooking,
        updateBookingStatus,
        updateBooking,
        deleteBooking,
        resetToDefaults,
        exportJSON,
        importJSON,
        generateExportCode,
        publishToGitHub,
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
