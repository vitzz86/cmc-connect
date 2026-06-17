"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import partnersData from "../data/partners.json";
import { categories, categoryCopy } from "../lib/categories";
import { AppHeader } from "../components/AppHeader";
import { useFlow } from "../lib/flow-context";
import type { Partner } from "../lib/types";

const partners = partnersData as Partner[];

export default function DatabasePage() {
  const { locale, t } = useFlow();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredPartners = useMemo(() => {
    const query = search.toLowerCase().trim();
    return partners.filter((partner) => {
      const categoryMatch = !categoryFilter || partner.Category === categoryFilter;
      const searchMatch = !query || partner.searchText.includes(query);
      return categoryMatch && searchMatch;
    });
  }, [search, categoryFilter]);

  return (
    <main className="min-h-screen bg-ivory text-ink">
      <AppHeader />
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">CMC Connect</p>
            <h1 className="mt-3 font-display text-4xl font-black">{t.database.title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/62">{t.database.subtitle}</p>
          </div>
          <div className="text-sm font-bold text-ink/60">
            {t.database.showing} {filteredPartners.length} {t.database.of} {partners.length} {t.database.entries}
          </div>
        </div>

        <div className="mb-6 grid gap-3 lg:grid-cols-[1fr_280px]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/35" size={18} />
            <input
              className="h-12 w-full border border-ink/15 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t.database.search}
            />
          </label>
          <select
            className="h-12 w-full border border-ink/15 bg-white px-4 text-sm outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            <option value="">{t.database.all}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {categoryCopy[category][locale]}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredPartners.slice(0, 90).map((partner) => (
            <article key={partner.id} className="flex min-h-[230px] flex-col border border-ink/10 bg-white p-5">
              <h2 className="font-black leading-tight">{partner.Company}</h2>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-gold">
                {categoryCopy[partner.Category as keyof typeof categoryCopy]?.[locale] || partner.Category}
              </p>
              <p className="mt-4 line-clamp-4 text-sm leading-6 text-ink/68">{partner.Product || "-"}</p>
              <p className="mt-4 text-xs font-semibold leading-5 text-ink/45">
                {locale === "id" ? "Kontak partner dikelola oleh admin CMC." : "Partner contact is handled by CMC admin."}
              </p>
              <Link className="mt-auto inline-flex items-center justify-center gap-2 border border-ink/15 px-4 py-3 text-sm font-black" href={`/matches/${partner.id}`}>
                {t.results.viewDetail}
                <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
