import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCMS } from "@/lib/cms-store";
import { HelpCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FaqSectionProps {
  onOpenBooking?: () => void;
}

export function FaqSection({ onOpenBooking }: FaqSectionProps) {
  const { data } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(data.faqs.map((f) => f.category)))];

  const filteredFaqs =
    selectedCategory === "All"
      ? data.faqs
      : data.faqs.filter((f) => f.category === selectedCategory);

  return (
    <section
      id="faqs"
      aria-labelledby="faqs-heading"
      className="scroll-mt-24 bg-muted/40 py-24 md:py-32"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <HelpCircle size={14} /> Patient FAQs
          </div>
          <h2
            id="faqs-heading"
            className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Clear answers to common questions about consultations, rehabilitation techniques, and clinic appointments.
          </p>

          {/* Category Pills */}
          {categories.length > 2 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "border border-border/60 bg-white/80 text-muted-foreground hover:bg-white hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 rounded-3xl border-2 border-border/50 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.id || index}
                value={`item-${index}`}
                className="rounded-2xl border border-border/40 bg-slate-50/50 px-5 transition-colors data-[state=open]:border-primary/40 data-[state=open]:bg-primary/[0.02]"
              >
                <AccordionTrigger className="text-left font-display text-base font-semibold text-foreground hover:no-underline hover:text-primary sm:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:flex-row">
            <div>
              <div className="font-display font-bold text-foreground">
                Have a question not listed here?
              </div>
              <div className="text-sm text-muted-foreground">
                Dr. Farhan and his team are ready to discuss your specific condition.
              </div>
            </div>
            <div className="flex shrink-0 gap-3">
              {onOpenBooking && (
                <Button
                  onClick={onOpenBooking}
                  className="rounded-full bg-primary px-5 font-semibold text-white shadow-md hover:shadow-lg"
                >
                  Book Consultation
                </Button>
              )}
              <Button
                asChild
                variant="outline"
                className="rounded-full border-border/60 bg-white font-semibold hover:bg-slate-50"
              >
                <a href={data.contact.whatsappUrl} target="_blank" rel="noreferrer">
                  <MessageSquare className="mr-2 h-4 w-4 text-primary" /> WhatsApp Ask
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
