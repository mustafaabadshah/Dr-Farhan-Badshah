import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileEdit,
  GraduationCap,
  HelpCircle,
  Home,
  Layers,
  LayoutDashboard,
  type LucideIcon,
  Lock,
  LogOut,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Stethoscope,
  Trash2,
  Upload,
  User,
  X,
  KeyRound,
  FileSpreadsheet,
  Send,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import {
  useCMS,
  type ServiceItem,
  type ClinicItem,
  type ArticleItem,
  type FAQItem,
  type TestimonialItem,
  type QualificationItem,
  type CertificationItem,
  type LicenseItem,
  type StatItem,
  type BookingInquiry,
} from "@/lib/cms-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import type { ServiceIconName } from "@/data/portfolioData";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
});

type AdminTab =
  | "dashboard"
  | "seo"
  | "hero"
  | "services"
  | "clinics"
  | "articles"
  | "credentials"
  | "testimonials"
  | "faqs"
  | "bookings"
  | "export";

const AUTH_STORAGE_KEY = "docfolio_admin_auth_session";

function AdminDashboard() {
  const cms = useCMS();
  const { data } = cms;

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Inquiries filter & search
  const [searchInquiriesQuery, setSearchInquiriesQuery] = useState("");
  const [statusInquiriesFilter, setStatusInquiriesFilter] = useState<string>("All");

  // Service Modal
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<{
    title: string;
    description: string;
    category: ServiceItem["category"];
    icon: ServiceIconName;
  }>({
    title: "",
    description: "",
    category: "Spine & Pain",
    icon: "Activity",
  });

  // Clinic Modal
  const [clinicModalOpen, setClinicModalOpen] = useState(false);
  const [editingClinicId, setEditingClinicId] = useState<string | null>(null);
  const [clinicForm, setClinicForm] = useState({
    name: "",
    address: "",
    hours: "9:00 AM – 2:00 PM",
    days: "Monday – Saturday",
    openHour: 9,
    closeHour: 14,
    mapsUrl: "",
    phone: "",
  });

  // Qualification Modal
  const [qualificationModalOpen, setQualificationModalOpen] = useState(false);
  const [editingQualificationId, setEditingQualificationId] = useState<string | null>(null);
  const [qualificationForm, setQualificationForm] = useState({
    title: "",
    institution: "",
    year: "",
  });

  // Certification Modal
  const [certificationModalOpen, setCertificationModalOpen] = useState(false);
  const [editingCertificationId, setEditingCertificationId] = useState<string | null>(null);
  const [certificationForm, setCertificationForm] = useState({
    title: "",
    issuer: "",
  });

  // License Modal
  const [licenseModalOpen, setLicenseModalOpen] = useState(false);
  const [editingLicenseId, setEditingLicenseId] = useState<string | null>(null);
  const [licenseForm, setLicenseForm] = useState({
    code: "",
    region: "",
    fullName: "",
  });

  // Practice Stat Modal
  const [statModalOpen, setStatModalOpen] = useState(false);
  const [editingStatId, setEditingStatId] = useState<string | null>(null);
  const [statForm, setStatForm] = useState({
    label: "",
    value: "",
    description: "",
  });

  // FAQ Modal
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
    category: "Appointments",
  });

  // Testimonial Modal
  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    quote: "",
    rating: 5,
    date: "Recent",
    reviewCount: "Google Review",
    initial: "P",
  });

  // Manual Booking Modal
  const [manualBookingModalOpen, setManualBookingModalOpen] = useState(false);
  const [manualBookingForm, setManualBookingForm] = useState({
    patientName: "",
    phone: "",
    clinic: data.clinics?.[0]?.name || "Ali Medical Center",
    service: data.services?.[0]?.title || "Sports Injury Rehab",
    preferredDate: new Date().toISOString().split("T")[0],
    preferredTimeSlot: "Morning (10:00 AM – 01:00 PM)",
    notes: "",
  });

  // Edit Booking Modal
  const [bookingEditModalOpen, setBookingEditModalOpen] = useState(false);
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
  const [bookingEditForm, setBookingEditForm] = useState({
    patientName: "",
    phone: "",
    clinic: "",
    service: "",
    preferredDate: "",
    preferredTimeSlot: "",
    status: "New" as BookingInquiry["status"],
    appointmentType: "Clinic Visit" as "Clinic Visit" | "Home Rehab" | "Online Consultation",
    feeStatus: "Pending" as "Pending" | "Paid" | "Waived",
    notes: "",
    doctorNotes: "",
  });

  // WhatsApp Assistant Modal
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [selectedWaBooking, setSelectedWaBooking] = useState<BookingInquiry | null>(null);
  const [customWaMessage, setCustomWaMessage] = useState("");

  // Articles & Blog State
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [searchArticleQuery, setSearchArticleQuery] = useState("");
  const [filterArticleCategory, setFilterArticleCategory] = useState("All");
  const [articleForm, setArticleForm] = useState<{
    title: string;
    slug: string;
    category: ArticleItem["category"];
    readTime: string;
    date: string;
    imageUrl: string;
    description: string;
    content: string;
    featured: boolean;
  }>({
    title: "",
    slug: "",
    category: "Spine Care",
    readTime: "5 min read",
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    description: "",
    content: "",
    featured: false,
  });

  // Custom Admin Credentials State
  const [adminCreds, setAdminCreds] = useState(() => {
    try {
      const saved = localStorage.getItem("docfolio_admin_custom_creds");
      if (saved) return JSON.parse(saved);
    } catch {}
    return { user: "admin", pass: "drfarhan2026" };
  });
  const [securityModalOpen, setSecurityModalOpen] = useState(false);
  const [newAdminUser, setNewAdminUser] = useState(adminCreds.user);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [livePublishModalOpen, setLivePublishModalOpen] = useState(false);
  const [githubToken, setGithubToken] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("docfolio_github_pat") || "";
  });
  const [isPublishingLive, setIsPublishingLive] = useState(false);
  const [liveCommitMsg, setLiveCommitMsg] = useState("chore(cms): update website content via Admin Panel");

  const handlePublishLive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubToken.trim()) {
      toast.error("Please enter a GitHub Personal Access Token to publish live.");
      return;
    }
    setIsPublishingLive(true);
    localStorage.setItem("docfolio_github_pat", githubToken.trim());
    const res = await cms.publishToGitHub(githubToken.trim(), liveCommitMsg.trim());
    setIsPublishingLive(false);
    if (res.success) {
      toast.success(res.message);
      setLivePublishModalOpen(false);
    } else {
      toast.error(res.message);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      loginUser.trim().toLowerCase() === adminCreds.user.toLowerCase() &&
      loginPass === adminCreds.pass
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
      setLoginError("");
      toast.success("Welcome to DocFolio Admin Dashboard");
    } else {
      setLoginError("Invalid username or password. Please try again.");
      toast.error("Incorrect credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    toast.info("Logged out successfully");
  };

  // Service helpers
  const openNewService = () => {
    setEditingServiceId(null);
    setServiceForm({
      title: "",
      description: "",
      category: "Spine & Pain",
      icon: "Activity",
    });
    setServiceModalOpen(true);
  };

  const openEditService = (srv: ServiceItem) => {
    setEditingServiceId(srv.id);
    setServiceForm({
      title: srv.title || "",
      description: srv.description || "",
      category: srv.category || "General",
      icon: srv.icon || "Activity",
    });
    setServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title.trim()) {
      toast.error("Please enter a service title");
      return;
    }
    if (editingServiceId) {
      cms.updateService(editingServiceId, serviceForm);
      toast.success("Service updated successfully");
    } else {
      cms.addService(serviceForm);
      toast.success("New service added successfully");
    }
    setServiceModalOpen(false);
  };

  // Clinic helpers
  const openNewClinic = () => {
    setEditingClinicId(null);
    setClinicForm({
      name: "",
      address: "",
      hours: "9:00 AM – 2:00 PM",
      days: "Monday – Saturday",
      openHour: 9,
      closeHour: 14,
      mapsUrl: "https://maps.google.com/?q=Islamabad",
      phone: "",
    });
    setClinicModalOpen(true);
  };

  const openEditClinic = (c: ClinicItem) => {
    setEditingClinicId(c.id);
    setClinicForm({
      name: c.name || "",
      address: c.address || "",
      hours: c.hours || "",
      days: c.days || "Monday – Saturday",
      openHour: c.openHour ?? 9,
      closeHour: c.closeHour ?? 14,
      mapsUrl: c.mapsUrl || "",
      phone: c.phone || "",
    });
    setClinicModalOpen(true);
  };

  const handleSaveClinic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clinicForm.name.trim() || !clinicForm.address.trim()) {
      toast.error("Clinic name and address are required");
      return;
    }
    if (editingClinicId) {
      cms.updateClinic(editingClinicId, clinicForm);
      toast.success("Clinic updated successfully");
    } else {
      cms.addClinic(clinicForm);
      toast.success("New clinic added successfully");
    }
    setClinicModalOpen(false);
  };

  // Qualification helpers
  const openNewQualification = () => {
    setEditingQualificationId(null);
    setQualificationForm({ title: "", institution: "", year: "" });
    setQualificationModalOpen(true);
  };

  const openEditQualification = (q: QualificationItem) => {
    setEditingQualificationId(q.id);
    setQualificationForm({
      title: q.title || "",
      institution: q.institution || "",
      year: q.year || "",
    });
    setQualificationModalOpen(true);
  };

  const handleSaveQualification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qualificationForm.title.trim() || !qualificationForm.institution.trim()) {
      toast.error("Degree title and institution are required");
      return;
    }
    if (editingQualificationId) {
      cms.updateQualification(editingQualificationId, qualificationForm);
      toast.success("Degree qualification updated");
    } else {
      cms.addQualification(qualificationForm);
      toast.success("New qualification added");
    }
    setQualificationModalOpen(false);
  };

  // Certification helpers
  const openNewCertification = () => {
    setEditingCertificationId(null);
    setCertificationForm({ title: "", issuer: "" });
    setCertificationModalOpen(true);
  };

  const openEditCertification = (c: CertificationItem) => {
    setEditingCertificationId(c.id);
    setCertificationForm({ title: c.title || "", issuer: c.issuer || "" });
    setCertificationModalOpen(true);
  };

  const handleSaveCertification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificationForm.title.trim() || !certificationForm.issuer.trim()) {
      toast.error("Certification title and issuer are required");
      return;
    }
    if (editingCertificationId) {
      cms.updateCertification(editingCertificationId, certificationForm);
      toast.success("Certification updated");
    } else {
      cms.addCertification(certificationForm);
      toast.success("New certification added");
    }
    setCertificationModalOpen(false);
  };

  // License helpers
  const openNewLicense = () => {
    setEditingLicenseId(null);
    setLicenseForm({ code: "", region: "", fullName: "" });
    setLicenseModalOpen(true);
  };

  const openEditLicense = (lic: LicenseItem) => {
    setEditingLicenseId(lic.id);
    setLicenseForm({
      code: lic.code || "",
      region: lic.region || "",
      fullName: lic.fullName || "",
    });
    setLicenseModalOpen(true);
  };

  const handleSaveLicense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseForm.code.trim() || !licenseForm.region.trim()) {
      toast.error("License code and region are required");
      return;
    }
    if (editingLicenseId) {
      cms.updateLicense(editingLicenseId, licenseForm);
      toast.success("Medical license updated");
    } else {
      cms.addLicense(licenseForm);
      toast.success("New license added");
    }
    setLicenseModalOpen(false);
  };

  // Article helpers
  const openNewArticle = () => {
    setEditingArticleId(null);
    setArticleForm({
      title: "",
      slug: "",
      category: "Spine Care",
      readTime: "5 min read",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
      description: "",
      content: "",
      featured: false,
    });
    setArticleModalOpen(true);
  };

  const openEditArticle = (art: ArticleItem) => {
    setEditingArticleId(art.id);
    setArticleForm({
      title: art.title || "",
      slug: art.slug || "",
      category: art.category || "Spine Care",
      readTime: art.readTime || "5 min read",
      date: art.date || "",
      imageUrl: art.imageUrl || "",
      description: art.description || "",
      content: art.content || "",
      featured: !!art.featured,
    });
    setArticleModalOpen(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title.trim()) {
      toast.error("Article title is required");
      return;
    }
    if (!articleForm.description.trim()) {
      toast.error("Article summary / excerpt is required");
      return;
    }
    const cleanSlug = articleForm.slug.trim()
      ? articleForm.slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
      : articleForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

    const payload = {
      ...articleForm,
      slug: cleanSlug,
      imageUrl:
        articleForm.imageUrl.trim() ||
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    };

    if (editingArticleId) {
      cms.updateArticle(editingArticleId, payload);
      toast.success("Article updated successfully");
    } else {
      cms.addArticle(payload);
      toast.success("New article published successfully");
    }
    setArticleModalOpen(false);
  };

  // FAQ helpers
  const openNewFaq = () => {
    setEditingFaqId(null);
    setFaqForm({ question: "", answer: "", category: "Appointments" });
    setFaqModalOpen(true);
  };

  const openEditFaq = (f: FAQItem) => {
    setEditingFaqId(f.id);
    setFaqForm({ question: f.question || "", answer: f.answer || "", category: f.category || "Appointments" });
    setFaqModalOpen(true);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question.trim() || !faqForm.answer.trim()) {
      toast.error("Question and answer are required");
      return;
    }
    if (editingFaqId) {
      cms.updateFAQ(editingFaqId, faqForm);
      toast.success("FAQ updated");
    } else {
      cms.addFAQ(faqForm);
      toast.success("New FAQ added");
    }
    setFaqModalOpen(false);
  };

  // Practice Stat helpers
  const openNewStat = () => {
    setEditingStatId(null);
    setStatForm({ label: "", value: "", description: "" });
    setStatModalOpen(true);
  };

  const openEditStat = (s: StatItem) => {
    setEditingStatId(s.id);
    setStatForm({
      label: s.label || "",
      value: s.value || "",
      description: s.description || "",
    });
    setStatModalOpen(true);
  };

  const handleSaveStat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statForm.label.trim() || !statForm.value.trim()) {
      toast.error("Metric label and number value are required");
      return;
    }
    if (editingStatId) {
      cms.updateStat(editingStatId, statForm);
      toast.success("Practice impact metric updated");
    } else {
      cms.addStat(statForm);
      toast.success("New practice impact metric added");
    }
    setStatModalOpen(false);
  };

  // Testimonial helpers
  const openNewTestimonial = () => {
    setEditingTestimonialId(null);
    setTestimonialForm({
      name: "",
      quote: "",
      rating: 5,
      date: "Recent",
      reviewCount: "Google Review",
      initial: "P",
    });
    setTestimonialModalOpen(true);
  };

  const openEditTestimonial = (t: TestimonialItem) => {
    setEditingTestimonialId(t.id);
    setTestimonialForm({
      name: t.name || "",
      quote: t.quote || "",
      rating: t.rating || 5,
      date: t.date || "Recent",
      reviewCount: t.reviewCount || "Google Review",
      initial: t.initial || (t.name?.[0]?.toUpperCase() || "P"),
    });
    setTestimonialModalOpen(true);
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialForm.name.trim() || !testimonialForm.quote.trim()) {
      toast.error("Name and review quote are required");
      return;
    }
    const initial = testimonialForm.name.trim()[0]?.toUpperCase() || "P";
    if (editingTestimonialId) {
      cms.updateTestimonial(editingTestimonialId, {
        ...testimonialForm,
        initial,
      });
      toast.success("Patient testimonial updated");
    } else {
      cms.addTestimonial({
        ...testimonialForm,
        initial,
      });
      toast.success("Patient testimonial added");
    }
    setTestimonialModalOpen(false);
  };

  // Edit Booking Helper
  const openEditBooking = (b: BookingInquiry) => {
    setEditingBookingId(b.id);
    setBookingEditForm({
      patientName: b.patientName || "",
      phone: b.phone || "",
      clinic: b.clinic || data.clinics?.[0]?.name || "Ali Medical Center",
      service: b.service || data.services?.[0]?.title || "Sports Injury Rehab",
      preferredDate: b.preferredDate || new Date().toISOString().split("T")[0],
      preferredTimeSlot: b.preferredTimeSlot || "Morning (10:00 AM – 01:00 PM)",
      status: b.status || "New",
      appointmentType: b.appointmentType || "Clinic Visit",
      feeStatus: b.feeStatus || "Pending",
      notes: b.notes || "",
      doctorNotes: b.doctorNotes || "",
    });
    setBookingEditModalOpen(true);
  };

  const handleSaveBookingEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingEditForm.patientName.trim() || !bookingEditForm.phone.trim()) {
      toast.error("Patient name and phone are required");
      return;
    }
    if (editingBookingId) {
      cms.updateBooking(editingBookingId, bookingEditForm);
      toast.success("Patient appointment updated successfully");
    }
    setBookingEditModalOpen(false);
  };

  // WhatsApp Assistant Helper
  const openWhatsAppModal = (b: BookingInquiry) => {
    setSelectedWaBooking(b);
    const defaultMsg = `Hello ${b.patientName}, this is Dr. Farhan Badshah's physiotherapy clinic. We have confirmed your appointment for *${b.service}* at *${b.clinic}* on *${b.preferredDate}* (${b.preferredTimeSlot}). Please let us know if you need location directions.`;
    setCustomWaMessage(defaultMsg);
    setWaModalOpen(true);
  };

  // Security Credentials Helpers
  const handleSaveSecuritySettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminUser.trim() || !newAdminPass.trim()) {
      toast.error("Username and password cannot be empty");
      return;
    }
    const creds = { user: newAdminUser.trim(), pass: newAdminPass };
    setAdminCreds(creds);
    localStorage.setItem("docfolio_admin_custom_creds", JSON.stringify(creds));
    toast.success("Admin login credentials updated!");
    setSecurityModalOpen(false);
  };

  const handleResetSecuritySettings = () => {
    if (confirm("Reset admin credentials to default (admin / drfarhan2026)?")) {
      const defaultCreds = { user: "admin", pass: "drfarhan2026" };
      setAdminCreds(defaultCreds);
      setNewAdminUser("admin");
      setNewAdminPass("drfarhan2026");
      localStorage.removeItem("docfolio_admin_custom_creds");
      toast.info("Admin credentials reset to defaults");
    }
  };

  // Manual Booking Helper
  const handleSaveManualBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualBookingForm.patientName.trim() || !manualBookingForm.phone.trim()) {
      toast.error("Patient name and phone are required");
      return;
    }
    cms.addBooking(manualBookingForm);
    toast.success("Manual appointment inquiry recorded");
    setManualBookingModalOpen(false);
    setManualBookingForm({
      patientName: "",
      phone: "",
      clinic: data.clinics?.[0]?.name || "Ali Medical Center",
      service: data.services?.[0]?.title || "Sports Injury Rehab",
      preferredDate: new Date().toISOString().split("T")[0],
      preferredTimeSlot: "Morning (10:00 AM – 01:00 PM)",
      notes: "",
    });
  };

  // Export Inquiries to CSV
  const handleExportInquiriesCSV = () => {
    const inquiries = data.bookings || [];
    if (inquiries.length === 0) {
      toast.info("No inquiries to export");
      return;
    }
    const headers = [
      "ID",
      "Date Submitted",
      "Patient Name",
      "Phone",
      "Clinic",
      "Service",
      "Preferred Date",
      "Time Window",
      "Status",
      "Notes",
    ];
    const rows = inquiries.map((b) => [
      `"${b.id}"`,
      `"${b.createdAt}"`,
      `"${b.patientName.replace(/"/g, '""')}"`,
      `"${b.phone}"`,
      `"${b.clinic}"`,
      `"${b.service}"`,
      `"${b.preferredDate}"`,
      `"${b.preferredTimeSlot}"`,
      `"${b.status}"`,
      `"${(b.notes || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `patient-inquiries-dr-farhan-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Inquiries exported to CSV spreadsheet!");
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  // Available icon list for selector
  const availableIcons: ServiceIconName[] = [
    "Activity",
    "Bone",
    "Brain",
    "UserRound",
    "Stethoscope",
    "ShieldPlus",
    "HeartPulse",
    "Dumbbell",
    "Hand",
    "Zap",
    "Target",
  ];

  // Filtered inquiries list
  const filteredBookings = (data.bookings || []).filter((b) => {
    const matchesSearch =
      b.patientName.toLowerCase().includes(searchInquiriesQuery.toLowerCase()) ||
      b.phone.toLowerCase().includes(searchInquiriesQuery.toLowerCase()) ||
      b.service.toLowerCase().includes(searchInquiriesQuery.toLowerCase()) ||
      b.clinic.toLowerCase().includes(searchInquiriesQuery.toLowerCase());
    const matchesStatus =
      statusInquiriesFilter === "All" || b.status === statusInquiriesFilter;
    return matchesSearch && matchesStatus;
  });

  // ==========================================
  // WORDPRESS AUTHENTICATION SCREEN (LOGIN)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f0f0f1] px-4 font-sans text-[#2c3338]">
        <div className="w-full max-w-sm">
          {/* WordPress / DocFolio Logo */}
          <div className="mb-6 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#2271b1] text-2xl font-black text-white shadow-md shadow-[#2271b1]/30">
              W
            </div>
            <h1 className="mt-3 font-display text-xl font-bold tracking-tight text-[#1d2327]">
              DocFolio Admin Portal
            </h1>
            <p className="text-xs text-[#50575e]">
              Dr. Farhan Badshah — Content Management System
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-sm border border-[#c3c4c7] bg-white p-7 shadow-sm">
            {loginError && (
              <div className="mb-4 rounded border-l-4 border-[#d63638] bg-[#fcf0f1] p-3 text-xs text-[#d63638]">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1d2327]">
                  Username or Email Address
                </label>
                <Input
                  required
                  autoFocus
                  placeholder="admin"
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  className="rounded border-[#8c8f94] focus-visible:ring-[#2271b1]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1d2327]">
                  Password
                </label>
                <Input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="rounded border-[#8c8f94] focus-visible:ring-[#2271b1]"
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded bg-[#2271b1] py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#135e96]"
              >
                <Lock size={14} className="mr-2" /> Log In to CMS
              </Button>
            </form>
          </div>

          <div className="mt-6 text-center text-xs">
            <Link
              to="/"
              className="text-[#2271b1] hover:text-[#135e96] hover:underline flex items-center justify-center gap-1"
            >
              ← Back to Dr. Farhan Badshah Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED WORDPRESS ADMIN PANEL
  // ==========================================
  return (
    <div className="min-h-screen bg-[#f0f0f1] text-[#2c3338] font-sans antialiased">
      {/* 1. WordPress Admin Top Bar */}
      <header className="sticky top-0 z-50 flex h-10 w-full items-center justify-between bg-[#1d2327] px-3 text-white text-xs shadow-sm">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-white hover:text-[#72aee6] transition-colors cursor-pointer">
            <span className="grid h-6 w-6 place-items-center rounded bg-[#2271b1] text-xs font-black text-white">
              W
            </span>
            <span className="font-semibold hidden sm:inline">DocFolio CMS</span>
          </div>

          <span className="text-white/20">|</span>

          {/* Quick link to live site */}
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-1 text-white/80 hover:text-white transition-colors"
          >
            <Home size={13} />
            <span className="hidden md:inline">{data.hero?.name || "Dr. Farhan Badshah"}</span>
            <span className="text-[11px] text-white/60">↗ Visit Site</span>
          </Link>

          {/* New Bookings notification badge */}
          {(data.bookings || []).filter((b) => b.status === "New").length > 0 && (
            <button
              onClick={() => setActiveTab("bookings")}
              className="flex items-center gap-1 rounded bg-[#d63638] px-2 py-0.5 text-[11px] font-bold text-white hover:bg-[#b32d2e]"
            >
              <Calendar size={11} />
              <span>{(data.bookings || []).filter((b) => b.status === "New").length} New Inquiries</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1 text-emerald-400 font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Auto-Synced</span>
          </div>

          <Button
            size="sm"
            onClick={() => setExportModalOpen(true)}
            className="h-7 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs px-2.5 rounded font-medium flex items-center gap-1.5"
          >
            <Code2 size={13} />
            <span className="hidden sm:inline">Git Export / Code</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setSecurityModalOpen(true)}
            className="h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs px-2.5 rounded font-medium flex items-center gap-1.5"
            title="Manage admin login credentials"
          >
            <KeyRound size={12} />
            <span className="hidden sm:inline">Password</span>
          </Button>

          <button
            onClick={() => {
              if (confirm("Reset all content back to repository defaults?")) {
                cms.resetToDefaults();
                toast.success("Reset to defaults complete");
              }
            }}
            className="text-white/60 hover:text-white text-[11px] flex items-center gap-1"
            title="Reset to factory defaults"
          >
            <RefreshCw size={12} />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={() => setLivePublishModalOpen(true)}
            className="rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-1 flex items-center gap-1 shadow-xs transition"
            title="Publish all changes directly to live website on GitHub"
          >
            <Send size={11} />
            <span>Publish Live</span>
          </button>

          <button
            onClick={handleLogout}
            className="text-white/70 hover:text-red-400 text-[11px] flex items-center gap-1 pl-2 border-l border-white/20"
            title="Lock & Log Out"
          >
            <LogOut size={12} />
            <span className="hidden sm:inline">Log Out</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-2.5rem)] pb-16 md:pb-0">
        {/* Backdrop for mobile */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* 2. WordPress Left Navigation Sidebar */}
        <aside
          className={`fixed inset-y-10 left-0 z-50 w-60 bg-[#1d2327] text-white shadow-2xl transition-transform duration-200 md:static md:w-52 md:translate-x-0 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <nav className="flex flex-col py-2 text-[13px] font-normal">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "seo", label: "SEO & Meta Tags", icon: Search, badge: "Yoast" },
              { id: "hero", label: "Doctor & Hero", icon: User },
              { id: "services", label: "Specialties / Services", icon: Stethoscope },
              { id: "clinics", label: "Clinics & Schedule", icon: MapPin },
              {
                id: "articles",
                label: "Articles & Blog",
                icon: BookOpen,
                count: (data.articles || []).length,
              },
              { id: "credentials", label: "Degrees & Licenses", icon: GraduationCap },
              { id: "testimonials", label: "Patient Reviews", icon: Star },
              { id: "faqs", label: "FAQs Manager", icon: HelpCircle },
              {
                id: "bookings",
                label: "Patient Inquiries",
                icon: Calendar,
                count: (data.bookings || []).filter((b) => b.status === "New").length,
              },
              { id: "export", label: "Tools & Git Export", icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as AdminTab);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-2.5 text-left transition-colors ${
                    isActive
                      ? "bg-[#2271b1] text-white font-semibold"
                      : "text-[#c3c4c7] hover:bg-[#13171a] hover:text-[#72aee6]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="rounded bg-[#2271b1] px-1.5 py-0.2 text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span className="rounded-full bg-[#d63638] px-2 py-0.2 text-[10px] font-black text-white">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* 3. Main Content Area */}
        <main className="flex-1 p-4 md:p-8 max-w-6xl overflow-y-auto">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c3c4c7]/40 pb-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#1d2327]">
                    Dashboard Overview
                  </h1>
                  <p className="text-xs text-[#50575e]">
                    Welcome back, Dr. Farhan. Manage live SEO, patient treatments, clinic hours, and incoming appointment inquiries.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    asChild
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs rounded"
                  >
                    <Link to="/" target="_blank">
                      <Eye size={13} className="mr-1.5" /> View Live Website
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Quick Stat Cards */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                <div className="rounded-sm border border-[#c3c4c7] bg-white p-4 shadow-xs">
                  <div className="text-xs font-semibold text-[#646970]">SEO Health Score</div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-2xl font-bold text-emerald-600">98 / 100</span>
                    <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                      Excellent
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] text-[#646970]">Title, Meta, Schema.org active</div>
                </div>

                <div className="rounded-sm border border-[#c3c4c7] bg-white p-4 shadow-xs">
                  <div className="text-xs font-semibold text-[#646970]">Active Specialties</div>
                  <div className="mt-2 text-2xl font-bold text-[#1d2327]">
                    {(data.services || []).length}
                  </div>
                  <div className="mt-1 text-[11px] text-[#646970]">Across 5 categories</div>
                </div>

                <div className="rounded-sm border border-[#c3c4c7] bg-white p-4 shadow-xs">
                  <div className="text-xs font-semibold text-[#646970]">Islamabad Clinics</div>
                  <div className="mt-2 text-2xl font-bold text-[#1d2327]">
                    {(data.clinics || []).length}
                  </div>
                  <div className="mt-1 text-[11px] text-[#646970]">Live schedule active</div>
                </div>

                <div className="rounded-sm border border-[#c3c4c7] bg-white p-4 shadow-xs">
                  <div className="text-xs font-semibold text-[#646970]">Clinical Articles</div>
                  <div className="mt-2 text-2xl font-bold text-indigo-600">
                    {(data.articles || []).length}
                  </div>
                  <div className="mt-1 text-[11px] text-[#646970]">Patient Guides & Blog</div>
                </div>

                <div className="rounded-sm border border-[#c3c4c7] bg-white p-4 shadow-xs col-span-2 sm:col-span-1">
                  <div className="text-xs font-semibold text-[#646970]">Total Inquiries</div>
                  <div className="mt-2 text-2xl font-bold text-[#2271b1]">
                    {(data.bookings || []).length}
                  </div>
                  <div className="mt-1 text-[11px] text-[#646970]">
                    {(data.bookings || []).filter((b) => b.status === "New").length} new pending
                  </div>
                </div>
              </div>

              {/* Quick Content Actions */}
              <div className="border border-[#c3c4c7] bg-white shadow-xs">
                <div className="border-b border-[#c3c4c7] bg-[#f6f7f7] px-4 py-2.5 font-bold text-sm text-[#1d2327]">
                  Quick Actions & Shortcuts
                </div>
                <div className="p-4 grid gap-3 grid-cols-2 sm:grid-cols-5">
                  <button
                    onClick={() => setActiveTab("seo")}
                    className="flex flex-col items-start rounded border border-[#dcdcde] p-3 text-left hover:border-[#2271b1] hover:bg-[#f6f7f7] transition"
                  >
                    <div className="font-bold text-xs text-[#2271b1] flex items-center gap-1.5">
                      <Search size={14} /> SEO Meta Tags
                    </div>
                    <div className="mt-1 text-[11px] text-[#646970]">
                      Optimize search snippets
                    </div>
                  </button>

                  <button
                    onClick={openNewArticle}
                    className="flex flex-col items-start rounded border border-[#dcdcde] p-3 text-left hover:border-[#2271b1] hover:bg-[#f6f7f7] transition"
                  >
                    <div className="font-bold text-xs text-indigo-600 flex items-center gap-1.5">
                      <BookOpen size={14} /> Write Article
                    </div>
                    <div className="mt-1 text-[11px] text-[#646970]">
                      Publish medical rehab guide
                    </div>
                  </button>

                  <button
                    onClick={openNewClinic}
                    className="flex flex-col items-start rounded border border-[#dcdcde] p-3 text-left hover:border-[#2271b1] hover:bg-[#f6f7f7] transition"
                  >
                    <div className="font-bold text-xs text-[#2271b1] flex items-center gap-1.5">
                      <Plus size={14} /> Add Clinic
                    </div>
                    <div className="mt-1 text-[11px] text-[#646970]">
                      Add clinic center & hours
                    </div>
                  </button>

                  <button
                    onClick={openNewQualification}
                    className="flex flex-col items-start rounded border border-[#dcdcde] p-3 text-left hover:border-[#2271b1] hover:bg-[#f6f7f7] transition"
                  >
                    <div className="font-bold text-xs text-[#2271b1] flex items-center gap-1.5">
                      <GraduationCap size={14} /> Qualification
                    </div>
                    <div className="mt-1 text-[11px] text-[#646970]">
                      Add medical degree/diploma
                    </div>
                  </button>

                  <button
                    onClick={() => setManualBookingModalOpen(true)}
                    className="flex flex-col items-start rounded border border-[#dcdcde] p-3 text-left hover:border-[#2271b1] hover:bg-[#f6f7f7] transition col-span-2 sm:col-span-1"
                  >
                    <div className="font-bold text-xs text-[#2271b1] flex items-center gap-1.5">
                      <Calendar size={14} /> Record Walk-in
                    </div>
                    <div className="mt-1 text-[11px] text-[#646970]">
                      Manually add patient
                    </div>
                  </button>
                </div>
              </div>

              {/* Recent Inquiries Snippet */}
              <div className="border border-[#c3c4c7] bg-white shadow-xs">
                <div className="flex items-center justify-between border-b border-[#c3c4c7] bg-[#f6f7f7] px-4 py-2.5">
                  <span className="font-bold text-sm text-[#1d2327]">
                    Recent Appointment Inquiries
                  </span>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className="text-xs text-[#2271b1] hover:underline"
                  >
                    View All ({(data.bookings || []).length})
                  </button>
                </div>
                <div className="p-4">
                  {(data.bookings || []).length === 0 ? (
                    <div className="text-xs text-[#646970] py-4 text-center">
                      No appointment inquiries yet.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-[#c3c4c7] text-[#646970]">
                            <th className="py-2">Patient</th>
                            <th className="py-2">Phone</th>
                            <th className="py-2">Clinic</th>
                            <th className="py-2">Specialty</th>
                            <th className="py-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(data.bookings || []).slice(0, 5).map((b) => (
                            <tr key={b.id} className="border-b border-slate-100 hover:bg-slate-50">
                              <td className="py-2 font-semibold text-[#1d2327]">{b.patientName}</td>
                              <td className="py-2">{b.phone}</td>
                              <td className="py-2">{b.clinic}</td>
                              <td className="py-2">{b.service}</td>
                              <td className="py-2">
                                <span
                                  className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                                    b.status === "New"
                                      ? "bg-amber-100 text-amber-800"
                                      : b.status === "Confirmed"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : "bg-slate-100 text-slate-700"
                                  }`}
                                >
                                  {b.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SEO & METADATA MANAGER */}
          {activeTab === "seo" && (
            <div className="space-y-6">
              <div className="border-b border-[#c3c4c7]/40 pb-4">
                <h1 className="text-2xl font-bold text-[#1d2327]">
                  SEO & Search Engine Optimization
                </h1>
                <p className="text-xs text-[#50575e]">
                  Manage meta titles, descriptions, Google SERP previews, and Schema.org rich snippets for top Google ranking in Islamabad.
                </p>
              </div>

              {/* Google SERP Live Snippet Preview */}
              <div className="border border-[#c3c4c7] bg-white p-5 shadow-xs">
                <div className="text-xs font-bold text-[#50575e] uppercase tracking-wider mb-2">
                  Google Search Result Preview (Desktop & Mobile)
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4 max-w-2xl font-sans">
                  <div className="flex items-center gap-2 text-xs text-[#202124]">
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-600 text-[9px] text-white font-bold">
                      D
                    </span>
                    <span className="truncate">https://drfarhanbadshah.com</span>
                  </div>
                  <div className="mt-1 text-lg text-[#1a0dab] font-medium hover:underline cursor-pointer line-clamp-1">
                    {data.seo?.pageTitle ?? ""}
                  </div>
                  <div className="mt-1 text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                    {data.seo?.metaDescription ?? ""}
                  </div>
                </div>
              </div>

              {/* SEO Edit Form */}
              <div className="border border-[#c3c4c7] bg-white p-5 shadow-xs space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-[#1d2327]">
                    <label>SEO Page Title Tag *</label>
                    <span className="text-[11px] text-muted-foreground">
                      {(data.seo?.pageTitle || "").length} / 65 characters
                    </span>
                  </div>
                  <Input
                    value={data.seo?.pageTitle ?? ""}
                    onChange={(e) => cms.updateSEO({ pageTitle: e.target.value })}
                    className="rounded"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-[#1d2327]">
                    <label>Meta Description *</label>
                    <span className="text-[11px] text-muted-foreground">
                      {(data.seo?.metaDescription || "").length} / 160 characters
                    </span>
                  </div>
                  <Textarea
                    rows={3}
                    value={data.seo?.metaDescription ?? ""}
                    onChange={(e) => cms.updateSEO({ metaDescription: e.target.value })}
                    className="rounded"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d2327]">
                      Target Keywords (Comma-separated)
                    </label>
                    <Input
                      value={data.seo?.keywords ?? ""}
                      onChange={(e) => cms.updateSEO({ keywords: e.target.value })}
                      className="rounded"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d2327]">Canonical URL</label>
                    <Input
                      value={data.seo?.canonicalUrl ?? ""}
                      onChange={(e) => cms.updateSEO({ canonicalUrl: e.target.value })}
                      className="rounded"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d2327]">OpenGraph Social Title</label>
                    <Input
                      value={data.seo?.ogTitle ?? ""}
                      onChange={(e) => cms.updateSEO({ ogTitle: e.target.value })}
                      className="rounded"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d2327]">Social Image URL</label>
                    <Input
                      value={data.seo?.ogImage ?? ""}
                      onChange={(e) => cms.updateSEO({ ogImage: e.target.value })}
                      className="rounded"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    onClick={() => toast.success("SEO settings saved")}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs px-6"
                  >
                    <Save size={14} className="mr-1.5" /> Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DOCTOR & HERO PROFILE */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div className="border-b border-[#c3c4c7]/40 pb-4">
                <h1 className="text-2xl font-bold text-[#1d2327]">
                  Doctor Profile & Hero Header
                </h1>
                <p className="text-xs text-[#50575e]">
                  Update Dr. Farhan's medical titles, introductory bio paragraphs, WhatsApp number, and clinic booking links.
                </p>
              </div>

              <div className="border border-[#c3c4c7] bg-white p-5 shadow-xs space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d2327]">Full Name *</label>
                    <Input
                      value={data.hero?.name ?? ""}
                      onChange={(e) => cms.updateHero({ name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d2327]">Professional Title *</label>
                    <Input
                      value={data.hero?.title ?? ""}
                      onChange={(e) => cms.updateHero({ title: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1d2327]">Hero Subtitle / Mission</label>
                  <Textarea
                    rows={2}
                    value={data.hero?.subtitle ?? ""}
                    onChange={(e) => cms.updateHero({ subtitle: e.target.value })}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d2327]">WhatsApp Phone (Digits)</label>
                    <Input
                      value={data.contact?.whatsappNumber ?? ""}
                      onChange={(e) => cms.updateContact({ whatsappNumber: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d2327]">Direct Phone</label>
                    <Input
                      value={data.contact?.phone ?? ""}
                      onChange={(e) => cms.updateContact({ phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d2327]">Email Address</label>
                    <Input
                      value={data.contact?.email ?? ""}
                      onChange={(e) => cms.updateContact({ email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d2327]">Oladoc Profile URL</label>
                    <Input
                      value={data.hero?.oladocUrl ?? ""}
                      onChange={(e) => cms.updateHero({ oladocUrl: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d2327]">Marham Profile URL</label>
                    <Input
                      value={data.hero?.marhamUrl ?? ""}
                      onChange={(e) => cms.updateHero({ marhamUrl: e.target.value })}
                    />
                  </div>
                </div>

                {/* Bio Paragraphs Editor */}
                <div className="pt-4 border-t border-[#c3c4c7]/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#1d2327]">
                      Clinical Bio Paragraphs ({(data.bio || []).length})
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...(data.bio || []), "New clinical bio paragraph..."];
                        cms.updateBio(updated);
                        toast.success("New paragraph added");
                      }}
                      className="text-xs text-[#2271b1] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Plus size={12} /> Add Paragraph
                    </button>
                  </div>

                  {(data.bio || []).map((p, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <span className="text-xs font-bold text-muted-foreground pt-2">
                        #{idx + 1}
                      </span>
                      <Textarea
                        rows={3}
                        value={p ?? ""}
                        onChange={(e) => {
                          const updated = [...(data.bio || [])];
                          updated[idx] = e.target.value;
                          cms.updateBio(updated);
                        }}
                      />
                      {(data.bio || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (data.bio || []).filter((_, i) => i !== idx);
                            cms.updateBio(updated);
                            toast.info("Paragraph removed");
                          }}
                          className="pt-2 text-slate-400 hover:text-red-500"
                          title="Remove paragraph"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    onClick={() => toast.success("Doctor profile updated successfully")}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs px-6"
                  >
                    <Save size={14} className="mr-1.5" /> Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES & TREATMENTS */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#c3c4c7]/40 pb-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#1d2327]">
                    Specialty Treatments ({(data.services || []).length})
                  </h1>
                  <p className="text-xs text-[#50575e]">
                    Add, edit, or remove physiotherapy services shown on the live website.
                  </p>
                </div>
                <Button
                  onClick={openNewService}
                  className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs"
                >
                  <Plus size={14} className="mr-1.5" /> Add New Service
                </Button>
              </div>

              <div className="border border-[#c3c4c7] bg-white shadow-xs overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#c3c4c7] bg-[#f6f7f7] text-[#50575e]">
                      <th className="py-2.5 px-4">Title</th>
                      <th className="py-2.5 px-4">Category</th>
                      <th className="py-2.5 px-4">Description</th>
                      <th className="py-2.5 px-4">Icon</th>
                      <th className="py-2.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data.services || []).map((srv) => (
                      <tr key={srv.id} className="border-b border-slate-100 hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-bold text-[#1d2327]">{srv.title}</td>
                        <td className="py-3 px-4">
                          <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                            {srv.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#50575e] max-w-xs truncate">
                          {srv.description}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-muted-foreground">
                          {srv.icon}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditService(srv)}
                              className="text-[#2271b1] hover:underline flex items-center gap-1"
                            >
                              <FileEdit size={12} /> Edit
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete service "${srv.title}"?`)) {
                                  cms.deleteService(srv.id);
                                  toast.success("Service deleted");
                                }
                              }}
                              className="text-[#d63638] hover:underline flex items-center gap-1"
                            >
                              <Trash2 size={12} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: CLINICS & SCHEDULE */}
          {activeTab === "clinics" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#c3c4c7]/40 pb-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#1d2327]">
                    Clinics & Operating Timings ({(data.clinics || []).length})
                  </h1>
                  <p className="text-xs text-[#50575e]">
                    Add, edit, or remove clinic locations and set operating shift hours.
                  </p>
                </div>
                <Button
                  onClick={openNewClinic}
                  className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs"
                >
                  <Plus size={14} className="mr-1.5" /> Add New Clinic
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {[...(data.clinics || [])]
                  .sort((a, b) => (a.openHour ?? 0) - (b.openHour ?? 0))
                  .map((clinic, idx) => (
                  <div
                    key={clinic.id}
                    className="border border-[#c3c4c7] bg-white p-5 shadow-xs flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="font-bold text-sm text-[#1d2327] flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={16} className="text-[#2271b1]" />
                          {clinic.name}
                        </span>
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 font-semibold">
                          #{idx + 1}
                        </span>
                      </div>

                      <div className="text-xs text-[#50575e] leading-relaxed">
                        <div className="font-semibold text-slate-800">Address:</div>
                        <div>{clinic.address}</div>
                      </div>

                      <div className="rounded bg-slate-50 p-2.5 text-xs space-y-1">
                        <div className="flex items-center justify-between text-[#1d2327] font-semibold">
                          <span>{clinic.days}</span>
                          <span className="text-[#2271b1]">{clinic.hours}</span>
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          Open: {clinic.openHour}:00 — Close: {clinic.closeHour}:00 (24h)
                        </div>
                      </div>

                      {clinic.phone && (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                          <Phone size={12} className="text-emerald-600" />
                          <span>Direct Desk: {clinic.phone}</span>
                        </div>
                      )}

                      {clinic.mapsUrl && (
                        <a
                          href={clinic.mapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-[#2271b1] hover:underline"
                        >
                          <ExternalLink size={11} /> View Google Maps Link
                        </a>
                      )}
                    </div>

                    <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => openEditClinic(clinic)}
                        className="text-xs text-[#2271b1] hover:underline flex items-center gap-1 font-semibold"
                      >
                        <FileEdit size={12} /> Edit Details
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete clinic "${clinic.name}"?`)) {
                            cms.deleteClinic(clinic.id);
                            toast.success("Clinic deleted");
                          }
                        }}
                        className="text-xs text-[#d63638] hover:underline flex items-center gap-1"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ARTICLES & INSIGHTS (CLINICAL BLOG) */}
          {activeTab === "articles" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c3c4c7]/40 pb-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#1d2327] flex items-center gap-2">
                    <BookOpen className="text-[#2271b1]" size={24} />
                    Clinical Articles & Blog ({(data.articles || []).length})
                  </h1>
                  <p className="text-xs text-[#50575e]">
                    Write, manage, and publish evidence-based patient guides, pain relief tips, and sports rehab articles. Automatically indexed with Schema.org BlogPosting for Google and AI search visibility.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={openNewArticle}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs rounded"
                  >
                    <Plus size={14} className="mr-1.5" /> Write New Article
                  </Button>
                </div>
              </div>

              {/* Filters & Search Toolbar */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white border border-[#c3c4c7] p-3 rounded-sm shadow-xs">
                <div className="relative flex-1 max-w-sm">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search articles by title, excerpt, condition..."
                    value={searchArticleQuery}
                    onChange={(e) => setSearchArticleQuery(e.target.value)}
                    className="pl-8 text-xs h-8"
                  />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                  {["All", "Spine Care", "Sports Medicine", "Posture & Ergonomics", "Joint Health", "Rehabilitation"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilterArticleCategory(cat)}
                      className={`whitespace-nowrap rounded px-2.5 py-1 text-xs font-semibold transition ${
                        filterArticleCategory === cat
                          ? "bg-[#2271b1] text-white"
                          : "bg-slate-100 text-[#50575e] hover:bg-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Articles Grid */}
              {(() => {
                const filtered = (data.articles || []).filter((a) => {
                  const matchesCat =
                    filterArticleCategory === "All" || a.category === filterArticleCategory;
                  const q = searchArticleQuery.trim().toLowerCase();
                  const matchesQuery =
                    !q ||
                    a.title.toLowerCase().includes(q) ||
                    a.description.toLowerCase().includes(q) ||
                    a.category.toLowerCase().includes(q) ||
                    a.content.toLowerCase().includes(q);
                  return matchesCat && matchesQuery;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="rounded border border-[#c3c4c7] bg-white p-12 text-center shadow-xs">
                      <BookOpen size={40} className="mx-auto text-slate-300 mb-3" />
                      <h3 className="text-sm font-bold text-slate-700">No Articles Found</h3>
                      <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                        {searchArticleQuery || filterArticleCategory !== "All"
                          ? "No published articles matched your search filters. Try clearing your search."
                          : "You haven't written any articles yet. Add evidence-based rehabilitation advice and patient recovery tips to boost SEO and educate patients."}
                      </p>
                      <div className="mt-4 flex justify-center gap-2">
                        {(searchArticleQuery || filterArticleCategory !== "All") && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSearchArticleQuery("");
                              setFilterArticleCategory("All");
                            }}
                            className="text-xs"
                          >
                            Reset Filters
                          </Button>
                        )}
                        <Button
                          size="sm"
                          onClick={openNewArticle}
                          className="bg-[#2271b1] text-white text-xs"
                        >
                          <Plus size={13} className="mr-1" /> Add First Article
                        </Button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((art) => (
                      <div
                        key={art.id}
                        className="rounded-lg border border-[#c3c4c7] bg-white shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition"
                      >
                        <div>
                          {/* Article Image Preview */}
                          <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                            <img
                              src={art.imageUrl}
                              alt={art.title}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80";
                              }}
                            />
                            <div className="absolute top-2 left-2 flex items-center gap-1.5">
                              <span className="rounded bg-black/70 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold text-white">
                                {art.category}
                              </span>
                              {art.featured && (
                                <span className="rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-black text-white">
                                  ★ Featured
                                </span>
                              )}
                            </div>
                            <span className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white/90">
                              {art.readTime}
                            </span>
                          </div>

                          {/* Content summary */}
                          <div className="p-4 space-y-2">
                            <div className="text-[11px] font-medium text-muted-foreground flex items-center gap-2">
                              <Clock size={11} /> {art.date}
                            </div>
                            <h3 className="font-bold text-sm text-[#1d2327] line-clamp-2 leading-snug">
                              {art.title}
                            </h3>
                            <p className="text-xs text-[#50575e] line-clamp-3 leading-relaxed">
                              {art.description}
                            </p>
                          </div>
                        </div>

                        {/* Card Footer Actions */}
                        <div className="p-4 pt-2 border-t border-slate-100 bg-[#f9fafb] flex items-center justify-between text-xs">
                          <button
                            onClick={() => openEditArticle(art)}
                            className="font-bold text-[#2271b1] hover:underline flex items-center gap-1"
                          >
                            <FileEdit size={13} /> Edit Article
                          </button>
                          <div className="flex items-center gap-3">
                            <a
                              href="/#articles"
                              target="_blank"
                              rel="noreferrer"
                              className="text-slate-500 hover:text-slate-800 flex items-center gap-1"
                            >
                              <ExternalLink size={12} /> View Live
                            </a>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete "${art.title}"?`)) {
                                  cms.deleteArticle(art.id);
                                  toast.success("Article deleted");
                                }
                              }}
                              className="text-[#d63638] hover:underline flex items-center gap-1"
                            >
                              <Trash2 size={12} /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 6: CREDENTIALS & LICENSES */}
          {activeTab === "credentials" && (
            <div className="space-y-8">
              <div className="border-b border-[#c3c4c7]/40 pb-4">
                <h1 className="text-2xl font-bold text-[#1d2327]">
                  Degrees, Certifications & Licenses
                </h1>
                <p className="text-xs text-[#50575e]">
                  Add, edit, or delete degrees (DPT, MS), sports certifications (FIFA, OMT), and international licensure.
                </p>
              </div>

              {/* 1. International Licenses */}
              <div className="border border-[#c3c4c7] bg-white p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-[#1d2327] flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[#2271b1]" />
                    <span>International Medical Licenses ({(data.licenses || []).length})</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={openNewLicense}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs h-7"
                  >
                    <Plus size={12} className="mr-1" /> Add License
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(data.licenses || []).map((lic) => (
                    <div
                      key={lic.id}
                      className="rounded border border-slate-200 p-3.5 space-y-2 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-[#1d2327]">{lic.code}</span>
                          <span className="text-xs font-semibold text-[#2271b1]">{lic.region}</span>
                        </div>
                        <div className="mt-1 text-xs text-[#50575e]">{lic.fullName}</div>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex justify-end gap-3 text-xs">
                        <button
                          onClick={() => openEditLicense(lic)}
                          className="text-[#2271b1] hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete license ${lic.code}?`)) {
                              cms.deleteLicense(lic.id);
                              toast.success("License deleted");
                            }
                          }}
                          className="text-[#d63638] hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Academic Qualifications */}
              <div className="border border-[#c3c4c7] bg-white p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-[#1d2327] flex items-center gap-2">
                    <GraduationCap size={16} className="text-[#2271b1]" />
                    <span>Academic Qualifications & Degrees ({(data.qualifications || []).length})</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={openNewQualification}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs h-7"
                  >
                    <Plus size={12} className="mr-1" /> Add Degree
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(data.qualifications || []).map((q) => (
                    <div
                      key={q.id}
                      className="rounded border border-slate-200 p-3.5 space-y-2 flex flex-col justify-between"
                    >
                      <div>
                        <div className="font-bold text-xs text-[#1d2327]">{q.title}</div>
                        <div className="text-xs text-[#50575e]">{q.institution}</div>
                        {q.year && !["completed", "ongoing"].includes(q.year.trim().toLowerCase()) && (
                          <div className="mt-1 inline-block rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                            {q.year}
                          </div>
                        )}
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex justify-end gap-3 text-xs">
                        <button
                          onClick={() => openEditQualification(q)}
                          className="text-[#2271b1] hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete qualification ${q.title}?`)) {
                              cms.deleteQualification(q.id);
                              toast.success("Qualification deleted");
                            }
                          }}
                          className="text-[#d63638] hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Certifications */}
              <div className="border border-[#c3c4c7] bg-white p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-[#1d2327] flex items-center gap-2">
                    <Award size={16} className="text-[#2271b1]" />
                    <span>Specialized Certifications ({(data.certifications || []).length})</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={openNewCertification}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs h-7"
                  >
                    <Plus size={12} className="mr-1" /> Add Certification
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(data.certifications || []).map((c) => (
                    <div
                      key={c.id}
                      className="rounded border border-slate-200 p-3.5 space-y-2 flex flex-col justify-between"
                    >
                      <div>
                        <div className="font-bold text-xs text-[#1d2327]">{c.title}</div>
                        <div className="text-xs text-[#50575e]">Issuer: {c.issuer}</div>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex justify-end gap-3 text-xs">
                        <button
                          onClick={() => openEditCertification(c)}
                          className="text-[#2271b1] hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete certification ${c.title}?`)) {
                              cms.deleteCertification(c.id);
                              toast.success("Certification deleted");
                            }
                          }}
                          className="text-[#d63638] hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Practice Impact Numbers / Stats */}
              <div className="border border-[#c3c4c7] bg-white p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-[#1d2327] flex items-center gap-2">
                    <TrendingUp size={16} className="text-[#2271b1]" />
                    <span>Practice Metrics & Impact Numbers ({(data.stats || []).length})</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={openNewStat}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs h-7"
                  >
                    <Plus size={12} className="mr-1" /> Add Metric
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-4">
                  {(data.stats || []).map((s) => (
                    <div
                      key={s.id}
                      className="rounded border border-slate-200 p-3.5 space-y-2 flex flex-col justify-between"
                    >
                      <div>
                        <div className="font-bold text-lg text-primary">{s.value}</div>
                        <div className="font-bold text-xs text-[#1d2327]">{s.label}</div>
                        <div className="mt-1 text-[11px] text-[#50575e] leading-snug">
                          {s.description}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex justify-end gap-3 text-xs">
                        <button
                          onClick={() => openEditStat(s)}
                          className="text-[#2271b1] hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete metric "${s.label}"?`)) {
                              cms.deleteStat(s.id);
                              toast.success("Practice metric deleted");
                            }
                          }}
                          className="text-[#d63638] hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#c3c4c7]/40 pb-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#1d2327]">
                    Patient Testimonials ({(data.testimonials || []).length})
                  </h1>
                  <p className="text-xs text-[#50575e]">
                    Manage patient reviews, ratings, and quotes displayed on the website.
                  </p>
                </div>
                <Button
                  onClick={openNewTestimonial}
                  className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs"
                >
                  <Plus size={14} className="mr-1.5" /> Add New Review
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {(data.testimonials || []).map((t) => (
                  <div
                    key={t.id}
                    className="border border-[#c3c4c7] bg-white p-5 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#1d2327]">{t.name}</span>
                        <div className="flex text-amber-400">
                          {Array.from({ length: t.rating || 5 }).map((_, i) => (
                            <Star key={i} size={12} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                      <div className="mt-1 text-[11px] text-[#646970]">
                        {t.reviewCount} · {t.date}
                      </div>
                      <p className="mt-3 text-xs text-[#2c3338] italic">
                        "{t.quote}"
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => openEditTestimonial(t)}
                        className="text-xs text-[#2271b1] hover:underline flex items-center gap-1 font-semibold"
                      >
                        <FileEdit size={12} /> Edit Review
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove review by ${t.name}?`)) {
                            cms.deleteTestimonial(t.id);
                            toast.success("Review deleted");
                          }
                        }}
                        className="text-xs text-[#d63638] hover:underline flex items-center gap-1"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: FAQS MANAGER */}
          {activeTab === "faqs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#c3c4c7]/40 pb-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#1d2327]">
                    Frequently Asked Questions ({(data.faqs || []).length})
                  </h1>
                  <p className="text-xs text-[#50575e]">
                    Manage patient questions and detailed answers in the interactive accordion.
                  </p>
                </div>
                <Button
                  onClick={openNewFaq}
                  className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs"
                >
                  <Plus size={14} className="mr-1.5" /> Add New FAQ
                </Button>
              </div>

              <div className="space-y-3">
                {(data.faqs || []).map((faq, idx) => (
                  <div
                    key={faq.id}
                    className="border border-[#c3c4c7] bg-white p-4 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                            {faq.category}
                          </span>
                          <span className="font-bold text-sm text-[#1d2327]">
                            Q{idx + 1}: {faq.question}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-[#50575e] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={() => openEditFaq(faq)}
                          className="text-xs text-[#2271b1] hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Delete this FAQ?")) {
                              cms.deleteFAQ(faq.id);
                              toast.success("FAQ deleted");
                            }
                          }}
                          className="text-xs text-[#d63638] hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: INQUIRIES & BOOKINGS LOG (WITH WHATSAPP & SPREADSHEET EXPORT) */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c3c4c7]/40 pb-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#1d2327]">
                    Patient Inquiries & Appointments ({(data.bookings || []).length})
                  </h1>
                  <p className="text-xs text-[#50575e]">
                    Manage consultation bookings, one-click WhatsApp confirmations, doctor's notes, and export to CSV.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => setManualBookingModalOpen(true)}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs h-8"
                  >
                    <Plus size={13} className="mr-1" /> Record New Patient
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleExportInquiriesCSV}
                    className="text-xs h-8 bg-white border-slate-300"
                  >
                    <FileSpreadsheet size={13} className="mr-1 text-emerald-600" /> Export CSV
                  </Button>
                </div>
              </div>

              {/* Quick Status Filter Pills with Live Counters */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { key: "All", label: "All Inquiries", count: (data.bookings || []).length, badgeBg: "bg-slate-200 text-slate-800" },
                  { key: "New", label: "New Leads", count: (data.bookings || []).filter((b) => b.status === "New").length, badgeBg: "bg-amber-100 text-amber-800" },
                  { key: "Confirmed", label: "Confirmed", count: (data.bookings || []).filter((b) => b.status === "Confirmed").length, badgeBg: "bg-emerald-100 text-emerald-800" },
                  { key: "Completed", label: "Completed", count: (data.bookings || []).filter((b) => b.status === "Completed").length, badgeBg: "bg-blue-100 text-blue-800" },
                  { key: "Cancelled", label: "Cancelled", count: (data.bookings || []).filter((b) => b.status === "Cancelled").length, badgeBg: "bg-rose-100 text-rose-800" },
                ].map((chip) => (
                  <button
                    key={chip.key}
                    onClick={() => setStatusInquiriesFilter(chip.key)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border transition-all ${
                      statusInquiriesFilter === chip.key
                        ? "bg-[#2271b1] text-white border-[#2271b1] shadow-xs"
                        : "bg-white text-slate-700 border-slate-300 hover:border-[#2271b1]"
                    }`}
                  >
                    <span>{chip.label}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                        statusInquiriesFilter === chip.key
                          ? "bg-white/25 text-white"
                          : chip.badgeBg
                      }`}
                    >
                      {chip.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 border border-[#c3c4c7]">
                <div className="relative flex-1 w-full">
                  <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                  <Input
                    placeholder="Search patient name, phone, clinic, or service..."
                    value={searchInquiriesQuery}
                    onChange={(e) => setSearchInquiriesQuery(e.target.value)}
                    className="pl-9 h-8 text-xs"
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-semibold text-slate-600">Status:</span>
                  <select
                    value={statusInquiriesFilter}
                    onChange={(e) => setStatusInquiriesFilter(e.target.value)}
                    className="rounded border border-input p-1.5 text-xs bg-white"
                  >
                    <option value="All">All Inquiries</option>
                    <option value="New">New</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Mobile Inquiries Card View (Phone Friendly) */}
              <div className="space-y-3 md:hidden">
                {filteredBookings.length === 0 ? (
                  <div className="border border-[#c3c4c7] bg-white p-6 text-center text-xs text-slate-400">
                    No inquiries match the current search or filter.
                  </div>
                ) : (
                  filteredBookings.map((b) => (
                    <div
                      key={b.id}
                      className="border border-[#c3c4c7] bg-white p-4 rounded-sm shadow-xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold text-sm text-[#1d2327]">
                            {b.patientName}
                          </div>
                          <a
                            href={`tel:${b.phone}`}
                            className="text-xs text-[#2271b1] font-semibold"
                          >
                            {b.phone}
                          </a>
                        </div>
                        <select
                          value={b.status}
                          onChange={(e) =>
                            cms.updateBookingStatus(b.id, e.target.value as any)
                          }
                          className={`rounded border px-2 py-1 text-[11px] font-bold ${
                            b.status === "New"
                              ? "bg-amber-50 text-amber-800 border-amber-300"
                              : b.status === "Confirmed"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : b.status === "Completed"
                              ? "bg-blue-50 text-blue-800 border-blue-300"
                              : "bg-slate-100 text-slate-600 border-slate-300"
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div className="rounded bg-slate-50 p-2.5 text-xs space-y-1 border border-slate-100">
                        <div className="flex justify-between text-slate-700">
                          <span className="font-medium text-slate-500">Care:</span>
                          <span className="font-bold">{b.service}</span>
                        </div>
                        <div className="flex justify-between text-slate-700">
                          <span className="font-medium text-slate-500">Clinic:</span>
                          <span>{b.clinic}</span>
                        </div>
                        <div className="flex justify-between text-slate-700">
                          <span className="font-medium text-slate-500">Slot:</span>
                          <span>{b.preferredDate} ({b.preferredTimeSlot})</span>
                        </div>
                        {b.notes && (
                          <div className="pt-1 text-[11px] text-slate-600 italic">
                            Patient note: "{b.notes}"
                          </div>
                        )}
                        {b.doctorNotes && (
                          <div className="pt-1 text-[11px] font-semibold text-primary">
                            Dr note: {b.doctorNotes}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => openWhatsAppModal(b)}
                          className="flex items-center justify-center gap-1.5 rounded bg-[#25D366] py-2 text-xs font-bold text-white shadow-xs hover:bg-[#1ebe5d]"
                        >
                          <FaWhatsapp size={15} /> WhatsApp
                        </button>
                        <button
                          onClick={() => openEditBooking(b)}
                          className="flex items-center justify-center gap-1.5 rounded border border-slate-300 bg-white py-2 text-xs font-semibold text-[#2271b1] hover:bg-slate-50"
                        >
                          <FileEdit size={13} /> Edit
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                        <a
                          href={`tel:${b.phone}`}
                          className="inline-flex items-center gap-1 text-slate-700 hover:text-[#2271b1] font-medium"
                        >
                          <Phone size={12} /> Call Patient
                        </a>
                        <button
                          onClick={() => {
                            if (confirm(`Delete inquiry for ${b.patientName}?`)) {
                              cms.deleteBooking(b.id);
                              toast.success("Inquiry removed");
                            }
                          }}
                          className="text-rose-600 hover:underline flex items-center gap-1"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Desktop Inquiries Table */}
              <div className="hidden md:block border border-[#c3c4c7] bg-white shadow-xs overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#c3c4c7] bg-[#f6f7f7] text-[#50575e]">
                      <th className="py-2.5 px-4">Date</th>
                      <th className="py-2.5 px-4">Patient</th>
                      <th className="py-2.5 px-4">Phone</th>
                      <th className="py-2.5 px-4">Clinic & Type</th>
                      <th className="py-2.5 px-4">Requested Care</th>
                      <th className="py-2.5 px-4">Preferred Slot</th>
                      <th className="py-2.5 px-4">Status</th>
                      <th className="py-2.5 px-4 text-right">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-slate-400">
                          No inquiries match the current search or filter.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => {
                        return (
                          <tr key={b.id} className="border-b border-slate-100 hover:bg-slate-50/80">
                            <td className="py-3 px-4 text-[#646970] whitespace-nowrap">{b.createdAt}</td>
                            <td className="py-3 px-4 font-bold text-[#1d2327]">
                              <div>{b.patientName}</div>
                              {b.notes && (
                                <div className="text-[11px] font-normal text-slate-500 italic truncate max-w-xs">
                                  "{b.notes}"
                                </div>
                              )}
                              {b.doctorNotes && (
                                <div className="mt-0.5 inline-block rounded bg-primary/10 px-1.5 py-0.2 text-[10px] font-semibold text-primary">
                                  Dr: {b.doctorNotes}
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <a
                                href={`tel:${b.phone}`}
                                className="text-[#2271b1] hover:underline font-semibold"
                              >
                                {b.phone}
                              </a>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <div className="font-medium text-slate-800">{b.clinic}</div>
                              <span className="text-[10px] text-muted-foreground">
                                {b.appointmentType || "Clinic Visit"}
                              </span>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap font-medium text-slate-800">
                              {b.service}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              {b.preferredDate} <span className="text-slate-400">({b.preferredTimeSlot})</span>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <select
                                value={b.status}
                                onChange={(e) =>
                                  cms.updateBookingStatus(b.id, e.target.value as any)
                                }
                                className={`rounded border px-2 py-1 text-[11px] font-bold ${
                                  b.status === "New"
                                    ? "bg-amber-50 text-amber-800 border-amber-300"
                                    : b.status === "Confirmed"
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                    : b.status === "Completed"
                                    ? "bg-blue-50 text-blue-800 border-blue-300"
                                    : "bg-slate-100 text-slate-600 border-slate-300"
                                }`}
                              >
                                <option value="New">New</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                {/* WhatsApp Assistant Modal Trigger */}
                                <button
                                  onClick={() => openWhatsAppModal(b)}
                                  className="inline-flex items-center gap-1 rounded bg-[#25D366] px-2.5 py-1 text-[11px] font-bold text-white shadow-xs hover:bg-[#1ebe5d]"
                                  title="Send WhatsApp confirmation or reminder"
                                >
                                  <FaWhatsapp size={13} /> WhatsApp
                                </button>

                                {/* Edit Patient & Doctor Notes */}
                                <button
                                  onClick={() => openEditBooking(b)}
                                  className="inline-flex items-center gap-1 rounded border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold text-[#2271b1] hover:bg-slate-50"
                                  title="Edit appointment, fee, or clinical notes"
                                >
                                  <FileEdit size={12} /> Edit
                                </button>

                                {/* Call Button */}
                                <a
                                  href={`tel:${b.phone}`}
                                  className="inline-flex items-center rounded border border-slate-200 bg-white p-1 text-slate-700 hover:bg-slate-50"
                                  title="Call patient"
                                >
                                  <Phone size={13} />
                                </a>

                                {/* Delete */}
                                <button
                                  onClick={() => {
                                    if (confirm(`Delete inquiry for ${b.patientName}?`)) {
                                      cms.deleteBooking(b.id);
                                      toast.success("Inquiry removed");
                                    }
                                  }}
                                  className="text-slate-400 hover:text-red-500 p-1"
                                  title="Delete record"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 10: TOOLS, BACKUP & GIT EXPORT */}
          {activeTab === "export" && (
            <div className="space-y-6">
              <div className="border-b border-[#c3c4c7]/40 pb-4">
                <h1 className="text-2xl font-bold text-[#1d2327]">
                  CMS Tools, Backup & Git Export
                </h1>
                <p className="text-xs text-[#50575e]">
                  Export your edits to code for merging back into the repository, backup all CMS state as JSON, or restore from a previous backup.
                </p>
              </div>

              {/* Direct Live Sync Box */}
              <div className="rounded border-2 border-emerald-500/50 bg-emerald-50/40 p-5 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-sm text-emerald-950 flex items-center gap-2">
                      <Send size={16} className="text-emerald-600" />
                      <span>1-Click Publish to Live Website (Direct GitHub Sync)</span>
                    </div>
                    <p className="text-xs text-emerald-800 mt-1">
                      Directly commit all current edits (Clinics, Articles, SEO, Services) to your repository (<code className="font-mono font-bold">alisrdar/doc-folio</code>). Your live website updates immediately without needing to open VS Code or Git!
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => setLivePublishModalOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 shadow-sm"
                  >
                    <Send size={13} className="mr-1.5" /> Publish Live Now
                  </Button>
                </div>

                <div className="rounded bg-white p-3 border border-emerald-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-slate-600">
                    GitHub Connection:{" "}
                    {githubToken ? (
                      <strong className="text-emerald-700">Connected (Token Saved in Browser)</strong>
                    ) : (
                      <span className="text-amber-700 font-medium">Token not configured yet</span>
                    )}
                  </span>
                  <button
                    onClick={() => setLivePublishModalOpen(true)}
                    className="text-emerald-700 hover:underline font-bold text-xs self-start sm:self-auto"
                  >
                    {githubToken ? "Change Token" : "Connect GitHub Token"}
                  </button>
                </div>
              </div>

              {/* Code Export Box */}
              <div className="border border-[#c3c4c7] bg-white p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-[#1d2327] flex items-center gap-2">
                    <Code2 size={16} className="text-[#2271b1]" />
                    <span>Merge Back to Git Repository (portfolioData.ts snippet)</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() =>
                      copyToClipboard(cms.generateExportCode(), "TypeScript config")
                    }
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs"
                  >
                    <Copy size={13} className="mr-1.5" /> Copy Code
                  </Button>
                </div>
                <p className="text-xs text-[#50575e]">
                  This code corresponds directly to{" "}
                  <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">
                    src/data/portfolioData.ts
                  </code>
                  . Copy and paste it whenever you wish to commit CMS updates permanently to your git repository branch.
                </p>
                <div className="max-h-60 overflow-y-auto rounded bg-slate-900 p-3 font-mono text-[11px] text-slate-100">
                  <pre>{cms.generateExportCode()}</pre>
                </div>
              </div>

              {/* JSON Backup & Restore Box */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="border border-[#c3c4c7] bg-white p-5 shadow-xs space-y-3">
                  <div className="font-bold text-sm text-[#1d2327] flex items-center gap-2">
                    <Download size={16} className="text-[#2271b1]" />
                    <span>Download JSON Backup</span>
                  </div>
                  <p className="text-xs text-[#50575e]">
                    Save a full offline snapshot of all SEO tags, services, clinics, FAQs, and testimonials.
                  </p>
                  <Button
                    onClick={() => {
                      const blob = new Blob([cms.exportJSON()], {
                        type: "application/json",
                      });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `dr-farhan-cms-backup-${new Date().toISOString().split("T")[0]}.json`;
                      a.click();
                      toast.success("Backup downloaded!");
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs w-full"
                  >
                    <Download size={14} className="mr-1.5" /> Export JSON File
                  </Button>
                </div>

                <div className="border border-[#c3c4c7] bg-white p-5 shadow-xs space-y-3">
                  <div className="font-bold text-sm text-[#1d2327] flex items-center gap-2">
                    <Upload size={16} className="text-[#2271b1]" />
                    <span>Restore From JSON</span>
                  </div>
                  <p className="text-xs text-[#50575e]">
                    Upload a previously exported JSON backup to instantly restore content.
                  </p>
                  <input
                    type="file"
                    accept=".json"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const content = event.target?.result as string;
                        if (cms.importJSON(content)) {
                          toast.success("Backup restored successfully!");
                        } else {
                          toast.error("Invalid JSON backup file");
                        }
                      };
                      reader.readAsText(file);
                    }}
                    className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#2271b1] file:text-white hover:file:bg-[#135e96] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* 1. CLINIC MODAL */}
      <Dialog open={clinicModalOpen} onOpenChange={setClinicModalOpen}>
        <DialogContent className="max-w-md rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              {editingClinicId ? "Edit Clinic Details" : "Add New Clinic Location"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Configure clinic location, operational shift hours, and direction map link.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveClinic} className="mt-3 space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold">Clinic Name *</label>
              <Input
                required
                value={clinicForm.name}
                onChange={(e) => setClinicForm({ ...clinicForm, name: e.target.value })}
                placeholder="e.g. Ali Medical Center"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold">Address *</label>
              <Input
                required
                value={clinicForm.address}
                onChange={(e) => setClinicForm({ ...clinicForm, address: e.target.value })}
                placeholder="e.g. F-8 Markaz, Islamabad"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold">Hours Label</label>
                <Input
                  value={clinicForm.hours}
                  onChange={(e) => setClinicForm({ ...clinicForm, hours: e.target.value })}
                  placeholder="e.g. 9:00 AM – 2:00 PM"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold">Operating Days</label>
                <Input
                  value={clinicForm.days}
                  onChange={(e) => setClinicForm({ ...clinicForm, days: e.target.value })}
                  placeholder="e.g. Mon – Sat"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold">Open Hour (24h format)</label>
                <Input
                  type="number"
                  value={clinicForm.openHour}
                  onChange={(e) =>
                    setClinicForm({ ...clinicForm, openHour: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold">Close Hour (24h format)</label>
                <Input
                  type="number"
                  value={clinicForm.closeHour}
                  onChange={(e) =>
                    setClinicForm({ ...clinicForm, closeHour: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold">Direct Clinic Phone / Desk Ext (Optional)</label>
              <Input
                value={clinicForm.phone}
                onChange={(e) => setClinicForm({ ...clinicForm, phone: e.target.value })}
                placeholder="e.g. +92 51 8449900 or +92 300 XXXXXXX"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold">Google Maps URL</label>
              <Input
                value={clinicForm.mapsUrl}
                onChange={(e) => setClinicForm({ ...clinicForm, mapsUrl: e.target.value })}
                placeholder="https://maps.google.com/?q=..."
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setClinicModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-[#2271b1] text-white">
                Save Clinic
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* 2. QUALIFICATION MODAL */}
      <Dialog open={qualificationModalOpen} onOpenChange={setQualificationModalOpen}>
        <DialogContent className="max-w-md rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              {editingQualificationId ? "Edit Degree Qualification" : "Add New Academic Degree"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Degrees, fellowships, and clinical postgraduate diplomas.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveQualification} className="mt-3 space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold">Degree Title *</label>
              <Input
                required
                value={qualificationForm.title}
                onChange={(e) =>
                  setQualificationForm({ ...qualificationForm, title: e.target.value })
                }
                placeholder="e.g. Doctor of Physiotherapy (DPT)"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold">University / Institution *</label>
              <Input
                required
                value={qualificationForm.institution}
                onChange={(e) =>
                  setQualificationForm({ ...qualificationForm, institution: e.target.value })
                }
                placeholder="e.g. AUST, Abbottabad"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold">Graduation Year (Optional)</label>
              <Input
                value={qualificationForm.year}
                onChange={(e) =>
                  setQualificationForm({ ...qualificationForm, year: e.target.value })
                }
                placeholder="e.g. 2024 (Leave blank if not applicable)"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setQualificationModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-[#2271b1] text-white">
                Save Degree
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* 3. CERTIFICATION MODAL */}
      <Dialog open={certificationModalOpen} onOpenChange={setCertificationModalOpen}>
        <DialogContent className="max-w-md rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              {editingCertificationId ? "Edit Certification" : "Add Specialized Certification"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Clinical sport diplomas, kinesiology taping, strength & conditioning certifications.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveCertification} className="mt-3 space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold">Certification Title *</label>
              <Input
                required
                value={certificationForm.title}
                onChange={(e) =>
                  setCertificationForm({ ...certificationForm, title: e.target.value })
                }
                placeholder="e.g. Diploma in Football Medicine"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold">Issuing Authority / Council *</label>
              <Input
                required
                value={certificationForm.issuer}
                onChange={(e) =>
                  setCertificationForm({ ...certificationForm, issuer: e.target.value })
                }
                placeholder="e.g. FIFA, OMT"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCertificationModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-[#2271b1] text-white">
                Save Certification
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* 4. LICENSE MODAL */}
      <Dialog open={licenseModalOpen} onOpenChange={setLicenseModalOpen}>
        <DialogContent className="max-w-md rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              {editingLicenseId ? "Edit Medical License" : "Add International Medical License"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Official healthcare registration council credentials.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveLicense} className="mt-3 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold">License Code *</label>
                <Input
                  required
                  value={licenseForm.code}
                  onChange={(e) =>
                    setLicenseForm({ ...licenseForm, code: e.target.value })
                  }
                  placeholder="e.g. CORU"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Region / Country *</label>
                <Input
                  required
                  value={licenseForm.region}
                  onChange={(e) =>
                    setLicenseForm({ ...licenseForm, region: e.target.value })
                  }
                  placeholder="e.g. Ireland"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold">Full Council Name</label>
              <Input
                value={licenseForm.fullName}
                onChange={(e) =>
                  setLicenseForm({ ...licenseForm, fullName: e.target.value })
                }
                placeholder="e.g. Health & Social Care Professionals Council"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setLicenseModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-[#2271b1] text-white">
                Save License
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* 5. MANUAL BOOKING MODAL */}
      <Dialog open={manualBookingModalOpen} onOpenChange={setManualBookingModalOpen}>
        <DialogContent className="max-w-md rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Record Patient Appointment</DialogTitle>
            <DialogDescription className="text-xs">
              Record a phone or walk-in patient consultation in the clinic register.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveManualBooking} className="mt-3 space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold">Patient Name *</label>
              <Input
                required
                value={manualBookingForm.patientName}
                onChange={(e) =>
                  setManualBookingForm({ ...manualBookingForm, patientName: e.target.value })
                }
                placeholder="e.g. Tariq Mehmood"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold">Patient Phone *</label>
              <Input
                required
                value={manualBookingForm.phone}
                onChange={(e) =>
                  setManualBookingForm({ ...manualBookingForm, phone: e.target.value })
                }
                placeholder="+92 3XX XXXXXXX"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold">Clinic</label>
                <select
                  value={manualBookingForm.clinic}
                  onChange={(e) =>
                    setManualBookingForm({ ...manualBookingForm, clinic: e.target.value })
                  }
                  className="w-full rounded border border-input p-2 text-xs"
                >
                  {(data.clinics || []).map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Care / Specialty</label>
                <select
                  value={manualBookingForm.service}
                  onChange={(e) =>
                    setManualBookingForm({ ...manualBookingForm, service: e.target.value })
                  }
                  className="w-full rounded border border-input p-2 text-xs"
                >
                  {(data.services || []).map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold">Appointment Date</label>
                <Input
                  type="date"
                  value={manualBookingForm.preferredDate}
                  onChange={(e) =>
                    setManualBookingForm({ ...manualBookingForm, preferredDate: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Time Window</label>
                <Input
                  value={manualBookingForm.preferredTimeSlot}
                  onChange={(e) =>
                    setManualBookingForm({
                      ...manualBookingForm,
                      preferredTimeSlot: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold">Condition / Doctor Notes</label>
              <Textarea
                rows={2}
                value={manualBookingForm.notes}
                onChange={(e) =>
                  setManualBookingForm({ ...manualBookingForm, notes: e.target.value })
                }
                placeholder="Initial diagnosis or patient symptoms..."
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setManualBookingModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-[#2271b1] text-white">
                Record Patient
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* SERVICE MODAL */}
      <Dialog open={serviceModalOpen} onOpenChange={setServiceModalOpen}>
        <DialogContent className="max-w-md rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              {editingServiceId ? "Edit Specialty Service" : "Add New Specialty Service"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Configure treatment title, category filter, and clinical description.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveService} className="mt-3 space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold">Service Title *</label>
              <Input
                required
                value={serviceForm.title}
                onChange={(e) =>
                  setServiceForm({ ...serviceForm, title: e.target.value })
                }
                placeholder="e.g. Dry Needling & Trigger Point Therapy"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold">Category</label>
                <select
                  value={serviceForm.category}
                  onChange={(e) =>
                    setServiceForm({
                      ...serviceForm,
                      category: e.target.value as any,
                    })
                  }
                  className="w-full rounded border border-input p-2 text-xs"
                >
                  <option value="Spine & Pain">Spine & Pain</option>
                  <option value="Sports Rehab">Sports Rehab</option>
                  <option value="Neuro & Geriatric">Neuro & Geriatric</option>
                  <option value="Post-Surgery">Post-Surgery</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Icon</label>
                <select
                  value={serviceForm.icon}
                  onChange={(e) =>
                    setServiceForm({
                      ...serviceForm,
                      icon: e.target.value as any,
                    })
                  }
                  className="w-full rounded border border-input p-2 text-xs"
                >
                  {availableIcons.map((ic) => (
                    <option key={ic} value={ic}>
                      {ic}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold">Description</label>
              <Textarea
                rows={3}
                value={serviceForm.description}
                onChange={(e) =>
                  setServiceForm({ ...serviceForm, description: e.target.value })
                }
                placeholder="Brief explanation of the treatment benefits..."
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setServiceModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-[#2271b1] text-white">
                Save Service
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* FAQ MODAL */}
      <Dialog open={faqModalOpen} onOpenChange={setFaqModalOpen}>
        <DialogContent className="max-w-md rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              {editingFaqId ? "Edit FAQ" : "Add Patient FAQ"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Answer common patient questions regarding treatments, visits, and recovery.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveFaq} className="mt-3 space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold">Category</label>
              <Input
                value={faqForm.category}
                onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                placeholder="e.g. Appointments, Recovery, Preparation"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold">Question *</label>
              <Input
                required
                value={faqForm.question}
                onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                placeholder="e.g. Do I need an MRI before my first visit?"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold">Detailed Answer *</label>
              <Textarea
                rows={4}
                required
                value={faqForm.answer}
                onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                placeholder="Clear, evidence-based guidance for the patient..."
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setFaqModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-[#2271b1] text-white">
                Save FAQ
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* TESTIMONIAL MODAL */}
      <Dialog open={testimonialModalOpen} onOpenChange={setTestimonialModalOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              {editingTestimonialId ? "Edit Patient Review" : "Add Patient Review"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Add positive patient feedback to build social proof.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveTestimonial} className="mt-3 space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold">Patient Name *</label>
              <Input
                required
                value={testimonialForm.name}
                onChange={(e) =>
                  setTestimonialForm({ ...testimonialForm, name: e.target.value })
                }
                placeholder="e.g. Bilal Aslam"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold">Rating (1-5)</label>
                <select
                  value={testimonialForm.rating}
                  onChange={(e) =>
                    setTestimonialForm({
                      ...testimonialForm,
                      rating: parseInt(e.target.value) || 5,
                    })
                  }
                  className="w-full rounded border border-input p-2 text-xs"
                >
                  <option value={5}>5 Stars (★★★★★)</option>
                  <option value={4}>4 Stars (★★★★)</option>
                  <option value={3}>3 Stars (★★★)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Review Label</label>
                <Input
                  value={testimonialForm.reviewCount}
                  onChange={(e) =>
                    setTestimonialForm({
                      ...testimonialForm,
                      reviewCount: e.target.value,
                    })
                  }
                  placeholder="e.g. Google Verified · 12 reviews"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold">Testimonial Quote *</label>
              <Textarea
                rows={3}
                required
                value={testimonialForm.quote}
                onChange={(e) =>
                  setTestimonialForm({ ...testimonialForm, quote: e.target.value })
                }
                placeholder="Patient's experience, diagnosis, and recovery results..."
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setTestimonialModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-[#2271b1] text-white">
                {editingTestimonialId ? "Save Review" : "Add Review"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* PRACTICE STAT / IMPACT METRIC MODAL */}
      <Dialog open={statModalOpen} onOpenChange={setStatModalOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              {editingStatId ? "Edit Practice Metric" : "Add Practice Metric"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Highlight key accomplishments (e.g. 10+ Years, 1,500+ Patients, 3 Licenses).
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveStat} className="mt-3 space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold">Metric Value *</label>
              <Input
                required
                value={statForm.value}
                onChange={(e) => setStatForm({ ...statForm, value: e.target.value })}
                placeholder="e.g. 10+, 1,500+, 3, 99%"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold">Label / Title *</label>
              <Input
                required
                value={statForm.label}
                onChange={(e) => setStatForm({ ...statForm, label: e.target.value })}
                placeholder="e.g. Years Clinical Experience, Patients Treated"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold">Subtitle / Description</label>
              <Input
                value={statForm.description}
                onChange={(e) => setStatForm({ ...statForm, description: e.target.value })}
                placeholder="e.g. In hospital & outpatient rehabilitation"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setStatModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-[#2271b1] text-white">
                {editingStatId ? "Save Metric" : "Add Metric"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* EDIT PATIENT INQUIRY & DOCTOR NOTES MODAL */}
      <Dialog open={bookingEditModalOpen} onOpenChange={setBookingEditModalOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <FileEdit className="text-[#2271b1]" size={18} />
              Edit Patient Appointment Details
            </DialogTitle>
            <DialogDescription className="text-xs">
              Update booking schedule, appointment status, consultation type, and doctor notes.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveBookingEdit} className="mt-3 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold">Patient Name *</label>
                <Input
                  required
                  value={bookingEditForm.patientName}
                  onChange={(e) =>
                    setBookingEditForm({ ...bookingEditForm, patientName: e.target.value })
                  }
                  placeholder="Patient Name"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Patient Phone *</label>
                <Input
                  required
                  value={bookingEditForm.phone}
                  onChange={(e) =>
                    setBookingEditForm({ ...bookingEditForm, phone: e.target.value })
                  }
                  placeholder="+92 3XX XXXXXXX"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold">Clinic</label>
                <select
                  value={bookingEditForm.clinic}
                  onChange={(e) =>
                    setBookingEditForm({ ...bookingEditForm, clinic: e.target.value })
                  }
                  className="w-full rounded border border-input p-2 text-xs bg-white"
                >
                  {(data.clinics || []).map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Service / Treatment</label>
                <select
                  value={bookingEditForm.service}
                  onChange={(e) =>
                    setBookingEditForm({ ...bookingEditForm, service: e.target.value })
                  }
                  className="w-full rounded border border-input p-2 text-xs bg-white"
                >
                  {(data.services || []).map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold">Appointment Date</label>
                <Input
                  type="date"
                  value={bookingEditForm.preferredDate}
                  onChange={(e) =>
                    setBookingEditForm({ ...bookingEditForm, preferredDate: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Preferred Time Window</label>
                <Input
                  value={bookingEditForm.preferredTimeSlot}
                  onChange={(e) =>
                    setBookingEditForm({
                      ...bookingEditForm,
                      preferredTimeSlot: e.target.value,
                    })
                  }
                  placeholder="e.g. Morning (10:00 AM – 01:00 PM)"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold">Status</label>
                <select
                  value={bookingEditForm.status}
                  onChange={(e) =>
                    setBookingEditForm({
                      ...bookingEditForm,
                      status: e.target.value as any,
                    })
                  }
                  className="w-full rounded border border-input p-2 text-xs bg-white font-semibold"
                >
                  <option value="New">New</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Care Type</label>
                <select
                  value={bookingEditForm.appointmentType}
                  onChange={(e) =>
                    setBookingEditForm({
                      ...bookingEditForm,
                      appointmentType: e.target.value as any,
                    })
                  }
                  className="w-full rounded border border-input p-2 text-xs bg-white"
                >
                  <option value="Clinic Visit">Clinic Visit</option>
                  <option value="Home Rehab">Home Rehab</option>
                  <option value="Online Consultation">Online Consultation</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Fee Status</label>
                <select
                  value={bookingEditForm.feeStatus}
                  onChange={(e) =>
                    setBookingEditForm({
                      ...bookingEditForm,
                      feeStatus: e.target.value as any,
                    })
                  }
                  className="w-full rounded border border-input p-2 text-xs bg-white"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Waived">Waived</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold">Patient's Stated Issue</label>
              <Textarea
                rows={2}
                value={bookingEditForm.notes}
                onChange={(e) =>
                  setBookingEditForm({ ...bookingEditForm, notes: e.target.value })
                }
                placeholder="Patient's reported complaint or inquiry..."
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-primary">Doctor Clinical Notes / Diagnosis</label>
              <Textarea
                rows={2}
                value={bookingEditForm.doctorNotes}
                onChange={(e) =>
                  setBookingEditForm({ ...bookingEditForm, doctorNotes: e.target.value })
                }
                placeholder="Doctor's notes, recommended sessions, diagnosis, follow-up..."
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setBookingEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-[#2271b1] text-white">
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* WHATSAPP TEMPLATE ASSISTANT MODAL */}
      <Dialog open={waModalOpen} onOpenChange={setWaModalOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <FaWhatsapp className="text-[#25D366]" size={20} />
              WhatsApp Message Assistant
            </DialogTitle>
            <DialogDescription className="text-xs">
              Quick 1-tap WhatsApp message templates for {selectedWaBooking?.patientName || "Patient"}.
            </DialogDescription>
          </DialogHeader>

          {selectedWaBooking && (
            <div className="mt-3 space-y-4">
              <div className="rounded bg-slate-50 p-3 text-xs border border-slate-200">
                <div className="font-semibold text-slate-800">
                  Patient: <span className="font-bold">{selectedWaBooking.patientName}</span> ({selectedWaBooking.phone})
                </div>
                <div className="text-slate-600 mt-0.5">
                  Clinic: {selectedWaBooking.clinic} | Slot: {selectedWaBooking.preferredDate} ({selectedWaBooking.preferredTimeSlot})
                </div>
              </div>

              {/* Template Buttons */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-700">Choose Message Template:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const msg = `Hello ${selectedWaBooking.patientName}, this is Dr. Farhan Badshah's physiotherapy clinic. We have confirmed your appointment for *${selectedWaBooking.service}* at *${selectedWaBooking.clinic}* on *${selectedWaBooking.preferredDate}* (${selectedWaBooking.preferredTimeSlot}). Please arrive 5 minutes early.`;
                      setCustomWaMessage(msg);
                    }}
                    className="p-2.5 rounded border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 text-left text-xs font-medium text-emerald-900 transition-colors"
                  >
                    🟢 Appointment Confirmed
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const msg = `Friendly reminder from Dr. Farhan Badshah's physiotherapy clinic: Your appointment for *${selectedWaBooking.service}* is scheduled for tomorrow at *${selectedWaBooking.clinic}* (${selectedWaBooking.preferredTimeSlot}). Please confirm your attendance.`;
                      setCustomWaMessage(msg);
                    }}
                    className="p-2.5 rounded border border-amber-200 bg-amber-50/70 hover:bg-amber-100 text-left text-xs font-medium text-amber-900 transition-colors"
                  >
                    ⏰ Tomorrow's Reminder
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const clinic = (data.clinics || []).find((c) => c.name === selectedWaBooking.clinic);
                      const mapLink = clinic?.mapsUrl || "https://maps.google.com/?q=Islamabad";
                      const msg = `Location directions for Dr. Farhan Badshah's clinic at *${selectedWaBooking.clinic}*:\nAddress: ${clinic?.address || selectedWaBooking.clinic}\nGoogle Maps: ${mapLink}`;
                      setCustomWaMessage(msg);
                    }}
                    className="p-2.5 rounded border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-left text-xs font-medium text-blue-900 transition-colors"
                  >
                    📍 Clinic Directions & Map
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const msg = `Hello ${selectedWaBooking.patientName}, Dr. Farhan Badshah checking in after your therapy session today. How are your symptoms feeling? Please remember to follow your home exercise guidelines.`;
                      setCustomWaMessage(msg);
                    }}
                    className="p-2.5 rounded border border-purple-200 bg-purple-50/70 hover:bg-purple-100 text-left text-xs font-medium text-purple-900 transition-colors"
                  >
                    🩹 Post-Session Recovery Check
                  </button>
                </div>
              </div>

              {/* Editable Message Box */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Message Preview (Editable):</label>
                <Textarea
                  rows={4}
                  value={customWaMessage}
                  onChange={(e) => setCustomWaMessage(e.target.value)}
                  className="text-xs leading-relaxed"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(customWaMessage, "WhatsApp message")}
                  className="text-xs"
                >
                  <Copy size={13} className="mr-1" /> Copy Text
                </Button>

                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    const cleanPhone = selectedWaBooking.phone.replace(/[^0-9]/g, "");
                    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customWaMessage)}`;
                    window.open(url, "_blank");
                    cms.updateBookingStatus(selectedWaBooking.id, "Confirmed");
                    toast.success("Opening WhatsApp & marked as Confirmed!");
                    setWaModalOpen(false);
                  }}
                  className="bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-bold"
                >
                  <FaWhatsapp size={15} className="mr-1.5" /> Send via WhatsApp
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* SECURITY / PASSWORD SETTINGS MODAL */}
      <Dialog open={securityModalOpen} onOpenChange={setSecurityModalOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <KeyRound className="text-[#2271b1]" size={18} />
              Admin Credentials & Security
            </DialogTitle>
            <DialogDescription className="text-xs">
              Change your username and login password. Saved securely in your browser's private store.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveSecuritySettings} className="mt-3 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Admin Username *</label>
              <Input
                required
                value={newAdminUser}
                onChange={(e) => setNewAdminUser(e.target.value)}
                placeholder="admin"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">New Password *</label>
              <Input
                type="password"
                required
                value={newAdminPass}
                onChange={(e) => setNewAdminPass(e.target.value)}
                placeholder="Choose a strong password"
              />
            </div>

            <div className="rounded bg-amber-50 border border-amber-200 p-2.5 text-[11px] text-amber-900 leading-snug">
              Tip: Remember your new credentials. You can also reset back to default (<code className="font-bold">admin / drfarhan2026</code>) at any time.
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-between gap-2">
              <button
                type="button"
                onClick={handleResetSecuritySettings}
                className="text-xs text-rose-600 hover:underline"
              >
                Reset to Default
              </button>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSecurityModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#2271b1] text-white">
                  Save Credentials
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ARTICLE EDIT / CREATE MODAL */}
      <Dialog open={articleModalOpen} onOpenChange={setArticleModalOpen}>
        <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <BookOpen className="text-[#2271b1]" size={20} />
              {editingArticleId ? "Edit Clinical Article" : "Write & Publish New Article"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Publish patient guides, evidence-based pain management tips, and exercise protocols. These articles are automatically integrated with Google and AI search engines via Schema.org.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveArticle} className="mt-3 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Article Title *</label>
              <Input
                required
                value={articleForm.title}
                onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                placeholder="e.g. 5 Sciatica Relief Exercises You Can Safely Do at Home"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Category *</label>
                <select
                  value={articleForm.category}
                  onChange={(e) =>
                    setArticleForm({
                      ...articleForm,
                      category: e.target.value as ArticleItem["category"],
                    })
                  }
                  className="w-full rounded border border-input p-2 text-xs bg-white"
                >
                  <option value="Spine Care">Spine Care</option>
                  <option value="Sports Medicine">Sports Medicine</option>
                  <option value="Posture & Ergonomics">Posture & Ergonomics</option>
                  <option value="Joint Health">Joint Health</option>
                  <option value="Rehabilitation">Rehabilitation</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Reading Time</label>
                <Input
                  value={articleForm.readTime}
                  onChange={(e) => setArticleForm({ ...articleForm, readTime: e.target.value })}
                  placeholder="e.g. 5 min read"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Publish Date</label>
                <Input
                  value={articleForm.date}
                  onChange={(e) => setArticleForm({ ...articleForm, date: e.target.value })}
                  placeholder="e.g. Oct 14, 2026"
                />
              </div>
            </div>

            {/* Featured toggle & URL slug */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center bg-slate-50 p-3 rounded border border-slate-200">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">URL Slug (SEO Permalink)</label>
                <Input
                  value={articleForm.slug}
                  onChange={(e) => setArticleForm({ ...articleForm, slug: e.target.value })}
                  placeholder="sciatica-relief-exercises (optional)"
                  className="text-xs"
                />
                <span className="text-[10px] text-muted-foreground">Auto-generated from title if blank.</span>
              </div>

              <div className="flex items-center gap-2 pt-2 sm:pt-4">
                <input
                  type="checkbox"
                  id="featuredArticleCheck"
                  checked={articleForm.featured}
                  onChange={(e) => setArticleForm({ ...articleForm, featured: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-[#2271b1] focus:ring-[#2271b1]"
                />
                <label htmlFor="featuredArticleCheck" className="text-xs font-semibold text-slate-800 cursor-pointer">
                  Featured Article (Highlight on top of Blog)
                </label>
              </div>
            </div>

            {/* Image URL & Preset Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Cover Image URL</label>
              <Input
                value={articleForm.imageUrl}
                onChange={(e) => setArticleForm({ ...articleForm, imageUrl: e.target.value })}
                placeholder="https://images.unsplash.com/photo-..."
                className="text-xs font-mono"
              />

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-500 mr-1">One-Click Presets:</span>
                {[
                  {
                    name: "Spine & Pain",
                    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
                  },
                  {
                    name: "Sports Rehab",
                    url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
                  },
                  {
                    name: "Desk & Posture",
                    url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80",
                  },
                  {
                    name: "Joint & Knee",
                    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80",
                  },
                  {
                    name: "Clinic Care",
                    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
                  },
                ].map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setArticleForm({ ...articleForm, imageUrl: preset.url })}
                    className={`rounded border px-2 py-0.5 text-[11px] font-medium transition ${
                      articleForm.imageUrl === preset.url
                        ? "border-[#2271b1] bg-blue-50 text-[#2271b1] font-bold"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    + {preset.name}
                  </button>
                ))}
              </div>

              {/* Live Image Preview */}
              {articleForm.imageUrl && (
                <div className="relative mt-2 h-28 w-full max-w-sm rounded border border-slate-200 overflow-hidden bg-slate-100">
                  <img
                    src={articleForm.imageUrl}
                    alt="Cover preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80";
                    }}
                  />
                  <span className="absolute bottom-1 left-1 rounded bg-black/70 px-1.5 py-0.5 text-[9px] text-white">
                    Preview
                  </span>
                </div>
              )}
            </div>

            {/* Excerpt / Summary */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Short Summary / SEO Excerpt *
              </label>
              <Textarea
                required
                rows={2}
                value={articleForm.description}
                onChange={(e) => setArticleForm({ ...articleForm, description: e.target.value })}
                placeholder="A compelling 2-3 sentence overview that appears on article preview cards and Google search snippets..."
                className="text-xs leading-relaxed"
              />
            </div>

            {/* Full Article Content */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Full Article Content * (Clinical Guides, Exercises, Advice)
              </label>
              <Textarea
                required
                rows={8}
                value={articleForm.content}
                onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                placeholder="Write full article paragraphs here. Include symptoms, anatomy, step-by-step home exercises, posture corrections, red flag warnings, and advice for scheduling a clinical consultation."
                className="text-xs leading-relaxed font-sans"
              />
              <span className="text-[10px] text-muted-foreground">
                Tip: Break sections into clear paragraphs. They will render beautifully in the patient reading modal.
              </span>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setArticleModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-[#2271b1] hover:bg-[#135e96] text-white">
                <Save size={13} className="mr-1.5" />
                {editingArticleId ? "Update Article" : "Publish Article"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* GIT EXPORT MODAL */}
      <Dialog open={exportModalOpen} onOpenChange={setExportModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <Code2 className="text-[#2271b1]" />
              Merge Back into Git Repository
            </DialogTitle>
            <DialogDescription className="text-xs">
              Here is your generated code for{" "}
              <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">
                src/data/portfolioData.ts
              </code>
              . You can copy this snippet directly into your codebase before committing or creating a pull request to{" "}
              <code className="font-mono text-primary font-bold">alisrdar/doc-folio</code>.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-3">
            <div className="max-h-80 overflow-y-auto rounded bg-slate-900 p-4 font-mono text-xs text-slate-100">
              <pre>{cms.generateExportCode()}</pre>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              Ready to merge back to git
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setExportModalOpen(false)}
              >
                Close
              </Button>
              <Button
                size="sm"
                onClick={() =>
                  copyToClipboard(cms.generateExportCode(), "TypeScript config")
                }
                className="bg-[#2271b1] text-white"
              >
                <Copy size={13} className="mr-1.5" /> Copy Code
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* DIRECT GITHUB LIVE PUBLISH MODAL */}
      <Dialog open={livePublishModalOpen} onOpenChange={setLivePublishModalOpen}>
        <DialogContent className="max-w-lg rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2 text-emerald-800">
              <Send className="text-emerald-600" size={18} />
              Publish Directly to Live Website
            </DialogTitle>
            <DialogDescription className="text-xs">
              This commits your changes directly to the GitHub repository (<code className="font-mono font-bold text-slate-800">alisrdar/doc-folio</code>) on branches <code className="font-mono font-semibold">master</code> and <code className="font-mono font-semibold">main</code>. Your live website will automatically update for all visitors!
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePublishLive} className="mt-3 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                GitHub Personal Access Token (PAT) *
              </label>
              <Input
                type="password"
                required
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx or github_pat_..."
                className="font-mono text-xs"
              />
              <p className="text-[11px] text-muted-foreground leading-normal">
                Saved securely only in your browser. Needs <code className="font-mono bg-slate-100 px-1 py-0.5 rounded font-bold">repo</code> permission.{" "}
                <a
                  href="https://github.com/settings/tokens/new?scopes=repo&description=DocFolio+Live+CMS+Publishing"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline font-bold inline-flex items-center gap-0.5"
                >
                  Generate Token on GitHub <ExternalLink size={10} />
                </a>
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Commit Message (Optional)</label>
              <Input
                value={liveCommitMsg}
                onChange={(e) => setLiveCommitMsg(e.target.value)}
                placeholder="e.g. Update clinic hours & add new article"
                className="text-xs"
              />
            </div>

            <div className="rounded bg-emerald-50 border border-emerald-200 p-3 text-[11px] text-emerald-950 leading-relaxed">
              <strong>✨ Instant Worldwide Sync:</strong> Once published, changes are pushed directly to your repository. All website visitors and search engines will immediately see the latest updates.
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setLivePublishModalOpen(false)}
                disabled={isPublishingLive}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isPublishingLive}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              >
                {isPublishingLive ? (
                  <>
                    <RefreshCw size={13} className="mr-1.5 animate-spin" />
                    Committing to GitHub...
                  </>
                ) : (
                  <>
                    <Send size={13} className="mr-1.5" />
                    Publish Live Now
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Mobile Bottom Navigation Bar (Thumb Friendly on Phones) */}
      <nav className="fixed bottom-0 inset-x-0 z-30 flex h-14 items-center justify-around border-t border-[#c3c4c7]/50 bg-[#1d2327] px-2 text-white md:hidden shadow-lg">
        {[
          { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
          {
            id: "bookings",
            label: "Inquiries",
            icon: Calendar,
            count: (data.bookings || []).filter((b) => b.status === "New").length,
          },
          { id: "clinics", label: "Clinics", icon: MapPin },
          { id: "credentials", label: "Degrees", icon: GraduationCap },
          { id: "menu", label: "Menu", icon: Menu, isMenuTrigger: true },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.isMenuTrigger) {
                  setMobileMenuOpen(!mobileMenuOpen);
                } else {
                  setActiveTab(item.id as AdminTab);
                  setMobileMenuOpen(false);
                }
              }}
              className={`relative flex flex-col items-center justify-center gap-0.5 py-1 px-2.5 text-[10px] transition-colors ${
                isActive && !item.isMenuTrigger
                  ? "text-[#72aee6] font-bold"
                  : "text-[#c3c4c7] hover:text-white"
              }`}
            >
              <div className="relative">
                <Icon size={18} />
                {item.count !== undefined && item.count > 0 && (
                  <span className="absolute -top-1.5 -right-2 grid h-4 w-4 place-items-center rounded-full bg-[#d63638] text-[9px] font-black text-white">
                    {item.count}
                  </span>
                )}
              </div>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
