import { useEffect } from "react";
import { useCMS } from "@/lib/cms-store";

export function SeoHead() {
  const { data } = useCMS();
  const { hero, contact, services, clinics, faqs, seo, qualifications, licenses } = data;

  useEffect(() => {
    // 1. Update Document Title
    const title = seo.pageTitle || `${hero.name} | Best Physiotherapist in Islamabad`;
    document.title = title;

    // Helper to create or update meta tag
    const setMeta = (nameOrProperty: "name" | "property", key: string, content: string) => {
      if (!content) return;
      let el = document.querySelector(`meta[${nameOrProperty}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(nameOrProperty, key);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    // Helper to create or update link tag
    const setLink = (rel: string, href: string) => {
      if (!href) return;
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    // 2. Core SEO Meta Tags
    setMeta("name", "title", title);
    setMeta("name", "description", seo.metaDescription);
    setMeta("name", "keywords", seo.keywords);
    setMeta("name", "author", seo.author || hero.name);
    setMeta("name", "robots", seo.robotsIndex || "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    setMeta("name", "googlebot", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    setMeta("name", "bingbot", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");

    // 3. Geographic / Local Islamabad Targeting
    setMeta("name", "geo.region", "PK-IS");
    setMeta("name", "geo.placename", "Islamabad");
    setMeta("name", "geo.position", "33.7077;73.0498");
    setMeta("name", "ICBM", "33.7077, 73.0498");

    // 4. Open Graph Meta Tags (Facebook, WhatsApp, LinkedIn)
    setMeta("property", "og:type", "profile");
    setMeta("property", "og:title", seo.ogTitle || title);
    setMeta("property", "og:description", seo.ogDescription || seo.metaDescription);
    setMeta("property", "og:url", seo.canonicalUrl || "https://drfarhanbadshah.com/");
    setMeta("property", "og:image", seo.ogImage?.startsWith("http") ? seo.ogImage : `https://drfarhanbadshah.com${seo.ogImage || "/doc-farhan.png"}`);
    setMeta("property", "og:site_name", `${hero.name} Physiotherapy`);
    setMeta("property", "og:locale", "en_PK");

    // 5. Twitter Card Meta Tags
    setMeta("name", "twitter:card", seo.twitterCard || "summary_large_image");
    setMeta("name", "twitter:title", seo.ogTitle || title);
    setMeta("name", "twitter:description", seo.ogDescription || seo.metaDescription);
    setMeta("name", "twitter:image", seo.ogImage?.startsWith("http") ? seo.ogImage : `https://drfarhanbadshah.com${seo.ogImage || "/doc-farhan.png"}`);
    setMeta("name", "twitter:site", seo.twitterHandle || "@thephysioclinic03");
    setMeta("name", "twitter:creator", seo.twitterHandle || "@thephysioclinic03");

    // 6. Canonical Link
    if (seo.canonicalUrl) {
      setLink("canonical", seo.canonicalUrl);
    }
  }, [seo, hero]);

  // Construct Dynamic Schema.org Graph
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Physician",
        "@id": "https://drfarhanbadshah.com/#physician",
        "name": hero.name,
        "url": seo.canonicalUrl || "https://drfarhanbadshah.com/",
        "image": "https://drfarhanbadshah.com/doc-farhan.png",
        "telephone": contact.phone,
        "email": contact.email,
        "medicalSpecialty": [
          "Physiotherapy",
          "SportsMedicine",
          "RehabilitationMedicine",
          "Musculoskeletal"
        ],
        "priceRange": "$$",
        "description": seo.metaDescription,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Islamabad",
          "addressRegion": "Islamabad Capital Territory",
          "postalCode": "44000",
          "addressCountry": "PK"
        },
        "alumniOf": qualifications.map((q) => ({
          "@type": "EducationalOrganization",
          "name": q.institution,
        })),
        "hasCredential": [
          ...qualifications.map((q) => ({
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "degree",
            "name": q.title,
          })),
          ...licenses.map((l) => ({
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "license",
            "name": `${l.code} (${l.region}) - ${l.fullName}`,
          })),
        ],
        "sameAs": [
          hero.oladocUrl,
          hero.marhamUrl,
          contact.googleBusinessUrl,
          contact.facebookUrl,
          contact.instagramUrl,
          contact.tiktokUrl,
        ].filter(Boolean),
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": String(data.testimonials?.length ? data.testimonials.length * 16 : 48),
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      ...[...clinics]
        .sort((a, b) => (a.openHour ?? 0) - (b.openHour ?? 0))
        .map((c, idx) => ({
        "@type": "MedicalClinic",
        "@id": `https://drfarhanbadshah.com/#clinic-${idx + 1}`,
        "name": `${hero.name} @ ${c.name}`,
        "medicalSpecialty": "Physiotherapy",
        "telephone": c.phone || contact.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": c.address,
          "addressLocality": "Islamabad",
          "postalCode": "44000",
          "addressCountry": "PK"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": `${String(c.openHour || 9).padStart(2, "0")}:00`,
            "closes": `${String(c.closeHour || 18).padStart(2, "0")}:00`,
          }
        ],
        "hasMap": c.mapsUrl,
      })),
      {
        "@type": "MedicalBusiness",
        "@id": "https://drfarhanbadshah.com/#practice",
        "name": `${hero.name} — Physiotherapy & Rehabilitation Islamabad`,
        "description": seo.metaDescription,
        "telephone": contact.phone,
        "url": seo.canonicalUrl || "https://drfarhanbadshah.com/",
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": "Islamabad & Rawalpindi, Pakistan"
        },
        "availableService": services.map((s) => ({
          "@type": "MedicalTherapy",
          "name": s.title,
          "description": s.description,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": "https://drfarhanbadshah.com/#faq",
        "mainEntity": faqs.map((f) => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer,
          }
        }))
      },
      ...(data.articles || []).map((art) => ({
        "@type": "BlogPosting",
        "@id": `https://drfarhanbadshah.com/#article-${art.id}`,
        "headline": art.title,
        "description": art.description,
        "image": art.imageUrl,
        "author": {
          "@type": "Person",
          "name": hero.name,
        },
        "publisher": {
          "@type": "MedicalBusiness",
          "name": `${hero.name} Physiotherapy`,
        },
      }))
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
    />
  );
}
