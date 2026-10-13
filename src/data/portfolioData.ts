// Centralized content for Dr. Farhan Badshah's portfolio.
// Replace placeholder values (phone, URLs, addresses, quotes) with real data
// before going live — every consumer reads from this file.

const WHATSAPP_NUMBER = "923329579368"; // placeholder international format, no +
const WHATSAPP_MESSAGE =
  "Hello Dr. Farhan, I would like to book an appointment.";

export const CONTACT = {
  phone: "+92 332 9579368",
  phoneHref: "tel:+923329579368",
  email: "farhanbadshah30@gmail.com",
  emailHref: "mailto:farhanbadshah30@gmail.com",
  city: "Islamabad, Pakistan",
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
  )}`,
  googleBusinessUrl: "https://share.google/WCJTeE2wJj5p9yCGy",
  facebookUrl: "https://www.facebook.com/share/18Emn4jnBf/?mibextid=wwXIfr",
  instagramUrl: "https://www.instagram.com/farhan_badshah?igsh=dmo3ZWNtaG93ZHc0&utm_source=qr",
  tiktokUrl: "https://www.tiktok.com/@thephysioclinic03?_r=1&_t=ZS-971FtLaw3Of",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Locations", href: "#locations" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
  name: "Dr. Farhan Badshah",
  title: "Physiotherapist | Rehabilitation Specialist",
  subtitle:
    "Evidence-based physiotherapy and rehabilitation care in Islamabad — restoring movement, relieving pain, and returning you to the activities you love.",
  ctaLabel: "Book Appointment",
  oladocUrl: "https://oladoc.com/pakistan/islamabad/dr/physiotherapist/farhan-badshah/1931854",
  marhamUrl: "https://www.marham.pk/doctors/islamabad/physiotherapist/dr-farhan-badshah",
} as const;

export const LICENSES = [
  {
    code: "CORU",
    region: "Ireland",
    fullName: "Health & Social Care Professionals Council",
  },
  {
    code: "SCFHS",
    region: "Kingdom of Saudi Arabia",
    fullName: "Saudi Commission for Health Specialties",
  },
  {
    code: "AHPC",
    region: "Pakistan",
    fullName: "Allied Health Professionals Council",
  },
] as const;

export const BIO: string[] = [
  "Dr. Farhan Badshah is a highly qualified Physiotherapist and Rehabilitation Specialist with expertise in MSK Physiotherapy, Sports Rehabilitation, Neurological and Geriatric Rehabilitation, and Pain Management. He delivers evidence-based, patient-centered care focused on restoring movement, reducing pain, and improving functional well-being.",
  "With clinical experience across sports injuries, orthopedic conditions, neurological disorders, post-surgical rehabilitation, and chronic pain syndromes, Dr. Farhan develops individualized treatment plans combining advanced rehabilitation techniques, manual therapy, therapeutic exercise, and patient education. His holistic approach emphasizes not just recovery, but also injury prevention and long-term health maintenance.",
];

export const QUALIFICATIONS = [
  {
    title: "Doctor of Physiotherapy (DPT)",
    institution: "AUST",
    year: "",
  },
  {
    title: "MS Sports Physiotherapy",
    institution: "GTU",
    year: "",
  },
  {
    title: "Post Graduate Diploma (PGD) in Pain Management",
    institution: "ICMRS",
    year: "",
  },
] as const;

export const CERTIFICATIONS = [
  { title: "Diploma in Strength & Conditioning", issuer: "OMT" },
  { title: "Diploma in Football Medicine", issuer: "FIFA" },
  { title: "Certified Kinesiology Taping Practitioner", issuer: "OMT" },
] as const;

// `icon` must match a key in ServicesGrid's IconMap.
export type ServiceIconName =
  | "Activity"
  | "Bone"
  | "Brain"
  | "UserRound"
  | "Stethoscope"
  | "ShieldPlus"
  | "HeartPulse"
  | "Dumbbell"
  | "Hand"
  | "Zap"
  | "Target";

export const SERVICES: ReadonlyArray<{
  title: string;
  description: string;
  icon: ServiceIconName;
}> = [
  {
    title: "Sports Injury Rehab",
    description:
      "Return-to-play programs for acute injuries, overuse conditions, and post-injury performance recovery.",
    icon: "Activity",
  },
  {
    title: "Musculoskeletal Physiotherapy",
    description:
      "Assessment and treatment of joint, muscle, ligament, and tendon disorders across the body.",
    icon: "Bone",
  },
  {
    title: "Neurological Rehab",
    description:
      "Recovery programs for stroke, spinal cord injury, MS, and other neurological conditions.",
    icon: "Brain",
  },
  {
    title: "Geriatric Rehab",
    description:
      "Balance, mobility, and strength programs tailored for older adults to maintain independence.",
    icon: "UserRound",
  },
  {
    title: "Post-Surgical Rehab",
    description:
      "Structured recovery after orthopedic, sports, and reconstructive procedures.",
    icon: "Stethoscope",
  },
  {
    title: "Pain Management",
    description:
      "Multimodal pain care including manual therapy, dry needling, and graded exposure.",
    icon: "ShieldPlus",
  },
  {
    title: "Orthopedic Rehab",
    description:
      "Targeted rehabilitation for fractures, joint replacements, and degenerative conditions.",
    icon: "HeartPulse",
  },
  {
    title: "Strength & Conditioning",
    description:
      "Performance-focused programming for athletes and active individuals.",
    icon: "Dumbbell",
  },
  {
    title: "Kinesiology Taping",
    description:
      "Therapeutic taping to support recovery, reduce pain, and assist movement patterns.",
    icon: "Hand",
  },
  {
    title: "Exercise Therapy",
    description:
      "Targeted therapeutic exercises designed to improve strength, flexibility, and functional mobility.",
    icon: "Zap",
  },
  {
    title: "Injury Prevention & Performance Enhancement",
    description:
      "Proactive programs to prevent injuries and optimize athletic and functional performance.",
    icon: "Target",
  },
];

export const CLINICS = [
  {
    name: "Ali Medical Center",
    address: "F-8 Markaz, Islamabad",
    hours: "9:00 AM – 2:00 PM",
    mapsUrl: "https://maps.google.com/?q=Ali+Medical+Center+F-8+Islamabad",
  },
  {
    name: "Shahida Khaliq Hospital",
    address: "Plot No 14, Street No 22, G-8/4, Islamabad, 44000",
    hours: "2:00 PM – 5:00 PM",
    mapsUrl: "https://maps.google.com/?q=Shahida+Khaliq+Hospital+G-8/4+Islamabad",
  },
  {
    name: "General Practice Hospital",
    address: "New Blue Area, Pakland Tower 2, Islamabad",
    hours: "5:00 PM – 8:00 PM",
    mapsUrl: "https://maps.google.com/?q=Pakland+Tower+2+Islamabad",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Ahmed Khan",
    initial: "A",
    rating: 5,
    date: "2 weeks ago",
    reviewCount: "12 reviews",
    quote:
      "Dr. Farhan correctly diagnosed a long-standing knee issue that two other clinicians had missed. His exercise plan got me back to running pain-free in six weeks.",
  },
  {
    name: "Sara Malik",
    initial: "S",
    rating: 5,
    date: "1 month ago",
    reviewCount: "Local Guide · 47 reviews",
    quote:
      "Extremely professional and patient. He explained every step of my post-surgery recovery and the results speak for themselves.",
  },
  {
    name: "Imran Qureshi",
    initial: "I",
    rating: 5,
    date: "3 months ago",
    reviewCount: "8 reviews",
    quote:
      "Best physiotherapist I have consulted in Islamabad. Hands-on treatment combined with clear home exercises — highly recommended.",
  },
] as const;
