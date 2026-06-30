"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Database, Mail, MapPin, ShieldCheck } from "lucide-react";
import { categoryCopy } from "../../lib/categories";
import { AppHeader } from "../../components/AppHeader";
import { useFlow } from "../../lib/flow-context";
import type { Partner } from "../../lib/types";

export default function MatchDetailPage({ params }: { params: { id: string } }) {
  const { locale, t, matches } = useFlow();
  const [fallbackPartner, setFallbackPartner] = useState<Partner | null>(null);
  const match = matches.find((item) => item.partner.id === params.id);
  const partner = match?.partner || fallbackPartner;

  useEffect(() => {
    if (match?.partner) return;
    let active = true;

    fetch(`/api/partners?id=${encodeURIComponent(params.id)}`)
      .then((response) => response.json())
      .then((payload) => {
        if (active) setFallbackPartner((payload.partner || null) as Partner | null);
      })
      .catch(() => {
        if (active) setFallbackPartner(null);
      });

    return () => {
      active = false;
    };
  }, [params.id, match?.partner]);

  return (
    <main className="min-h-screen bg-ivory text-ink">
      <AppHeader />
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-10 lg:grid-cols-[1fr_380px]">
        <div className="border border-ink/10 bg-white p-6">
          <Link className="mb-6 inline-flex items-center gap-2 text-sm font-black text-ink/65" href="/matches">
            <ArrowLeft size={17} />
            {t.results.back}
          </Link>

          {partner ? (
            <>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">{t.detail.title}</p>
              <h1 className="mt-3 font-display text-5xl font-black leading-tight">{partner.Company}</h1>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-ivory px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-ink/65">
                  {categoryCopy[partner.IndustriID]?.[locale] || partner.IndustriID}
                </span>
                <span className="bg-ivory px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-ink/65">{partner.Role}</span>
                {match ? <span className="bg-ink px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">{t.results.score}: {match.score}</span> : null}
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div className="border border-ink/10 bg-[#fffdf8] p-5">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-ink/45">{t.results.product}</div>
                  <p className="mt-3 text-sm leading-6 text-ink/72">{partner.Product || "-"}</p>
                </div>
                <div className="border border-ink/10 bg-[#fffdf8] p-5">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-ink/45">Sub-sector</div>
                  <p className="mt-3 text-sm leading-6 text-ink/72">{partner.SubSector || partner.Brand || "-"}</p>
                </div>
                <div className="border border-ink/10 bg-[#fffdf8] p-5 md:col-span-2">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-ink/45">{t.results.address}</div>
                  <p className="mt-3 flex gap-2 text-sm leading-6 text-ink/72">
                    <MapPin className="mt-1 shrink-0 text-gold" size={16} />
                    {partner.Address || "-"}
                  </p>
                </div>
              </div>

              {match?.reasons.length ? (
                <div className="mt-6 border border-ink/10 bg-ivory p-5">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-ink/45">Match rationale</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {match.reasons.map((reason) => (
                      <span key={reason} className="bg-white px-3 py-2 text-xs font-bold text-ink/70">
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <div className="border border-dashed border-ink/20 p-8 text-center text-ink/55">{t.results.noResults}</div>
          )}
        </div>

        <aside className="h-fit border border-ink/10 bg-ink p-6 text-white">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 shrink-0 text-brass" size={24} />
            <div>
              <h2 className="font-display text-3xl font-black">{t.detail.adminTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-white/70">{t.detail.adminBody}</p>
              <a className="mt-6 inline-flex items-center gap-2 bg-brass px-5 py-3 text-sm font-black text-ink" href="mailto:admin@cmcconnect.id?subject=CMC%20Connect%20Partner%20Introduction">
                <Mail size={17} />
                {t.detail.adminCta}
              </a>
              <Link className="mt-3 inline-flex w-full items-center justify-center gap-2 border border-white/20 px-5 py-3 text-sm font-black text-white" href="/database">
                <Database size={17} />
                {t.detail.browseMore}
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
