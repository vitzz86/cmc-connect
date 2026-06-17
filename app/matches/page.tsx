"use client";

import Link from "next/link";
import { ArrowRight, Database } from "lucide-react";
import { categoryCopy } from "../lib/categories";
import { AppHeader } from "../components/AppHeader";
import { useFlow } from "../lib/flow-context";

export default function MatchesPage() {
  const { locale, t, matches } = useFlow();

  return (
    <main className="min-h-screen bg-ivory text-ink">
      <AppHeader />
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">CMC Connect</p>
            <h1 className="mt-3 font-display text-4xl font-black">{t.results.title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/62">{t.results.subtitle}</p>
          </div>
          <Link className="inline-flex items-center gap-2 border border-ink/15 bg-white px-4 py-3 text-sm font-black" href="/database">
            <Database size={17} />
            {t.detail.browseMore}
          </Link>
        </div>

        {matches.length === 0 ? (
          <div className="border border-dashed border-ink/20 bg-white p-8 text-center">
            <p className="text-sm font-semibold text-ink/60">{t.results.noResults}</p>
            <Link className="mt-5 inline-flex items-center gap-2 bg-ink px-5 py-3 text-sm font-black text-white" href="/">
              {t.nav.start}
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {matches.map((match, index) => (
              <article key={match.partner.id} className="flex min-h-[350px] flex-col border border-ink/10 bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center bg-ink text-sm font-black text-white">{index + 1}</div>
                  <div className="text-right">
                    <div className="text-xs font-black uppercase tracking-[0.16em] text-ink/40">{t.results.score}</div>
                    <div className="font-display text-3xl font-black">{match.score}</div>
                  </div>
                </div>
                <h2 className="text-lg font-black leading-tight">{match.partner.Company}</h2>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-gold">
                  {categoryCopy[match.partner.Category as keyof typeof categoryCopy]?.[locale] || match.partner.Category}
                </p>
                <p className="mt-4 line-clamp-5 text-sm leading-6 text-ink/68">{match.partner.Product || "-"}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {match.reasons.slice(0, 2).map((reason) => (
                    <span key={reason} className="bg-ivory px-2 py-1 text-xs font-semibold text-ink/70">
                      {reason}
                    </span>
                  ))}
                </div>
                <Link className="mt-auto inline-flex items-center justify-center gap-2 bg-ink px-4 py-3 text-sm font-black text-white" href={`/matches/${match.partner.id}`}>
                  {t.results.viewDetail}
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
