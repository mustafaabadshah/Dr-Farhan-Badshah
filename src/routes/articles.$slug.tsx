import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCMS, type ArticleItem } from "@/lib/cms-store";
import { Navigation } from "@/components/portfolio/Navigation";
import { Footer } from "@/components/portfolio/Footer";
import { FloatingActionBar } from "@/components/portfolio/FloatingActionBar";
import { BookingModal } from "@/components/portfolio/BookingModal";
import { ArticleContentRenderer } from "@/components/portfolio/ArticleContentRenderer";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Copy,
  Check,
  BookOpen,
  CalendarClock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { FaWhatsapp, FaFacebook, FaLinkedin } from "react-icons/fa";
import { toast } from "sonner";

const DEFAULT_ARTICLE_IMAGE =
  "https://raw.githubusercontent.com/mustafaabadshah/Dr-Farhan-Badshah/master/public/images/sports-injury-rehab-guide.jpg";
const FALLBACK_ARTICLE_IMAGE =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80";

export const Route = createFileRoute("/articles/$slug")({
  component: ArticleDetailPage,
});

function ArticleDetailPage() {
  const { slug } = Route.useParams();
  const { data, getWhatsAppUrl } = useCMS();
  const { articles = [], hero, contact } = data;

  const [bookingOpen, setBookingOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Match by slug or id
  const article: ArticleItem | undefined = articles.find(
    (a) => a.slug === slug || a.id === slug,
  );

  // Other articles for recommendations
  const relatedArticles = articles
    .filter((a) => a.id !== article?.id)
    .slice(0, 3);

  // Page URL for sharing
  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://farhanbadshah.com/articles/${slug}`;

  // Update Document Head & Social Meta Tags dynamically
  useEffect(() => {
    if (!article) return;

    const pageTitle = `${article.title} | Dr. Farhan Badshah Physiotherapist`;
    document.title = pageTitle;

    const setMeta = (
      attr: "name" | "property",
      key: string,
      content: string,
    ) => {
      if (!content) return;
      let el = document.querySelector(
        `meta[${attr}="${key}"]`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(
        `link[rel="${rel}"]`,
      ) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    setMeta("name", "description", article.description || "");
    setMeta(
      "name",
      "keywords",
      `${article.category}, sports physiotherapy Islamabad, Dr Farhan Badshah, rehabilitation guide`,
    );
    setMeta("name", "author", hero.name || "Dr. Farhan Badshah");

    // Canonical link
    const canonical = `https://farhanbadshah.com/articles/${article.slug || slug}`;
    setLink("canonical", canonical);

    // Open Graph
    setMeta("property", "og:type", "article");
    setMeta("property", "og:title", article.title);
    setMeta("property", "og:description", article.description || "");
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", article.imageUrl || DEFAULT_ARTICLE_IMAGE);
    setMeta("property", "og:site_name", "Dr. Farhan Badshah Physiotherapy");

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", article.title);
    setMeta("name", "twitter:description", article.description || "");
    setMeta("name", "twitter:image", article.imageUrl || DEFAULT_ARTICLE_IMAGE);

    // Schema.org MedicalWebPage JSON-LD
    let scriptEl = document.getElementById(
      "article-schema-jsonld",
    ) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.id = "article-schema-jsonld";
      scriptEl.type = "application/ld+json";
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      headline: article.title,
      description: article.description,
      image: article.imageUrl || DEFAULT_ARTICLE_IMAGE,
      url: canonical,
      author: {
        "@type": "Physician",
        name: "Dr. Farhan Badshah",
        url: "https://farhanbadshah.com/",
        medicalSpecialty: "Physiotherapy & Sports Rehabilitation",
      },
      publisher: {
        "@type": "MedicalBusiness",
        name: "Dr. Farhan Badshah Physiotherapy Clinic Islamabad",
        url: "https://farhanbadshah.com/",
      },
      datePublished: article.date,
    });

    return () => {
      // Reset title when unmounting
      document.title = `${hero.name} | Best Physiotherapist in Islamabad | Sports & MSK Rehab Specialist`;
    };
  }, [article, hero, slug]);

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      toast.success("Article link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // 404 state if article doesn't exist
  if (!article) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation onOpenBooking={() => setBookingOpen(true)} />
        <main className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="max-w-md text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary mb-4">
              <BookOpen size={32} />
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Article Not Found
            </h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              The clinical article or patient guide you are looking for may have
              been updated or moved.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="rounded-full">
                <a href="/#articles">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Browse All Articles
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/">Go to Homepage</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer onOpenBooking={() => setBookingOpen(true)} />
        <BookingModal
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
        />
      </div>
    );
  }

  const waShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `*${article.title}*\nRead this clinical guide by Dr. Farhan Badshah:\n${currentUrl}`,
  )}`;
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    currentUrl,
  )}`;
  const liShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    currentUrl,
  )}`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation onOpenBooking={() => setBookingOpen(true)} />

      <main className="pb-24">
        {/* Breadcrumb Header Bar */}
        <section className="border-b border-border/40 bg-slate-50/80 backdrop-blur-xs py-3.5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 flex items-center justify-between text-xs text-muted-foreground">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 overflow-hidden"
            >
              <Link
                to="/"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                Home
              </Link>
              <ChevronRight size={12} className="shrink-0" />
              <a
                href="/#articles"
                className="hover:text-primary transition-colors"
              >
                Articles
              </a>
              <ChevronRight size={12} className="shrink-0" />
              <span className="truncate font-medium text-foreground max-w-[200px] sm:max-w-xs">
                {article.title}
              </span>
            </nav>

            <a
              href="/#articles"
              className="inline-flex items-center gap-1 font-semibold text-primary hover:underline shrink-0"
            >
              <ArrowLeft size={13} /> All Guides
            </a>
          </div>
        </section>

        {/* Article Header */}
        <article className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 md:pt-14">
          <div className="space-y-4">
            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
                {article.category || "Clinical Care"}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                <Clock size={13} className="text-primary" />{" "}
                {article.readTime || "6 min read"}
              </span>
              <span className="text-muted-foreground/40">•</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                <Calendar size={13} className="text-primary" />{" "}
                {article.date || "Recent"}
              </span>
              {article.featured && (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                  <Sparkles size={11} /> Featured Guide
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl leading-[1.15]">
              {article.title}
            </h1>

            {/* Description / Subheading */}
            {article.description && (
              <p className="text-lg text-slate-600 leading-relaxed font-normal pt-1">
                {article.description}
              </p>
            )}

            {/* Author & Share Bar */}
            <div className="pt-4 pb-6 border-b border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-primary text-white font-bold text-base shadow-sm">
                  FB
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-display text-sm font-bold text-foreground">
                    <span>{hero.name}</span>
                    <ShieldCheck size={15} className="text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Consultant Physiotherapist • CORU (Ireland), SCFHS (KSA),
                    AHPC (PK)
                  </p>
                </div>
              </div>

              {/* Social Share Buttons */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mr-1">
                  <Share2 size={13} /> Share:
                </span>
                <a
                  href={waShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full bg-[#25D366] text-white shadow-xs hover:scale-105 transition-transform"
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <FaWhatsapp size={16} />
                </a>
                <a
                  href={fbShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full bg-[#1877F2] text-white shadow-xs hover:scale-105 transition-transform"
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <FaFacebook size={16} />
                </a>
                <a
                  href={liShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full bg-[#0A66C2] text-white shadow-xs hover:scale-105 transition-transform"
                  title="Share on LinkedIn"
                  aria-label="Share on LinkedIn"
                >
                  <FaLinkedin size={16} />
                </a>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center gap-1 rounded-full border border-border/80 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  title="Copy direct link"
                >
                  {copied ? (
                    <Check size={13} className="text-emerald-600" />
                  ) : (
                    <Copy size={13} />
                  )}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 shadow-md bg-slate-100 my-6">
              <img
                src={article.imageUrl || DEFAULT_ARTICLE_IMAGE}
                alt={article.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes("raw.githubusercontent.com")) {
                    target.src = DEFAULT_ARTICLE_IMAGE;
                  } else if (!target.src.includes("unsplash.com")) {
                    target.src = FALLBACK_ARTICLE_IMAGE;
                  }
                }}
              />
            </div>

            {/* Full Parsed Article Content */}
            <div className="pt-2">
              <ArticleContentRenderer content={article.content} />
            </div>

            {/* Clinical Action Box */}
            <section
              aria-label="Book Consultation CTA"
              className="mt-14 rounded-2xl border-2 border-primary/25 bg-gradient-to-br from-primary/10 via-primary/5 to-white p-6 sm:p-8 shadow-sm"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-xl space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Personalized Rehabilitation in Islamabad
                  </span>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Need expert evaluation for this condition?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Consult Dr. Farhan Badshah at Ali Medical Center (F-8),
                    Shahida Khaliq Hospital (G-8/4), or General Practice
                    Hospital (Blue Area). Individualized recovery programs
                    tailored to your goals.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                  <Button
                    onClick={() => setBookingOpen(true)}
                    size="lg"
                    className="rounded-full shadow-lg shadow-primary/25"
                  >
                    <CalendarClock className="mr-2 h-5 w-5" /> Book Consultation
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-[#25D366] text-white hover:bg-[#1ebe5d] shadow-lg shadow-[#25D366]/20 font-bold"
                  >
                    <a
                      href={getWhatsAppUrl(
                        `Hello Dr. Farhan, I read your article "${article.title}" and would like to consult with you.`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaWhatsapp className="mr-2 h-5 w-5" /> WhatsApp Doctor
                    </a>
                  </Button>
                </div>
              </div>
            </section>

            {/* Related Articles Section */}
            {relatedArticles.length > 0 && (
              <section className="mt-16 pt-12 border-t border-border/60">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      More Clinical Guides
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Explore more evidence-based physiotherapy guides by Dr.
                      Farhan Badshah
                    </p>
                  </div>
                  <a
                    href="/#articles"
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    View All <ExternalLink size={12} />
                  </a>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.id}
                      to="/articles/$slug"
                      params={{ slug: rel.slug || rel.id }}
                      className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border/60 bg-white p-4 shadow-xs hover:border-primary/40 hover:shadow-md transition"
                    >
                      <div>
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-100 mb-3">
                          <img
                            src={rel.imageUrl || DEFAULT_ARTICLE_IMAGE}
                            alt={rel.title}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <span className="text-[11px] font-bold text-primary uppercase">
                          {rel.category}
                        </span>
                        <h4 className="mt-1 font-display text-sm font-bold text-foreground group-hover:text-primary transition line-clamp-2">
                          {rel.title}
                        </h4>
                      </div>
                      <div className="mt-4 pt-3 border-t border-border/40 text-xs text-primary font-semibold flex items-center justify-between">
                        <span>Read Full Guide</span>
                        <ChevronRight
                          size={13}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </article>
      </main>

      <Footer onOpenBooking={() => setBookingOpen(true)} />
      <FloatingActionBar onOpenBooking={() => setBookingOpen(true)} />
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}
