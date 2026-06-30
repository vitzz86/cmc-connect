"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AppHeader } from "../components/AppHeader";
import { useFlow } from "../lib/flow-context";
import { emptyExtraction } from "../lib/matching";
import type { ExtractedProfile } from "../lib/types";

export default function ProcessingPage() {
  const router = useRouter();
  const ran = useRef(false);
  const { locale, t, profile, deck, extracted, setExtracted, setMatches, status, setStatus } = useFlow();

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    async function runMatching() {
      let extraction: ExtractedProfile | null = extracted;

      if (deck && !extraction) {
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
            setStatus(payload.code === "extraction_setup_missing" ? t.status.missingKey : t.status.extractFailed);
          }
        } catch {
          setStatus(t.status.extractFailed);
        }
      }

      const matchResponse = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, profile, extracted: extraction })
      });

      if (!matchResponse.ok) {
        setStatus(t.validation.incomplete);
        router.replace("/");
        return;
      }

      const payload = await matchResponse.json();
      setMatches(payload.matches || []);

      window.setTimeout(() => {
        router.replace("/matches");
      }, 1600);
    }

    runMatching();
  }, [deck, extracted, locale, profile, router, setExtracted, setMatches, setStatus, t]);

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
