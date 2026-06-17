"use client";

import Image from "next/image";
import Link from "next/link";
import { useFlow } from "../lib/flow-context";

export function AppHeader({ minimal = false }: { minimal?: boolean }) {
  const { locale, setLocale, t } = useFlow();

  return (
    <header className="border-b border-ink/10 bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Master Class CMC Connect">
          <Image src="/assets/masterclass-logo.png" width={184} height={69} alt="Master Class" className="h-auto w-[150px] sm:w-[184px]" priority />
        </Link>

        <div className="flex items-center gap-3">
          {!minimal ? (
            <nav className="hidden items-center gap-6 text-sm font-bold text-ink/70 md:flex">
              <Link href="/matches">{t.nav.matches}</Link>
              <Link href="/database">{t.nav.database}</Link>
            </nav>
          ) : null}
          <div className="flex border border-ink/15 bg-white p-1" aria-label="Language switcher">
            <button className={`px-3 py-1.5 text-xs font-black ${locale === "id" ? "bg-ink text-white" : "text-ink/60"}`} onClick={() => setLocale("id")}>
              ID
            </button>
            <button className={`px-3 py-1.5 text-xs font-black ${locale === "en" ? "bg-ink text-white" : "text-ink/60"}`} onClick={() => setLocale("en")}>
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
