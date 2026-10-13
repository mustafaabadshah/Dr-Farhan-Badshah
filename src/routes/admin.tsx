import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  Award,
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
  MapPin,
  Menu,
  MessageSquare,
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
} from "lucide-react";
import { useCMS, type ServiceItem, type ClinicItem, type FAQItem, type TestimonialItem } from "@/lib/cms-store";
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
  | "credentials"
  | "testimonials"
  | "faqs"
  | "bookings"
  | "export";

function AdminDashboard() {
  const cms = useCMS();
  const { data } = cms;

  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form states for adding items
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

  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
    category: "Appointments",
  });

  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    quote: "",
    rating: 5,
    date: "Recent",
    reviewCount: "Google Review",
    initial: "P",
  });

  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Service modal helpers
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
      title: srv.title,
      description: srv.description,
      category: srv.category,
      icon: srv.icon,
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

  // FAQ modal helpers
  const openNewFaq = () => {
    setEditingFaqId(null);
    setFaqForm({ question: "", answer: "", category: "Appointments" });
    setFaqModalOpen(true);
  };

  const openEditFaq = (f: FAQItem) => {
    setEditingFaqId(f.id);
    setFaqForm({ question: f.question, answer: f.answer, category: f.category });
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

  // Testimonial modal helpers
  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialForm.name.trim() || !testimonialForm.quote.trim()) {
      toast.error("Name and review quote are required");
      return;
    }
    cms.addTestimonial({
      ...testimonialForm,
      initial: testimonialForm.name.trim()[0].toUpperCase(),
    });
    toast.success("Patient testimonial added");
    setTestimonialModalOpen(false);
    setTestimonialForm({
      name: "",
      quote: "",
      rating: 5,
      date: "Recent",
      reviewCount: "Google Review",
      initial: "P",
    });
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

  return (
    <div className="min-h-screen bg-[#f0f0f1] text-[#2c3338] font-sans antialiased">
      {/* 1. WordPress Admin Top Bar */}
      <header className="sticky top-0 z-50 flex h-10 w-full items-center justify-between bg-[#1d2327] px-3 text-white text-xs shadow-sm">
        <div className="flex items-center gap-3">
          {/* WordPress / Custom CMS Logo */}
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
            <span className="hidden md:inline">{data.hero.name}</span>
            <span className="text-[11px] text-white/60">↗ Visit Site</span>
          </Link>

          {/* New Bookings notification badge */}
          {data.bookings.filter((b) => b.status === "New").length > 0 && (
            <button
              onClick={() => setActiveTab("bookings")}
              className="flex items-center gap-1 rounded bg-[#d63638] px-2 py-0.5 text-[11px] font-bold text-white hover:bg-[#b32d2e]"
            >
              <Calendar size={11} />
              <span>{data.bookings.filter((b) => b.status === "New").length} New Inquiries</span>
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-2.5rem)]">
        {/* 2. WordPress Left Navigation Sidebar */}
        <aside
          className={`fixed inset-y-10 left-0 z-40 w-52 bg-[#1d2327] text-white md:static md:block ${
            mobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <nav className="flex flex-col py-2 text-[13px] font-normal">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "seo", label: "SEO & Meta Tags", icon: Search, badge: "Yoast" },
              { id: "hero", label: "Doctor & Hero", icon: User },
              { id: "services", label: "Specialties / Services", icon: Stethoscope },
              { id: "clinics", label: "Clinics & Schedule", icon: MapPin },
              { id: "credentials", label: "Degrees & Licenses", icon: GraduationCap },
              { id: "testimonials", label: "Patient Reviews", icon: Star },
              { id: "faqs", label: "FAQs Manager", icon: HelpCircle },
              {
                id: "bookings",
                label: "Patient Inquiries",
                icon: Calendar,
                count: data.bookings.filter((b) => b.status === "New").length,
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

        {/* 3. WordPress Main Content Area */}
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
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
                    {data.services.length}
                  </div>
                  <div className="mt-1 text-[11px] text-[#646970]">Across 5 categories</div>
                </div>

                <div className="rounded-sm border border-[#c3c4c7] bg-white p-4 shadow-xs">
                  <div className="text-xs font-semibold text-[#646970]">Islamabad Clinics</div>
                  <div className="mt-2 text-2xl font-bold text-[#1d2327]">
                    {data.clinics.length}
                  </div>
                  <div className="mt-1 text-[11px] text-[#646970]">Live schedule active</div>
                </div>

                <div className="rounded-sm border border-[#c3c4c7] bg-white p-4 shadow-xs">
                  <div className="text-xs font-semibold text-[#646970]">Total Inquiries</div>
                  <div className="mt-2 text-2xl font-bold text-[#2271b1]">
                    {data.bookings.length}
                  </div>
                  <div className="mt-1 text-[11px] text-[#646970]">
                    {data.bookings.filter((b) => b.status === "New").length} new pending
                  </div>
                </div>
              </div>

              {/* Postbox: Quick Content Actions */}
              <div className="border border-[#c3c4c7] bg-white shadow-xs">
                <div className="border-b border-[#c3c4c7] bg-[#f6f7f7] px-4 py-2.5 font-bold text-sm text-[#1d2327]">
                  Quick Actions & Shortcuts
                </div>
                <div className="p-4 grid gap-3 sm:grid-cols-3">
                  <button
                    onClick={() => setActiveTab("seo")}
                    className="flex flex-col items-start rounded border border-[#dcdcde] p-3 text-left hover:border-[#2271b1] hover:bg-[#f6f7f7] transition"
                  >
                    <div className="font-bold text-xs text-[#2271b1] flex items-center gap-1.5">
                      <Search size={14} /> Edit Google SEO Snippet
                    </div>
                    <div className="mt-1 text-[11px] text-[#646970]">
                      Optimize meta tags, titles & OpenGraph social cards
                    </div>
                  </button>

                  <button
                    onClick={openNewService}
                    className="flex flex-col items-start rounded border border-[#dcdcde] p-3 text-left hover:border-[#2271b1] hover:bg-[#f6f7f7] transition"
                  >
                    <div className="font-bold text-xs text-[#2271b1] flex items-center gap-1.5">
                      <Plus size={14} /> Add New Medical Treatment
                    </div>
                    <div className="mt-1 text-[11px] text-[#646970]">
                      Add new physiotherapy service or condition program
                    </div>
                  </button>

                  <button
                    onClick={openNewFaq}
                    className="flex flex-col items-start rounded border border-[#dcdcde] p-3 text-left hover:border-[#2271b1] hover:bg-[#f6f7f7] transition"
                  >
                    <div className="font-bold text-xs text-[#2271b1] flex items-center gap-1.5">
                      <HelpCircle size={14} /> Add Patient FAQ
                    </div>
                    <div className="mt-1 text-[11px] text-[#646970]">
                      Answer common questions about rehab & visits
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
                    View All ({data.bookings.length})
                  </button>
                </div>
                <div className="p-4">
                  {data.bookings.length === 0 ? (
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
                          {data.bookings.slice(0, 5).map((b) => (
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

          {/* TAB 2: SEO & METADATA MANAGER (YOAST STYLE) */}
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
                    {data.seo.pageTitle}
                  </div>
                  <div className="mt-1 text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                    {data.seo.metaDescription}
                  </div>
                </div>
              </div>

              {/* SEO Edit Form */}
              <div className="border border-[#c3c4c7] bg-white p-5 shadow-xs space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-[#1d2327]">
                    <label>SEO Page Title Tag *</label>
                    <span className="text-[11px] text-muted-foreground">
                      {data.seo.pageTitle.length} / 65 characters
                    </span>
                  </div>
                  <Input
                    value={data.seo.pageTitle}
                    onChange={(e) => cms.updateSEO({ pageTitle: e.target.value })}
                    className="rounded"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-[#1d2327]">
                    <label>Meta Description *</label>
                    <span className="text-[11px] text-muted-foreground">
                      {data.seo.metaDescription.length} / 160 characters
                    </span>
                  </div>
                  <Textarea
                    rows={3}
                    value={data.seo.metaDescription}
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
                      value={data.seo.keywords}
                      onChange={(e) => cms.updateSEO({ keywords: e.target.value })}
                      className="rounded"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d2327]">Canonical URL</label>
                    <Input
                      value={data.seo.canonicalUrl}
                      onChange={(e) => cms.updateSEO({ canonicalUrl: e.target.value })}
                      className="rounded"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d2327]">OpenGraph Social Title</label>
                    <Input
                      value={data.seo.ogTitle}
                      onChange={(e) => cms.updateSEO({ ogTitle: e.target.value })}
                      className="rounded"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d2327]">Social Image URL</label>
                    <Input
                      value={data.seo.ogImage}
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
                    <label className="text-xs font-bold text-[#1d2327]">Full Name</label>
                    <Input
                      value={data.hero.name}
                      onChange={(e) => cms.updateHero({ name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d2327]">Professional Title</label>
                    <Input
                      value={data.hero.title}
                      onChange={(e) => cms.updateHero({ title: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1d2327]">Hero Subtitle / Mission</label>
                  <Textarea
                    rows={2}
                    value={data.hero.subtitle}
                    onChange={(e) => cms.updateHero({ subtitle: e.target.value })}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d2327]">WhatsApp Phone (Digits)</label>
                    <Input
                      value={data.contact.whatsappNumber}
                      onChange={(e) => cms.updateContact({ whatsappNumber: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d2327]">Direct Phone</label>
                    <Input
                      value={data.contact.phone}
                      onChange={(e) => cms.updateContact({ phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d2327]">Email Address</label>
                    <Input
                      value={data.contact.email}
                      onChange={(e) => cms.updateContact({ email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d2327]">Oladoc Profile URL</label>
                    <Input
                      value={data.hero.oladocUrl}
                      onChange={(e) => cms.updateHero({ oladocUrl: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d2327]">Marham Profile URL</label>
                    <Input
                      value={data.hero.marhamUrl}
                      onChange={(e) => cms.updateHero({ marhamUrl: e.target.value })}
                    />
                  </div>
                </div>

                {/* Bio Paragraphs Editor */}
                <div className="pt-4 border-t border-[#c3c4c7]/40 space-y-3">
                  <label className="text-xs font-bold text-[#1d2327]">
                    Clinical Bio Paragraphs
                  </label>
                  {data.bio.map((p, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <span className="text-xs font-bold text-muted-foreground pt-2">
                        #{idx + 1}
                      </span>
                      <Textarea
                        rows={3}
                        value={p}
                        onChange={(e) => {
                          const updated = [...data.bio];
                          updated[idx] = e.target.value;
                          cms.updateBio(updated);
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    onClick={() => toast.success("Doctor profile updated")}
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
                    Specialty Treatments ({data.services.length})
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
                    {data.services.map((srv) => (
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
              <div className="border-b border-[#c3c4c7]/40 pb-4">
                <h1 className="text-2xl font-bold text-[#1d2327]">
                  Clinics & Operating Timings ({data.clinics.length})
                </h1>
                <p className="text-xs text-[#50575e]">
                  Manage Islamabad clinic locations, shift hours, and Google Maps direction URLs.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {data.clinics.map((clinic, idx) => (
                  <div
                    key={clinic.id}
                    className="border border-[#c3c4c7] bg-white p-5 shadow-xs space-y-4"
                  >
                    <div className="font-bold text-sm text-[#1d2327] flex items-center justify-between">
                      <span>Clinic #{idx + 1}</span>
                      <MapPin size={16} className="text-[#2271b1]" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#646970]">Clinic Name</label>
                      <Input
                        value={clinic.name}
                        onChange={(e) =>
                          cms.updateClinic(clinic.id, { name: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#646970]">Address</label>
                      <Input
                        value={clinic.address}
                        onChange={(e) =>
                          cms.updateClinic(clinic.id, { address: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#646970]">Hours (Label)</label>
                      <Input
                        value={clinic.hours}
                        onChange={(e) =>
                          cms.updateClinic(clinic.id, { hours: e.target.value })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[#646970]">Open Hour (24h)</label>
                        <Input
                          type="number"
                          value={clinic.openHour}
                          onChange={(e) =>
                            cms.updateClinic(clinic.id, {
                              openHour: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[#646970]">Close Hour (24h)</label>
                        <Input
                          type="number"
                          value={clinic.closeHour}
                          onChange={(e) =>
                            cms.updateClinic(clinic.id, {
                              closeHour: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#646970]">Google Maps Link</label>
                      <Input
                        value={clinic.mapsUrl}
                        onChange={(e) =>
                          cms.updateClinic(clinic.id, { mapsUrl: e.target.value })
                        }
                      />
                    </div>

                    <Button
                      onClick={() => toast.success(`Clinic ${clinic.name} saved`)}
                      size="sm"
                      className="w-full bg-[#2271b1] hover:bg-[#135e96] text-white text-xs"
                    >
                      Save Clinic Details
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CREDENTIALS & LICENSES */}
          {activeTab === "credentials" && (
            <div className="space-y-6">
              <div className="border-b border-[#c3c4c7]/40 pb-4">
                <h1 className="text-2xl font-bold text-[#1d2327]">
                  Degrees, Certifications & Licenses
                </h1>
                <p className="text-xs text-[#50575e]">
                  Manage medical degrees (DPT, MS), sports certifications (FIFA, OMT), and international licensure (CORU, SCFHS, AHPC).
                </p>
              </div>

              {/* Licenses */}
              <div className="border border-[#c3c4c7] bg-white p-5 shadow-xs space-y-4">
                <div className="font-bold text-sm text-[#1d2327] flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#2271b1]" />
                  <span>International Medical Licenses ({data.licenses.length})</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {data.licenses.map((lic) => (
                    <div key={lic.id} className="rounded border border-slate-200 p-3 space-y-2">
                      <div className="font-bold text-xs text-[#1d2327]">{lic.code}</div>
                      <Input
                        value={lic.region}
                        onChange={(e) =>
                          cms.updateLicense(lic.id, { region: e.target.value })
                        }
                        placeholder="Region"
                      />
                      <Input
                        value={lic.fullName}
                        onChange={(e) =>
                          cms.updateLicense(lic.id, { fullName: e.target.value })
                        }
                        placeholder="Council Name"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Qualifications */}
              <div className="border border-[#c3c4c7] bg-white p-5 shadow-xs space-y-4">
                <div className="font-bold text-sm text-[#1d2327] flex items-center gap-2">
                  <GraduationCap size={16} className="text-[#2271b1]" />
                  <span>Academic Qualifications ({data.qualifications.length})</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {data.qualifications.map((q) => (
                    <div key={q.id} className="rounded border border-slate-200 p-3 space-y-2">
                      <Input
                        value={q.title}
                        onChange={(e) =>
                          cms.updateQualification(q.id, { title: e.target.value })
                        }
                        placeholder="Degree Title"
                      />
                      <Input
                        value={q.institution}
                        onChange={(e) =>
                          cms.updateQualification(q.id, { institution: e.target.value })
                        }
                        placeholder="University / Institute"
                      />
                      <Input
                        value={q.year}
                        onChange={(e) =>
                          cms.updateQualification(q.id, { year: e.target.value })
                        }
                        placeholder="Status / Year"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="border border-[#c3c4c7] bg-white p-5 shadow-xs space-y-4">
                <div className="font-bold text-sm text-[#1d2327] flex items-center gap-2">
                  <Award size={16} className="text-[#2271b1]" />
                  <span>Specialized Certifications ({data.certifications.length})</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {data.certifications.map((c) => (
                    <div key={c.id} className="rounded border border-slate-200 p-3 space-y-2">
                      <Input
                        value={c.title}
                        onChange={(e) =>
                          cms.updateCertification(c.id, { title: e.target.value })
                        }
                        placeholder="Certification Title"
                      />
                      <Input
                        value={c.issuer}
                        onChange={(e) =>
                          cms.updateCertification(c.id, { issuer: e.target.value })
                        }
                        placeholder="Issuing Authority (e.g. FIFA)"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => toast.success("Credentials saved successfully")}
                  className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs px-6"
                >
                  <Save size={14} className="mr-1.5" /> Save Credentials
                </Button>
              </div>
            </div>
          )}

          {/* TAB 7: TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#c3c4c7]/40 pb-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#1d2327]">
                    Patient Testimonials ({data.testimonials.length})
                  </h1>
                  <p className="text-xs text-[#50575e]">
                    Manage patient reviews, ratings, and quotes displayed on the website.
                  </p>
                </div>
                <Button
                  onClick={() => setTestimonialModalOpen(true)}
                  className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs"
                >
                  <Plus size={14} className="mr-1.5" /> Add New Review
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {data.testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="border border-[#c3c4c7] bg-white p-5 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#1d2327]">{t.name}</span>
                        <div className="flex text-amber-400">
                          {Array.from({ length: t.rating }).map((_, i) => (
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

                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
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
                    Frequently Asked Questions ({data.faqs.length})
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
                {data.faqs.map((faq, idx) => (
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

          {/* TAB 9: INQUIRIES & BOOKINGS LOG */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              <div className="border-b border-[#c3c4c7]/40 pb-4">
                <h1 className="text-2xl font-bold text-[#1d2327]">
                  Patient Inquiries & Appointments ({data.bookings.length})
                </h1>
                <p className="text-xs text-[#50575e]">
                  Consultation requests submitted by patients via the website booking modal.
                </p>
              </div>

              <div className="border border-[#c3c4c7] bg-white shadow-xs overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#c3c4c7] bg-[#f6f7f7] text-[#50575e]">
                      <th className="py-2.5 px-4">Date Submitted</th>
                      <th className="py-2.5 px-4">Patient Name</th>
                      <th className="py-2.5 px-4">Phone</th>
                      <th className="py-2.5 px-4">Clinic</th>
                      <th className="py-2.5 px-4">Requested Specialty</th>
                      <th className="py-2.5 px-4">Preferred Slot</th>
                      <th className="py-2.5 px-4">Status</th>
                      <th className="py-2.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.bookings.map((b) => (
                      <tr key={b.id} className="border-b border-slate-100 hover:bg-slate-50/80">
                        <td className="py-3 px-4 text-[#646970]">{b.createdAt}</td>
                        <td className="py-3 px-4 font-bold text-[#1d2327]">{b.patientName}</td>
                        <td className="py-3 px-4">
                          <a
                            href={`tel:${b.phone}`}
                            className="text-[#2271b1] hover:underline"
                          >
                            {b.phone}
                          </a>
                        </td>
                        <td className="py-3 px-4">{b.clinic}</td>
                        <td className="py-3 px-4">{b.service}</td>
                        <td className="py-3 px-4">
                          {b.preferredDate} ({b.preferredTimeSlot})
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={b.status}
                            onChange={(e) =>
                              cms.updateBookingStatus(
                                b.id,
                                e.target.value as any
                              )
                            }
                            className="rounded border border-slate-200 px-2 py-1 text-[11px] font-semibold"
                          >
                            <option value="New">New</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Delete inquiry for ${b.patientName}?`)) {
                                cms.deleteBooking(b.id);
                                toast.success("Inquiry removed");
                              }
                            }}
                            className="text-[#d63638] hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
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
        <DialogContent className="max-w-md rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Add Patient Review</DialogTitle>
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
                Add Review
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* GIT EXPORT MODAL */}
      <Dialog open={exportModalOpen} onOpenChange={setExportModalOpen}>
        <DialogContent className="max-w-2xl rounded-lg">
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
    </div>
  );
}
