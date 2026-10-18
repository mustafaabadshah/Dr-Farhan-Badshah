import React from "react";
import { CheckCircle2, HelpCircle, Activity, ShieldCheck, MapPin } from "lucide-react";

interface ArticleContentRendererProps {
  content: string;
}

export function ArticleContentRenderer({ content }: ArticleContentRendererProps) {
  if (!content) return null;

  // Helper to parse inline markdown: renders bold as bold without asterisks, strips stray hashes
  const renderInline = (raw: string): React.ReactNode => {
    if (!raw) return null;
    // Strip any stray markdown heading hashes from inline text if present
    const cleanRaw = raw.replace(/^#+\s*/, "");

    // Split by **bold** tokens
    const parts = cleanRaw.split(/(\*\*[^*]+?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2).trim();
        return (
          <strong
            key={idx}
            style={{ fontWeight: 800 }}
            className="font-extrabold text-slate-950"
          >
            {boldText}
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

  // Structured Line-by-Line AST Parser
  const lines = content.split(/\r?\n/);
  type ElementNode =
    | { type: "h2"; text: string }
    | { type: "h3"; text: string }
    | { type: "h4"; text: string }
    | { type: "numbered"; number: string; text: string }
    | { type: "bullet"; text: string }
    | { type: "faq"; question: string; answer?: string }
    | { type: "doctor" }
    | { type: "p"; text: string };

  const nodes: ElementNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();
    if (!trimmed) continue;

    // Doctor sign-off block
    if (trimmed.includes("Dr. Farhan Badshah") && trimmed.includes("Ali Medical Center")) {
      nodes.push({ type: "doctor" });
      continue;
    }

    // Heading 4 (####)
    if (/^####\s+/.test(trimmed)) {
      const heading = trimmed.replace(/^####\s+/, "");
      nodes.push({ type: "h4", text: heading });
      continue;
    }

    // Heading 3 (###)
    if (/^###\s+/.test(trimmed)) {
      const heading = trimmed.replace(/^###\s+/, "");
      nodes.push({ type: "h3", text: heading });
      continue;
    }

    // Heading 2 (##)
    if (/^##\s+/.test(trimmed)) {
      const heading = trimmed.replace(/^##\s+/, "");
      nodes.push({ type: "h2", text: heading });
      continue;
    }

    // Heading 1 (#)
    if (/^#\s+/.test(trimmed)) {
      const heading = trimmed.replace(/^#\s+/, "");
      nodes.push({ type: "h2", text: heading });
      continue;
    }

    // Numbered step (e.g. 1. **Title**: Description)
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      nodes.push({
        type: "numbered",
        number: numMatch[1],
        text: numMatch[2],
      });
      continue;
    }

    // Bullet item (e.g. • or - or *)
    const bulletMatch = trimmed.match(/^([•\-\*])\s+(.*)$/);
    if (bulletMatch) {
      nodes.push({
        type: "bullet",
        text: bulletMatch[2],
      });
      continue;
    }

    // FAQ Question block (**Question?**)
    if (trimmed.startsWith("**") && trimmed.includes("?**")) {
      const qText = trimmed.replace(/^\*\*/, "").replace(/\*\*.*$/, "").trim();
      // Look ahead for subsequent answer lines
      let answerText = "";
      while (i + 1 < lines.length) {
        const nextLine = lines[i + 1].trim();
        if (!nextLine) {
          i++;
          continue;
        }
        if (
          nextLine.startsWith("#") ||
          nextLine.startsWith("**") ||
          /^\d+\./.test(nextLine) ||
          nextLine.startsWith("•")
        ) {
          break;
        }
        answerText += (answerText ? " " : "") + nextLine;
        i++;
      }
      nodes.push({
        type: "faq",
        question: qText,
        answer: answerText,
      });
      continue;
    }

    // Regular paragraph
    nodes.push({
      type: "p",
      text: trimmed,
    });
  }

  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-slate-700">
      {nodes.map((node, idx) => {
        switch (node.type) {
          case "h2":
            return (
              <div key={idx} className="pt-8 pb-3 border-b-2 border-primary/30">
                <h2
                  style={{ fontWeight: 800 }}
                  className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight"
                >
                  {renderInline(node.text)}
                </h2>
              </div>
            );

          case "h3":
            return (
              <div key={idx} className="pt-6 pb-2 border-b border-border/40">
                <h3
                  style={{ fontWeight: 800 }}
                  className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5"
                >
                  <span className="h-3 w-1.5 rounded-full bg-primary shrink-0" />
                  <span>{renderInline(node.text)}</span>
                </h3>
              </div>
            );

          case "h4":
            return (
              <div
                key={idx}
                className="rounded-xl border border-primary/25 bg-primary/5 p-3.5 my-3 shadow-2xs"
              >
                <h4
                  style={{ fontWeight: 800 }}
                  className="font-display text-base font-extrabold text-slate-900 flex items-center gap-2"
                >
                  <Activity size={16} className="text-primary shrink-0" />
                  <span>{renderInline(node.text)}</span>
                </h4>
              </div>
            );

          case "numbered":
            return (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl p-3 bg-slate-50 border border-slate-200/80 my-2 shadow-2xs hover:border-primary/30 transition-colors"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white font-black text-xs shrink-0 mt-0.5 shadow-xs">
                  {node.number}
                </span>
                <div className="text-sm leading-relaxed text-slate-800 flex-1">
                  {renderInline(node.text)}
                </div>
              </div>
            );

          case "bullet":
            return (
              <div key={idx} className="flex items-start gap-2.5 my-1.5 pl-1">
                <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                <div className="text-sm leading-relaxed text-slate-800 flex-1">
                  {renderInline(node.text)}
                </div>
              </div>
            );

          case "faq":
            return (
              <div
                key={idx}
                className="rounded-xl border border-primary/20 bg-slate-50/60 p-4 my-3 shadow-2xs space-y-2"
              >
                <div
                  style={{ fontWeight: 800 }}
                  className="flex items-center gap-2 font-extrabold text-slate-950 text-sm sm:text-base"
                >
                  <HelpCircle size={17} className="text-primary shrink-0" />
                  <span>{renderInline(node.question)}</span>
                </div>
                {node.answer && (
                  <p className="text-sm leading-relaxed text-slate-700 pl-6 border-l-2 border-primary/40">
                    {renderInline(node.answer)}
                  </p>
                )}
              </div>
            );

          case "doctor":
            return (
              <div
                key={idx}
                className="mt-8 rounded-2xl border-2 border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-white p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1">
                  <div
                    style={{ fontWeight: 800 }}
                    className="flex items-center gap-2 font-extrabold text-slate-950 text-base"
                  >
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

          case "p":
          default:
            return (
              <p key={idx} className="leading-relaxed text-slate-700 mb-2">
                {renderInline(node.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
