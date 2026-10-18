import React from "react";
import { CheckCircle2, HelpCircle, Activity, ShieldCheck, MapPin } from "lucide-react";

interface ArticleContentRendererProps {
  content: string;
}

export function ArticleContentRenderer({ content }: ArticleContentRendererProps) {
  if (!content) return null;

  // Helper to parse inline markdown (**bold**, *italic*)
  const renderInline = (text: string): React.ReactNode => {
    // Split by **bold** tokens
    const parts = text.split(/(\*\*[^*]+?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={idx} className="font-bold text-slate-950">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
        return (
          <em key={idx} className="italic text-slate-800">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  // Split content by paragraphs / sections
  const rawBlocks = content.split(/\n\s*\n/);

  return (
    <div className="space-y-5 text-[15px] leading-relaxed text-slate-700">
      {rawBlocks.map((block, blockIdx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // 1. H4 Headings (e.g. "#### Stage 1: Initial Assessment...")
        if (trimmed.startsWith("#### ")) {
          const heading = trimmed.replace(/^####\s+/, "");
          const isStage = heading.toLowerCase().includes("stage");
          return (
            <div
              key={blockIdx}
              className={`mt-6 mb-3 rounded-xl p-3.5 border ${
                isStage
                  ? "bg-primary/5 border-primary/20"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <h4 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
                <Activity size={16} className="text-primary shrink-0" />
                <span>{renderInline(heading)}</span>
              </h4>
            </div>
          );
        }

        // 2. H3 Headings (e.g. "### What Are the Most Common Sports Injuries?")
        if (trimmed.startsWith("### ")) {
          const heading = trimmed.replace(/^###\s+/, "");
          return (
            <div key={blockIdx} className="pt-6 pb-2 border-b border-border/50">
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-primary shrink-0" />
                <span>{renderInline(heading)}</span>
              </h3>
            </div>
          );
        }

        // 3. H2 Headings
        if (trimmed.startsWith("## ")) {
          const heading = trimmed.replace(/^##\s+/, "");
          return (
            <div key={blockIdx} className="pt-8 pb-3 border-b-2 border-primary/30">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950">
                {renderInline(heading)}
              </h2>
            </div>
          );
        }

        // 4. Lines with bullet items or numbered steps
        const lines = trimmed.split("\n");
        const hasBullets = lines.some((l) => /^\s*([•\-\*]|\d+\.)\s+/.test(l));

        if (hasBullets) {
          return (
            <div key={blockIdx} className="space-y-2.5 my-3">
              {lines.map((line, lIdx) => {
                const lineTrimmed = line.trim();
                const bulletMatch = lineTrimmed.match(/^\s*([•\-\*]|\d+\.)\s+(.*)$/);

                if (bulletMatch) {
                  const prefix = bulletMatch[1];
                  const bodyText = bulletMatch[2];
                  const isNumbered = /^\d+\./.test(prefix);

                  return (
                    <div
                      key={lIdx}
                      className="flex items-start gap-3 rounded-lg p-2.5 bg-slate-50/70 border border-slate-100 hover:border-primary/20 transition-colors"
                    >
                      {isNumbered ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white font-bold text-xs shrink-0 mt-0.5">
                          {prefix.replace(".", "")}
                        </span>
                      ) : (
                        <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                      )}
                      <div className="flex-1 text-sm leading-relaxed text-slate-800">
                        {renderInline(bodyText)}
                      </div>
                    </div>
                  );
                }

                // If line in block is introductory text before bullets
                return (
                  <p key={lIdx} className="font-medium text-slate-900 mb-2">
                    {renderInline(lineTrimmed)}
                  </p>
                );
              })}
            </div>
          );
        }

        // 5. FAQ Question/Answer Block detection (starts with **Question?**)
        if (trimmed.startsWith("**") && trimmed.includes("?**")) {
          const qMatch = trimmed.match(/^\*\*([^*]+?\?)\*\*\s*([\s\S]*)$/);
          if (qMatch) {
            const question = qMatch[1];
            const answer = qMatch[2].trim();
            return (
              <div key={blockIdx} className="rounded-xl border border-primary/20 bg-white p-4 shadow-xs my-3 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-950 text-sm sm:text-base">
                  <HelpCircle size={16} className="text-primary shrink-0" />
                  <span>{question}</span>
                </div>
                {answer && (
                  <p className="text-sm leading-relaxed text-slate-700 pl-6 border-l-2 border-primary/30">
                    {renderInline(answer)}
                  </p>
                )}
              </div>
            );
          }
        }

        // 6. Doctor Signature Block
        if (trimmed.includes("Dr. Farhan Badshah") && trimmed.includes("Ali Medical Center")) {
          return (
            <div
              key={blockIdx}
              className="mt-8 rounded-2xl border-2 border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-white p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-950 text-base">
                  <ShieldCheck className="text-primary" size={20} />
                  <span>Dr. Farhan Badshah</span>
                </div>
                <p className="text-xs text-muted-foreground font-medium">
                  Sports and Orthopedic Physiotherapist
                </p>
                <p className="text-xs text-slate-700 flex items-center gap-1.5 pt-1">
                  <MapPin size={13} className="text-primary shrink-0" />
                  Ali Medical Center, F-8 Markaz, Islamabad
                </p>
              </div>
              <div className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white shadow-xs shrink-0">
                Verified Specialist
              </div>
            </div>
          );
        }

        // 7. Regular paragraph with inline markdown
        return (
          <p key={blockIdx} className="leading-relaxed text-slate-700">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
