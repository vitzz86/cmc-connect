"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import partnersData from "../data/partners.json";
import { AppHeader } from "../components/AppHeader";
import { useFlow } from "../lib/flow-context";
import { emptyExtraction, findMatches } from "../lib/matching";
import type { ExtractedProfile, Partner } from "../lib/types";

const partners = partnersData as Partner[];

export default function ProcessingPage() {
  const router = useRouter();
  const ran = useRef(false);
  const { t, profile, deck, setExtracted, setMatches, status, setStatus } = useFlow();

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    async function runMatching() {
      let extraction: ExtractedProfile | null = null;

      if (deck) {
        setStatus(t.status.extracting);
        const formData = new FormData();
        formData.append("deck", deck);
        formData.append("context", JSON.stringify(profile));

        try {
          const response = await fetch("/api/extract-deck", {
            method: "POST",
            body: formData
          });
          const payload = await response.json();

          if (response.ok) {
            extraction = { ...emptyExtraction(), ...payload } as ExtractedProfile;
            setExtracted(extraction);
            setStatus("");
          } else {
            const missingKey = String(payload.error || "").includes("DEEPSEEK_API_KEY");
            setStatus(missingKey ? t.status.missingKey : t.status.extractFailed);
          }
        } catch {
          setStatus(t.status.extractFailed);
        }
      }

      const nextMatches = findMatches(partners, profile, extraction, {
        category: t.results.reasonCategory,
        keyword: t.results.reasonKeyword,
        need: t.results.reasonNeed,
        location: t.results.reasonLocation
      });
      setMatches(nextMatches);

      window.setTimeout(() => {
        router.replace("/matches");
      }, 1600);
    }

    runMatching();
  }, [deck, profile, router, setExtracted, setMatches, setStatus, t]);

  return (
    <main className="min-h-screen bg-ivory text-ink">
      <AppHeader minimal />
      <section className="mx-auto grid min-h-[calc(100vh-74px)] max-w-3xl place-items-center px-5 py-12 text-center">
        <div>
          <div className="mx-auto grid h-20 w-20 place-items-center bg-ink text-white">
            <Loader2 className="animate-spin" size={36} />
          </div>
          <h1 className="mt-7 font-display text-5xl font-black">{t.processing.title}</h1>
          <p className="mt-4 text-base leading-8 text-ink/65">{t.processing.body}</p>
          <div className="mt-8 grid gap-3 text-left">
            {[t.processing.deck, t.processing.matching, t.processing.ranking].map((item) => (
              <div key={item} className="flex items-center gap-3 border border-ink/10 bg-white p-4">
                <Loader2 className="animate-spin text-gold" size={18} />
                <span className="text-sm font-bold">{item}</span>
              </div>
            ))}
          </div>
          {status ? <p className="mt-5 border border-gold/30 bg-white p-3 text-sm font-semibold text-gold">{status}</p> : null}
        </div>
      </section>
    </main>
  );
}
