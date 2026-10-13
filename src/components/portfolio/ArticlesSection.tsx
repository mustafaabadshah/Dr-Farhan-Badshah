import { useState } from "react";
import { BookOpen, Clock, Calendar, ArrowRight, X, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCMS, type ArticleItem } from "@/lib/cms-store";
import { FaWhatsapp } from "react-icons/fa";

interface ArticlesSectionProps {
  onOpenBooking?: () => void;
}

export function ArticlesSection({ onOpenBooking }: ArticlesSectionProps) {
  const { data } = useCMS();
  const { articles = [], contact, hero } = data;

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  // Extract categories
  const categories = ["All", ...Array.from(new Set(articles.map((a) => a.category).filter(Boolean)))];

  const filteredArticles = activeCategory === "All"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section id="articles" aria-labelledby="articles-heading" className="scroll-mt-24 py-24 md:py-32 bg-slate-50/70 border-y border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
              <BookOpen size={14} /> Clinical Articles & Patient Guides
            </p>
            <h2
              id="articles-heading"
              className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              Evidence-based insights for lasting recovery.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Practical guidance and medical rehabilitation articles by Dr. Farhan Badshah to help you understand pain, prevent sports injuries, and regain mobility.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-semibold text-foreground shadow-xs shrink-0 self-start md:self-end">
            <Sparkles size={14} className="text-primary" /> Verified Physiotherapy Insights
          </div>
        </div>

        {/* Categories Bar */}
        {categories.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-white text-muted-foreground border border-border/60 hover:text-foreground hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-border/50 bg-white transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1.5"
            >
              <div>
                {/* Image Frame */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <img
                    src={article.imageUrl || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80"}
                    alt={article.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-[11px] font-bold text-primary shadow-xs">
                      {article.category || "Physiotherapy"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Bar */}
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-primary" /> {article.date || "Recent"}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-primary" /> {article.readTime || "4 min read"}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                    {article.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-primary group-hover:text-primary-glow">
                <span>Read Full Article</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* FULL ARTICLE MODAL */}
      <Dialog open={!!selectedArticle} onOpenChange={(open) => !open && setSelectedArticle(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border-border/60 bg-background/98 p-6 sm:p-8 backdrop-blur-xl">
          {selectedArticle && (
            <div>
              <DialogHeader className="text-left space-y-3">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-bold text-primary">
                    {selectedArticle.category}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Calendar size={12} /> {selectedArticle.date}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock size={12} /> {selectedArticle.readTime}
                  </span>
                </div>

                <DialogTitle className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight">
                  {selectedArticle.title}
                </DialogTitle>
              </DialogHeader>

              {/* Hero Image */}
              <div className="mt-5 overflow-hidden rounded-xl aspect-video w-full bg-slate-100">
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Author Attribution */}
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-border/50 bg-slate-50/80 p-3 text-xs">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                  DF
                </div>
                <div>
                  <div className="font-bold text-foreground">{hero.name}</div>
                  <div className="text-[11px] text-muted-foreground">Consultant Physiotherapist | DPT, MS Sports Rehab</div>
                </div>
              </div>

              {/* Article Content */}
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700 whitespace-pre-line">
                {selectedArticle.content}
              </div>

              {/* Bottom Consultation Box */}
              <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center space-y-4">
                <h4 className="font-display text-lg font-bold text-foreground">
                  Suffering from a similar condition?
                </h4>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Get a personalized, hands-on clinical assessment with Dr. Farhan Badshah at Ali Medical Center, Shahida Khaliq Hospital, or General Practice Hospital in Islamabad.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                  <Button
                    onClick={() => {
                      setSelectedArticle(null);
                      onOpenBooking?.();
                    }}
                    className="rounded-full bg-primary text-white font-bold text-xs px-6 shadow-md shadow-primary/20 hover:bg-primary/90"
                  >
                    Book Clinical Evaluation
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 text-xs px-5 font-semibold"
                  >
                    <a
                      href={`https://wa.me/923329579368?text=${encodeURIComponent(
                        `Hello Dr. Farhan, I read your article "${selectedArticle.title}" and would like to ask about my symptoms.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaWhatsapp className="mr-1.5 h-4 w-4" /> Ask via WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
